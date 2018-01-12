export abstract class IndexedDbBase {
    private _db: IDBDatabase | undefined;

    constructor(
        private dbFactory: IDBFactory,
        private databaseName: string,
        private version: number
    ) {
    }

    /**
     * Upgrade the database creating stores,
     * @param db <IDBDatabase> The database to upgrade
     */
    protected abstract upgradeDb(db: IDBDatabase): void;

    /**
     * Get a reference to the IndexedDb database.
     */
    protected getDb(): PromiseLike<IDBDatabase> {
        return new Promise<IDBDatabase>((resolve, reject) => {
            if (this._db) {
                return resolve(this._db);
            }

            try {
                const openRequest = this.dbFactory.open(this.databaseName, this.version);

                openRequest.onerror = () => {
                    reject(openRequest.error);
                };

                // This will be called if the database doesn't exist or the version doesn't match.
                openRequest.onupgradeneeded = () => {
                    this.upgradeDb(openRequest.result);
                };

                openRequest.onsuccess = () => {
                    this._db = openRequest.result;
                    (this._db as IDBDatabase).onabort = () => this.dispose();
                    (this._db as IDBDatabase).addEventListener('close', () => this.dispose());
                    (this._db as IDBDatabase).onerror = () => this.dispose();
                    resolve(this._db);
                };
            } catch (err) {
                this.dispose();
                reject(err);
            }
        });
    }

    /**
     * Async helper that runs a callback in a transaction context and wraps the whole in a promise.
     * @param mode <IDBTransactionMode> The read/write transaction mode.
     * @param callback <(store: IDBObjectStore) => void> The callback to execute..
     * @return <PromiseLike<void> Resolves once successfully completed, rejects if there an error.
     */
    protected withStore(storeName: string, mode: IDBTransactionMode, callback: (store: IDBObjectStore) => void): PromiseLike<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const db = await this.getDb();
                const transaction = db.transaction(storeName, mode);
                if (transaction.error) {
                    return reject(transaction.error);
                }

                transaction.oncomplete = () => {
                    resolve();
                };

                transaction.onerror = () => {
                    reject(transaction.error);
                };

                callback(transaction.objectStore(storeName));
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Dispose of resources and tidy-up.
     */
    dispose() {
        if (this._db) {
            try {
                this._db.close();
            } finally {
                this._db = undefined;
            }
        }
    }
}

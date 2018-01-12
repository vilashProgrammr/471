import { IndexedDbBase } from './indexed-db-base';

export const DB_NAME = 'baml';
export const DB_VERSION = 1;
export const CACHE_NAME = '5-day-city-forecasts';
export const TIMESTAMP_INDEX_NAME = 'timestamp';

export abstract class IndexedDbCacheBase extends IndexedDbBase {
    constructor(dbFactory: IDBFactory) {
        super(dbFactory, DB_NAME, DB_VERSION);
    }

    /**
     * Upgrade the database creating stores, indeexes, etc.
     * @param db <IDBDatabase> The database to upgrade
     */
    protected upgradeDb(db: IDBDatabase) {
        const store = db.createObjectStore(CACHE_NAME);
        store.createIndex(TIMESTAMP_INDEX_NAME, 'timestamp', { unique: false });    // Secondary index on the timestamp/
    }
}

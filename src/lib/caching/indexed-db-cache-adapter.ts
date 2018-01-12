// Caching adapter implementation using IndexedDb storage.

import { Inject, Injectable } from '@angular/core';
import { DB_FACTORY } from '../../tokens';
import { ICacheAdapter, ICacheValue } from './cache-adapter';
import { IndexedDbBase } from './indexed-db-base';

export const DB_NAME = 'baml';
export const DB_VERSION = 1;
export const CACHE_NAME = '5-day-city-forecasts';
export const TIMESTAMP_INDEX_NAME = 'timestamp';

/**
 * Upgrade the database creating stores, indeexes, etc.
 * @param db <IDBDatabase> The database to upgrade
 */
export function upgradeDb(db: IDBDatabase) {
    const store = db.createObjectStore(CACHE_NAME);
    store.createIndex(TIMESTAMP_INDEX_NAME, 'timestamp', { unique: false });    // Secondary index on the timestamp/
}

@Injectable()
export class IndexedDbCacheAdapter<TKey extends number, TValue> extends IndexedDbBase implements ICacheAdapter<TKey, TValue> {
    constructor( @Inject(DB_FACTORY) dbFactory: IDBFactory) {
        super(dbFactory, DB_NAME, DB_VERSION);
    }

    /**
     * Upgrade the database creating stores, indeexes, etc.
     * @param db <IDBDatabase> The database to upgrade
     */
    protected upgradeDb(db: IDBDatabase) {
        upgradeDb(db);
    }

    /**
     * Async function to delete the item from the cache if it exists.
     * @param key <TKey> The key of the cache item.
     * @return <PromiseLike<void>> Resolves if successsful or not found, rejects if an error occurrs.
     */
    delete(key: TKey): PromiseLike<void> {
        return this.withStore(CACHE_NAME, 'readwrite', store => {
            store.delete(key);
        });
    }

    /**
     * Get the value from the cache. If not found, execute the async fetch function, store the value
     * in the cache and return it.
     * @param key <TKey> The key of the cache item.
     * @param maxAge: <number> The maximum age in milliseconds. If exceeded a new value will be fetched.
     * @param fetchFn: <() => PromiseLike<TValue>> An async function to fetch the value if not found in the cache.
     * @return <PromiseLike<TValue>> Resolves with the result, rejects if an error occurs.
     */
    get(key: TKey, maxAge: number, fetchFn: () => PromiseLike<TValue>): PromiseLike<TValue> {
        return new Promise<TValue>(async (resolve, reject) => {
            let request = {} as IDBRequest;
            try {
                await this.withStore(CACHE_NAME, 'readwrite', store => request = store.get(key));
                const result = request.result as ICacheValue<TValue>;
                if (result && result.timestamp + maxAge >= Date.now()) {
                    return resolve(result.value);
                }

                const value = await this.set(key, fetchFn);
                return resolve(value);
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Test whether the value is in cache.
     * @param key <TKey> The key of the cache item.
     * @return <PromiseLike<boolean> Resolves with true if in the cache, false if not and rejects if an error occurs.
     */
    has(key: TKey): PromiseLike<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            let request = {} as IDBRequest;
            try {
                await this.withStore(CACHE_NAME, 'readonly', store => request = store.get(key));
                resolve(!!request.result);
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Upserts the value in the cache with the value returned by the async fetch function .
     * @param key <TKey> The key of the cache item.
     * @param fetchFn: <() => PromiseLike<TValue>> An async function to fetch the new value.
     * @return <PromiseLike<TValue>> Resolves with the result, rejects if an error occurrs.
     */
    set(key: TKey, fetchFn: () => PromiseLike<TValue>): PromiseLike<TValue> {
        return new Promise<TValue>(async (resolve, reject) => {
            try {
                const value = await fetchFn() as TValue;
                const cacheValue = { value, timestamp: Date.now() } as ICacheValue<TValue>;
                await this.withStore(CACHE_NAME, 'readwrite', store => store.put(cacheValue, key));
                resolve(value);
            } catch (err) {
                reject(err);
            }
        });
    }
}

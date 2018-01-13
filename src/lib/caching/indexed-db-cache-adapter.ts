// Caching adapter implementation using IndexedDb storage.

import { Inject, Injectable } from '@angular/core';
import { DB_FACTORY } from '../../tokens';
import { ICacheAdapter, ICacheValue } from './cache-adapter';
import { CACHE_NAME, IndexedDbCacheBase } from './indexed-db-cache-base';

@Injectable()
export class IndexedDbCacheAdapter<TKey extends number, TValue> extends IndexedDbCacheBase implements ICacheAdapter<TKey, TValue> {
    constructor( @Inject(DB_FACTORY) dbFactory: IDBFactory) {
        super(dbFactory);
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

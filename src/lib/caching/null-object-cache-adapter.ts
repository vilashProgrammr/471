// Caching adapter implementation using the Null Object pattern.

import { ICacheAdapter } from './cache-adapter';

export class NullObjectCacheAdapter<TKey extends string | string[] | number, TValue> implements ICacheAdapter<TKey, TValue> {
    /**
     * Async function that does nothing and always resolves.
     * @param key <TKey> The key of the cache item. Ignored.
     * @return <PromiseLike<void>> Always resolves.
     */
    delete(): PromiseLike<void> {
        return Promise.resolve();
    }

    /**
     * Dispose of resources and tidy-up.
     * Nothing to do.
     */
    dispose() {
    }

    /**
     * Always calls the async fetch function and resolves with the returned value.
     * @param key <TKey> The key of the cache item. Ignored.
     * @param maxAge: <number> The maximum age in milliseconds. If exceeded a new value will be fetched.
     * @param fetchFn: <() => PromiseLike<TValue>> An async function to fetch the value.
     * @return <PromiseLike<TValue>> Resolves with the result, rejects if an error occurs.
     */
    get(_key: TKey, maxAge: number, fetchFn: () => PromiseLike<TValue>): PromiseLike<TValue> {
        return new Promise<TValue>(async (resolve, reject) => {
            try {
                const value = await fetchFn();
                resolve(value);
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Test whether the value is in cache. Always resoves to false.
     * @param key <TKey> The key of the cache item. Ignored
     * @return <PromiseLike<boolean> Always resolves with false.
     */
    has(): PromiseLike<boolean> {
        return Promise.resolve(false);
    }

    /**
     * Always calls the async fetch function and resolves with the returned value.
     * @param key <TKey> The key of the cache item. Ignored.
     * @param fetchFn: <() => PromiseLike<TValue>> An async function to fetch the new value.
     * @return <PromiseLike<TValue>> Resolves with the result, rejects if an error occurrs.
     */
    set(_key: TKey, fetchFn: () => PromiseLike<TValue>): PromiseLike<TValue> {
        return new Promise<TValue>(async (resolve, reject) => {
            try {
                const value = await fetchFn();
                resolve(value);
            } catch (err) {
                reject(err);
            }
        });
    }
}

// Caching adapter interfaces.

/**
 * Describes the the data stored in the cache.
 * @param TValue The data type of the cached value.
 */
export interface ICacheValue<TValue> {
    /**
     * The value stored.
     */
    value: TValue;

    /**
     * The timestamp when the data was either first stored or it's value was updated.
     */
    timestamp: number;
}

/**
 * Describes the evition policy to be used for a caching provider instance.
 */
export interface IEvictionPolicy {
    /**
     * The maximum number of items to be stored in the cache. If there are more, then the oldest will be evicted.
     */
    maxItems: number;

    /**
     * The maximum age in milliseconds of items in the static. Any older than this will be evicted.
     */
    maxAge?: number;
}

/**
 * Describes the interface of a cache adapter implementation.
 * @param TKey <extends string | string[] | number> The data type of the key value.
 * @param TValue The data type of the Value to be stored or fetched.
 */
export interface ICacheAdapter<TKey extends string | string[] | number, TValue> {
    /**
     * Async function to delete the item from the cache if it exists.
     * @param key <TKey> The key of the cache item.
     * @return <PromiseLike<void>> Resolves if successsful or not found, rejects if an error occurrs.
     */
    delete(key: TKey): PromiseLike<void>;

    /**
     * Dispose of resources and tidy-up.
     */
    dispose(): void;

    /**
     * Get the value from the cache. If not found, execute the async fetch function, store the value
     * in the cache and return it.
     * @param key <TKey> The key of the cache item.
     * @param maxAge: <number> The maximum age in milliseconds. If exceeded a new value will be fetched.
     * @param fetchFn: <() => PromiseLike<TValue>> An async function to fetch the value if not found in the cache.
     * @return <PromiseLike<TValue>> Resolves with the result, rejects if an error occurrs.
     */
    get(key: TKey, maxAge: number, fetchFn: () => PromiseLike<TValue>): PromiseLike<TValue>;

    /**
     * Test whether the value is in cache.
     * @param key <TKey> The key of the cache item.
     * @return <PromiseLike<boolean> Resolves with true if in the cache, false if not and rejects if an error occurs.
     */
    has(key: TKey): PromiseLike<boolean>;

    /**
     * Upserts the value in the cache with the value returned by the async fetch function .
     * @param key <TKey> The key of the cache item.
     * @param fetchFn: <() => PromiseLike<TValue>> An async function to fetch the new value.
     * @return <PromiseLike<TValue>> Resolves with the result, rejects if an error occurrs.
     */
    set(key: TKey, fetchFn: () => PromiseLike<TValue>): PromiseLike<TValue>;
}

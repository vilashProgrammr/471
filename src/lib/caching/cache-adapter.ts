// Caching adapter interfaces.
import { Observable } from 'rxjs/Observable';

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
 * Describes the interface of a cache adapter implementation.
 * @param TKey <extends string | string[] | number> The data type of the key value.
 * @param TValue The data type of the Value to be stored or fetched.
 */
export interface ICacheAdapter<TKey extends string | string[] | number, TValue> {
    /**
     * Get the value from the cache. If not found, execute the async fetch function, store the value
     * in the cache and return it.
     * @param key <TKey> The key of the cache item.
     * @param maxAge: <number> The maximum age in milliseconds. If exceeded a new value will be fetched.
     * @param fetchFn: <() => Observable<TValue>> An async function to fetch the value if not found in the cache.
     * @return <Observable<TValue>> An observable of the cached value.
     */
    get(key: TKey, maxAge: number, fetchFn: () => Observable<TValue>): Observable<TValue>;

    /**
     * Upserts the value in the cache with the value returned by the async fetch function .
     * @param key <TKey> The key of the cache item.
     * @param fetchFn: <() => Observable<TValue>> An async function to fetch the new value.
     * @return <Observable<TValue>> An obervable of the value.
     */
    set(key: TKey, fetchFn: () => Observable<TValue>): Observable<TValue>;
}

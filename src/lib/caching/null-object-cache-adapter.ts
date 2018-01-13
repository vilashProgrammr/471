// Caching adapter implementation using the Null Object pattern.

import { Observable } from 'rxjs/Observable';
import { ICacheAdapter } from './cache-adapter';

export class NullObjectCacheAdapter<TKey extends string | string[] | number, TValue> implements ICacheAdapter<TKey, TValue> {
    /**
     * Always calls the async fetch function and returns an observable of the returned value.
     * @param _key <TKey> The key of the cache item. Ignored.
     * @param _maxAge: <number> The maximum age in milliseconds. If exceeded a new value will be fetched. Ignored.
     * @param fetchFn: <() => PromiseLike<TValue>> An async function to fetch the value.
     * @return <Observable<TValue>> An observable of the returned value.
     */
    get(_key: TKey, _maxAge: number, fetchFn: () => Observable<TValue>): Observable<TValue> {
        return fetchFn();
    }

    /**
     * Always calls the async fetch function and returns the value.
     * @param key <TKey> The key of the cache item. Ignored.
     * @param fetchFn: <() => Observable<TValue>> An async function to fetch the new value.
     * @return <Observable<TValue>> An observable of the result.
     */
    set(_key: TKey, fetchFn: () => Observable<TValue>): Observable<TValue> {
        return fetchFn();
    }
}

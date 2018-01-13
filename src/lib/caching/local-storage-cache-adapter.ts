// Caching adapter implementation using IndexedDb storage.

import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators';
import { LOCAL_STORAGE } from '../../tokens';
import { ICacheAdapter, ICacheValue } from './cache-adapter';

@Injectable()
export class LocalStorageCacheAdapter<TValue> implements ICacheAdapter<string, TValue> {
    constructor( @Inject(LOCAL_STORAGE) private storage: Storage) {
    }

    /**
     * Get the value from the cache. If not found, execute the async fetch function, store the value
     * in the cache and return it.
     * @param key <string> The key of the cache item.
     * @param maxAge: <number> The maximum age in milliseconds. If exceeded a new value will be fetched.
     * @param fetchFn: <() => Observable<TValue>> An async function to fetch the value if not found in the cache.
     * @return <Observable<TValue>> An observable of the cached value.
     */
    get(key: string, maxAge: number, fetchFn: () => Observable<TValue>): Observable<TValue> {
        const item = this.storage.getItem(key);
        if (item !== null) {
            try {
                const cacheValue = JSON.parse(item, dateReviver) as ICacheValue<TValue>;
                if (cacheValue.timestamp + maxAge >= Date.now()) {
                    return of(cacheValue.value);
                }
            } catch (_err) {
            }
        }

        return this.set(key, fetchFn);
    }

    /**
     * Upserts the value in the cache with the value returned by the async fetch function .
     * @param key <string> The key of the cache item.
     * @param fetchFn: <() => Observable<TValue>> An async function to fetch the new value.
     * @return <Observable<TValue>> An obervable of the value.
     */
    set(key: string, fetchFn: () => Observable<TValue>): Observable<TValue> {
        return fetchFn().pipe(
            tap(value => {
                const cacheValue = { value, timestamp: Date.now() } as ICacheValue<TValue>;
                this.storage.setItem(key, JSON.stringify(cacheValue));
            })
        );
    }
}

/**
 * Reviver for use with JSON.parse to convert string properties containging ISO dates back to date objects.
 * @param _name <string> The property name (ignored)
 * @param value <any> The property value
 * @return <Date | any> The original value, or if an ISO date string, the converted Date object.
 */
function dateReviver(_name: string, value: any): Date | any {
    if (typeof value === 'string' && /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/.test(value)) {
        return new Date(value);
    }
    return value;
}

import { Injectable } from '@angular/core';

@Injectable()
export class IndexedDbFactory implements IDBFactory {
    cmp(first: any, second: any): number {
        return indexedDB.cmp(first, second);
    }

    deleteDatabase(name: string): IDBOpenDBRequest {
        return indexedDB.deleteDatabase(name);
    }

    open(name: string, version?: number): IDBOpenDBRequest {
        return indexedDB.open(name, version);
    }
}

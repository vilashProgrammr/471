import { of } from 'rxjs/observable/of';
import { ICacheValue } from './cache-adapter';
import { LocalStorageCacheAdapter } from './local-storage-cache-adapter';

describe('LocalStorage cache adapter', () => {
    let cacheAdapter: LocalStorageCacheAdapter<string>;
    let storageMock: Storage;

    beforeEach(() => {
        storageMock = {} as Storage;
        storageMock.getItem = _key => null;
        storageMock.setItem = (_key, _value) => null;
        cacheAdapter = new LocalStorageCacheAdapter<string>(storageMock);
    });

    describe('When calling GET', () => {
        it('Should return the value from the fetch function if it is NOT cached', done => {
            cacheAdapter.get('get-key-1', 0, () => of('get-value-1')).subscribe(
                value => {
                    expect(value).toEqual('get-value-1');
                    done();
                }
            );
        });

        it('Should return the value from the cache if it IS cached', done => {
            storageMock.getItem = () => JSON.stringify({ timestamp: Date.now(), value: 'cached-value' } as ICacheValue<string>);
            cacheAdapter.get('key', Number.MAX_SAFE_INTEGER, () => of('new-value')).subscribe(
                value => {
                    expect(value).toEqual('cached-value');
                    done();
                }
            );
        });

        it('Should NOT call the fetch function if the value IS cached', done => {
            spyOn(storageMock, 'getItem').and.returnValue(
                JSON.stringify({ timestamp: Date.now(), value: 'cached-value' } as ICacheValue<string>)
            );
            const fetchFnStub = jasmine.createSpy('fetchFn');
            cacheAdapter.get('key', Number.MAX_SAFE_INTEGER, fetchFnStub).subscribe(
                () => {
                    expect((fetchFnStub as jasmine.Spy).calls.count()).toEqual(0);
                    done();
                }
            );
        });

        it('Should return the value from the fetch function if the cached value is corrupt', done => {
            storageMock.getItem = () => '{ h: 1';
            cacheAdapter.get('key', Number.MAX_SAFE_INTEGER, () => of('new-value')).subscribe(
                value => {
                    expect(value).toEqual('new-value');
                    done();
                }
            );
        });

        it('Should return the value from the fetch function if the cached value has expired', done => {
            storageMock.getItem = () => JSON.stringify({ timestamp: Date.now() - 1000, value: 'cached-value' } as ICacheValue<string>);
            cacheAdapter.get('key', 0, () => of('new-value')).subscribe(
                value => {
                    expect(value).toEqual('new-value');
                    done();
                }
            );
        });
    });

    describe('When calling SET', () => {
        it('Should call the fetch function if the value is cached', done => {
            storageMock.getItem = _key => JSON.stringify(<ICacheValue<string>>{ timestamp: Date.now(), value: 'cached-value' });
            const fetchFnStub = jasmine.createSpy('fetchFn').and.returnValue(of('new-value'));
            cacheAdapter.set('key', fetchFnStub).subscribe(
                () => {
                    expect((fetchFnStub as jasmine.Spy).calls.count()).toEqual(1);
                    done();
                }
            );
        });

        it('Should call the fetch function if the value is NOT cached', done => {
            const fetchFnStub = jasmine.createSpy('fetchFn').and.returnValue(of('new-value'));
            cacheAdapter.set('key', fetchFnStub).subscribe(
                () => {
                    expect((fetchFnStub as jasmine.Spy).calls.count()).toEqual(1);
                    done();
                }
            );
        });

        it('Should return the value from the fetch function if it is NOT cached', done => {
            cacheAdapter.set('get-key-1', () => of('get-value-1')).subscribe(
                value => {
                    expect(value).toEqual('get-value-1');
                    done();
                }
            );
        });

        it('Should return the value from the fetch function if it IS cached', done => {
            storageMock.getItem = () => JSON.stringify({ timestamp: Date.now(), value: 'cached-value' } as ICacheValue<string>);
            cacheAdapter.set('key', () => of('new-value')).subscribe(
                value => {
                    expect(value).toEqual('new-value');
                    done();
                }
            );
        });
    });
});

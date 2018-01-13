// // import { LocalStorageCacheAdapter } from './local-storage-cache-adapter';

// // const storageMock = {} as Storage;

// // describe('LocalStorage cache adapter', () => {
// //     let cacheAdapter: LocalStorageCacheAdapter<string>;

// //     beforeEach(() => {
// //         cacheAdapter = new LocalStorageCacheAdapter<string>(storageMock);
// //     });

// //     describe('When calling GET', () => {
// //         it('Shoud return the value from the fetch function if it is NOT cached', async () => {
// //             const result = await cacheAdapter.get(['get-key-1'], () => Promise.resolve('get-value-1'));
// //             expect(result.value).toEqual('get-value-1');
// //         });

// //         it('Shoud return the value from the cache if it IS cached', async () => {
// //             await cacheAdapter.set(['key'], () => Promise.resolve('cached-value'));
// //             const result = await cacheAdapter.get(['key'], () => Promise.resolve('new-value'));
// //             expect(result.value).toEqual('cached-value');
// //         });

// //         it('Should not call the fetch function if the value is cached', async () => {
// //             await cacheAdapter.set(['key'], () => Promise.resolve('cached-value'));
// //             const fetchFnStub = sinon.stub().resolves('new-value');
// //             await cacheAdapter.get(['key'], fetchFnStub);
// //             expect(fetchFnStub.notCalled).toBeTruthy();
// //         });

// //         it('Should return isFromCache=FALSE if the value is NOT cached', async () => {
// //             const result = await cacheAdapter.get(['key'], () => Promise.resolve('value'));
// //             expect(result.isFromCache).toBeFalsy();
// //         });

// //         it('Should return isFromCache=TRUE if the value IS cached', async () => {
// //             await cacheAdapter.set(['key'], () => Promise.resolve('cached-value'));
// //             const result = await cacheAdapter.get(['key'], () => Promise.resolve('value'));
// //             expect(result.isFromCache).toBeTruthy();
// //         });

// //         it('Should reject when the fetch function throws', async () => {
// //             const error = new Error('Shit happens!');
// //             const fetchFnStub = sinon.stub().throws(error);
// //             try {
// //                 await cacheAdapter.get(['key'], fetchFnStub);
// //             } catch (err) {
// //                 expect(err).toEqual(error);
// //                 return;
// //             }

// //             expect(true).toBeFalsy('Error not rejected as expected');
// //         });
// //     });

// //     describe('When calling HAS', () => {
// //         it('Shoud return FALSE if it is NOT cached', async () => {
// //             const result = await cacheAdapter.has(['key']);
// //             expect(result).toBeFalsy();
// //         });

// //         it('Shoud return TRUE if it IS cached', async () => {
// //             await cacheAdapter.set(['key'], () => Promise.resolve('cached-value'));
// //             const result = await cacheAdapter.has(['key']);
// //             expect(result).toBeTruthy();
// //         });
// //     });

// //     describe('When calling DELETE', () => {
// //         it('Shoud resolve successfully if the key does not exist', async () => {
// //             try {
// //                 await cacheAdapter.delete(['key']);
// //                 expect(true).toBeTruthy();
// //             } catch (err) {
// //                 expect(false).toBeTruthy('Unexpected error thrown');
// //             }
// //         });

// //         it('Shoud return TRUE if it IS cached', async () => {
// //             await cacheAdapter.set(['key'], () => Promise.resolve('cached-value'));
// //             await cacheAdapter.delete(['key']);
// //             const result = await cacheAdapter.has(['key']);
// //             expect(result).toBeFalsy();
// //         });
// //     });

// //     describe('When calling DISPOSE', () => {
// //         it('Shoud re-open database successfully', async () => {
// //             cacheAdapter.dispose();
// //             try {
// //                 await cacheAdapter.set(['key'], () => Promise.resolve('cached-value'));
// //                 const result = await cacheAdapter.has(['key']);
// //                 expect(result).toBeTruthy();
// //             } catch (err) {
// //                 expect(false).toBeTruthy('Unexpected error thrown');
// //             }
// //         });
// //     });

// //     describe('When calling SET', () => {
// //         it('Should call the fetch function if the value is cached', async () => {
// //             await cacheAdapter.set(['key'], () => Promise.resolve('cached-value'));
// //             const fetchFnStub = sinon.stub().resolves('new-value');
// //             await cacheAdapter.set(['key'], fetchFnStub);
// //             expect(fetchFnStub.calledOnce).toBeTruthy();
// //         });

// //         it('Should call the fetch function if the value is NOT cached', async () => {
// //             const fetchFnStub = sinon.stub().resolves('new-value');
// //             await cacheAdapter.set(['key'], fetchFnStub);
// //             expect(fetchFnStub.calledOnce).toBeTruthy();
// //         });

// //         it('Shoud return the value from the fetch function if it is NOT cached', async () => {
// //             const result = await cacheAdapter.set(['get-key-1'], () => Promise.resolve('get-value-1'));
// //             expect(result).toEqual('get-value-1');
// //         });

// //         it('Shoud return the value from the fetch function if it IS cached', async () => {
// //             await cacheAdapter.set(['key'], () => Promise.resolve('cached-value'));
// //             const result = await cacheAdapter.set(['key'], () => Promise.resolve('new-value'));
// //             expect(result).toEqual('new-value');
// //         });

// //         it('Should overwrite the cached value', async () => {
// //             await cacheAdapter.set(['key'], () => Promise.resolve('cached-value'));
// //             await cacheAdapter.set(['key'], () => Promise.resolve('new-value'));
// //             const result = await cacheAdapter.get(['key'], () => Promise.reject(new Error('Unexpected call to fetch function')));
// //             expect(result.value).toEqual('new-value');
// //         });

// //         it('Should reject when the fetch function throws', async () => {
// //             const error = new Error('Shit happens!');
// //             const fetchFnStub = sinon.stub().throws(error);
// //             try {
// //                 await cacheAdapter.set(['key'], fetchFnStub);
// //             } catch (err) {
// //                 expect(err).toEqual(error);
// //                 return;
// //             }

// //             expect(true).toBeFalsy('Error not rejected as expected');
// //         });
// //     });
// // });

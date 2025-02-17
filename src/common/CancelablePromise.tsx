import axios from 'axios';

export type CancelablePromiseType<T> = Promise<T> & {
  cancel: (message?: string) => void;
};

const CancelablePromise = <T,>(
  promise: Promise<T>,
): CancelablePromiseType<T> => {
  const source = axios.CancelToken.source();

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise
      .then((result: T) => resolve(result))
      .catch((error: any) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          reject(error);
        }
      });
  }) as CancelablePromiseType<T>;

  wrappedPromise.cancel = (message?: string): void => {
    source.cancel(message);
  };

  return wrappedPromise;
};

export default CancelablePromise;

import axios from 'axios';

const CancelablePromise = (promise) => {
  const source = axios.CancelToken.source();
  const wrappedPromise = new Promise((resolve, reject) => {
    promise
      .then((result) => resolve(result))
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          reject(error);
        }
      });
  });

  wrappedPromise.cancel = (message) => {
    source.cancel(message);
  };

  return wrappedPromise;
};

export default CancelablePromise;

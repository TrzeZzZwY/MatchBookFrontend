import RequestService from '@/common/RequestService';
import CancelablePromise from '@/common/CancelablePromise';

interface Author {
  firstName: string;
  lastName: string;
  country: string;
  yearOfBirth: number;
}

const AuthorService = {
  getAuthors({ showRemoved = false, pageSize = 50, pageNumber = 1 } = {}) {
    const promise = RequestService.get('/api/Author', {
      showRemoved,
      pageSize,
      pageNumber,
    }).then((response) => response.data);

    return CancelablePromise(promise);
  },

  addAuthor(author: Author) {
    const promise = RequestService.post('/api/Author', author).then(
      (response) => response.data,
    );

    return CancelablePromise(promise);
  },
};

export default AuthorService;

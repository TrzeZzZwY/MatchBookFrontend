import RequestService from '@/common/RequestService';
import CancelablePromise from '@/common/CancelablePromise';

interface Author {
  firstName: string;
  lastName: string;
  country: string;
  yearOfBirth: number;
}

const AuthorService = {
  getAuthors({
    showRemoved = false,
    pageSize = 10,
    pageNumber = 1,
    authorName = '',
  } = {}) {
    const promise = RequestService.get('book', '/api/Author', {
      showRemoved,
      pageSize,
      pageNumber,
      authorName,
    }).then((response) => response.data);

    return CancelablePromise(promise);
  },

  addAuthor(author: Author) {
    const promise = RequestService.post('book', '/api/Author', author).then(
      (response) => response.data,
    );

    return CancelablePromise(promise);
  },

  updateAuthor(authorId: number, author: Author) {
    const promise = RequestService.put(
      'book',
      `/api/Author/${authorId}`,
      author,
    ).then((response) => response.data);

    return CancelablePromise(promise);
  },

  deleteAuthor(authorId: number) {
    const promise = RequestService.delete(
      'book',
      `/api/Author/${authorId}`,
    ).then((response) => response.data);

    return CancelablePromise(promise);
  },
};

export default AuthorService;

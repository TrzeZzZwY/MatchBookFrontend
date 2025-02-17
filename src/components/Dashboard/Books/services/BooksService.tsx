import RequestService from '@/common/RequestService';
import CancelablePromise from '@/common/CancelablePromise';

interface Book {
  title: string;
  AuthorsIds: number[];
}

interface GetBooksParams {
  showRemoved?: boolean;
  pageSize?: number;
  pageNumber?: number;
  includeBookAuthors?: boolean;
  title?: string;
}

const BookService = {
  getBooks({
    showRemoved = false,
    pageSize = 10,
    pageNumber = 1,
    includeBookAuthors = true,
    title = '',
  }: GetBooksParams = {}) {
    const promise = RequestService.get('book', '/api/Book', {
      showRemoved,
      pageSize,
      pageNumber,
      includeBookAuthors,
      title,
    }).then((response) => response.data);

    return CancelablePromise(promise);
  },

  addBook(book: Book) {
    const promise = RequestService.post('book', '/api/Book', book).then(
      (response) => response.data,
    );

    return CancelablePromise(promise);
  },

  updateBook(bookId: number, book: Book) {
    console.log('bookId:', bookId);
    console.log('book:', book);
    const promise = RequestService.put(
      `book`,
      `/api/Book/${bookId}`,
      book,
    ).then((response) => response.data);

    return CancelablePromise(promise);
  },

  deleteBook(bookId: number) {
    const promise = RequestService.delete('book', `/api/Book/${bookId}`).then(
      (response) => response.data,
    );

    return CancelablePromise(promise);
  },
};

export default BookService;

import RequestService from '@/common/RequestService';
import CancelablePromise from '@/common/CancelablePromise';

export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  country: string;
  yearOfBirth: number;
  isRemoved: boolean;
}

export interface BookReference {
  id: number;
  title: string;
  authors: Author[];
  isRemoved: boolean;
}

export interface UserBookItem {
  id: number;
  userId: number;
  status: string;
  description: string;
  imageId: number;
  bookReference: BookReference;
}

export interface UserBooksResponse {
  itemsCount: number;
  totalItemsCount: number;
  pageNumber: number;
  pageSize: number;
  items: UserBookItem[];
}

const UserBooksService = {
  getUserBooks(
    userId: number,
    {
      pageSize = 50,
      pageNumber = 1,
      includeBookAuthors = true,
      title = '',
    } = {},
  ) {
    const promise = RequestService.get(
      'book',
      `/api/UserBookItem?includeBookAuthors=true&userId=${userId}`,
      {
        pageSize,
        pageNumber,
        includeBookAuthors,
        title: title.trim() !== '' ? title : undefined,
      },
    ).then((response) => {
      if (response.status === 200) {
        return response.data as UserBooksResponse;
      } else {
        throw new Error('Błąd podczas pobierania książek użytkownika.');
      }
    });
    return CancelablePromise(promise);
  },

  deleteUserBookItem(userBookItemId: number) {
    const promise = RequestService.delete(
      'book',
      `/api/UserBookItem/${userBookItemId}`,
    ).then((response) => {
      if (response.status === 204 || response.status === 200) {
        return response.data;
      }
      throw new Error('Błąd podczas usuwania książki.');
    });
    return CancelablePromise(promise);
  },

  editUserBookItem(
    userBookItemId: number,
    data: {
      description: string;
      status: string;
      bookReferenceId: number;
      bookPointId: number;
      imageId: number;
    },
  ) {
    const promise = RequestService.put(
      'book',
      `/api/UserBookItem/${userBookItemId}`,
      data,
    ).then((response) => {
      if (response.status === 200) {
        return response.data;
      }
      throw new Error('Błąd podczas edycji książki.');
    });
    return CancelablePromise(promise);
  },

  changeUserBookItemStatus(userBookItemId: number, status: string) {
    const promise = RequestService.put(
      'book',
      `/api/UserBookItem/${userBookItemId}/change-status`,
      { status },
    ).then((response) => {
      if (response.status === 200) {
        return response.data;
      }
      throw new Error('Błąd podczas zmiany statusu książki.');
    });
    return CancelablePromise(promise);
  },
};

export default UserBooksService;

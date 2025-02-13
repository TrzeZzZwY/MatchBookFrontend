import RequestService from '@/common/RequestService';
import CancelablePromise from '@/common/CancelablePromise';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  region: number;
  status: string;
}

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
  startDate?: string;
  endDate?: string;
  region?: number;
}

export interface UserBookItemsResponse {
  itemsCount: number;
  totalItemsCount: number;
  pageNumber: number;
  pageSize: number;
  items: UserBookItem[];
}

const UserBookItemsService = {
  getUserBookItems({
    pageSize = 10,
    pageNumber = 1,
    includeBookAuthors = true,
    itemStatus = '',
    region = undefined,
    userId = undefined,
    title = '',
    startDate = '',
    endDate = '',
  } = {}) {
    const promise = RequestService.get('book', '/api/UserBookItem', {
      pageSize,
      pageNumber,
      includeBookAuthors,
      itemStatus: itemStatus || undefined,
      region,
      userId,
      title: title.trim() !== '' ? title : undefined,
      startDate,
      endDate,
    }).then((response) => {
      if (response.status === 200) {
        return response.data as UserBookItemsResponse;
      }
      throw new Error('Error fetching user book items.');
    });

    return CancelablePromise(promise);
  },

  getUserDetails(userId: number) {
    const promise = RequestService.get('account', `/api/User/${userId}`).then(
      (response) => {
        if (response.status === 200) {
          return response.data as User;
        }
        throw new Error('Error fetching user details.');
      },
    );

    return CancelablePromise(promise);
  },
};

export default UserBookItemsService;

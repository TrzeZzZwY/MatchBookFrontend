import RequestService from '@/common/RequestService';
import CancelablePromise from '@/common/CancelablePromise';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  region: number;
  status: 'ACTIVE' | 'REMOVED' | 'BANED';
}

const UserService = {
  getUsers({ pageSize = 50, pageNumber = 1, fullName = '', status = '' } = {}) {
    const promise = RequestService.get('account', '/api/User', {
      pageSize,
      pageNumber,
      fullName: fullName.trim() !== '' ? fullName : undefined,
      status: status !== '' ? status : undefined,
    }).then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Błąd podczas pobierania użytkowników.');
      }
    });

    return CancelablePromise(promise);
  },

  getUser(userId: number) {
    const promise = RequestService.get('account', `/api/User/${userId}`).then(
      (response) => {
        if (response.status === 200) {
          return response.data as User;
        } else {
          throw new Error('Błąd podczas pobierania użytkownika.');
        }
      },
    );

    return CancelablePromise(promise);
  },

  updateStatus(userId: number, status: 'ACTIVE' | 'REMOVED' | 'BANED') {
    const promise = RequestService.post('account', `/account-status`, {
      userId,
      status,
    });

    return CancelablePromise(promise);
  },
};

export default UserService;

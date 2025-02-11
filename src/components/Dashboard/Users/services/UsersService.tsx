import RequestService from '@/common/RequestService';

class UserService {
  static async getUsers(pageSize = 50, pageNumber = 1) {
    try {
      const response = await RequestService.get('account', '/api/User', {
        params: { pageSize, pageNumber },
      });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Błąd podczas pobierania użytkowników.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Nie udało się załadować listy użytkowników.');
    }
  }
}

export default UserService;

import RequestService from '@/common/RequestService';
import TokenService from '@/common/TokenService';

class LoginService {
  static async login(email: string, password: string, rememberMe: boolean) {
    try {
      const response = await RequestService.post(
        'account',
        '/api/Admin/Login',
        {
          email,
          password,
        },
      );

      if (response.status === 201) {
        const { token, refreshToken } = response.data;
        await TokenService.setTokens(token, refreshToken);

        if (rememberMe) {
          localStorage.setItem('adminEmail', email);
        } else {
          localStorage.removeItem('adminEmail');
        }

        return { success: true };
      } else {
        return {
          success: false,
          message: 'Nieprawidłowe dane logowania. Spróbuj ponownie.',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Błąd logowania. Sprawdź swoje dane i spróbuj ponownie.',
      };
    }
  }
}

export default LoginService;

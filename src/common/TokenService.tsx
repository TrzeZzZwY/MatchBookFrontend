import axios from 'axios';
import { ACCOUNT_SERVICE_URL } from '../../config.json';
class TokenService {
  private static ACCESS_TOKEN_KEY = 'access_token';
  private static REFRESH_TOKEN_KEY = 'refresh_token';

  static getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  static setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  static clearTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  static async refreshToken(): Promise<void> {
    try {
      const refreshToken = this.getRefreshToken();
      const accessToken = this.getAccessToken();
      if (!refreshToken) throw new Error('No refresh token available');

      const response = await axios.post(
        `${ACCOUNT_SERVICE_URL}/api/Auth/refresh`,
        { refreshToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        this.setTokens(response.data.token, response.data.refreshToken);
      } else {
        this.logout();
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.logout();
    }
  }

  static logout(): void {
    this.clearTokens();
    window.location.href = '/login';
  }
}

export default TokenService;

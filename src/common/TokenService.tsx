import axios from 'axios';

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
      const response = await axios.post(
        'https://localhost:8900/api/Admin/RefreshToken',
        {
          refreshToken: this.getRefreshToken(),
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

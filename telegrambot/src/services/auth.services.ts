import { getToken } from '../api/auth';

class AuthService {
  private _cookies: Map<string, string[]> = new Map();

  private getToken = async (
    server_url: string,
    creds: { username: string; password: string }
  ): Promise<string[] | undefined> => {
    try {
      const token = await getToken(server_url, creds);
      return token;
    } catch (e: any) {
      throw new Error(e);
    }
  };

  private setCookies = (serverUrl: string, token: string[]) => {
    this._cookies.set(serverUrl, [...token]);
  };

  public init = async (
    serverUrl: string,
    creds: { username: string; password: string }
  ): Promise<void> => {
    try {
      const token = await this.getToken(serverUrl, creds);
      if (token?.length) {
        this.setCookies(serverUrl, token);
      }
    } catch (e) {
      console.log(e);
    }
  };

  get cookies(): Map<string, string[]> {
    return this._cookies;
  }
}

export const AuthServiceInstance = new AuthService();

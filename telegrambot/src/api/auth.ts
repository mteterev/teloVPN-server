import axios from 'axios';

export const getToken = async (
  server_url: string,
  creds: { username: string; password: string }
) => {
  try {
    const token = await axios.post(`${server_url}/login`, creds);
    return token.headers['set-cookie'];
  } catch (e: any) {
    throw new Error(e);
  }
};

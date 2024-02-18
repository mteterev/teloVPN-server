import { AxiosResponse } from 'axios';
import { axiosServerInstance } from '../plugins/axios';

interface addServerProps {
  server: string;
  url: string;
  max_users: number;
}

export const getServers = async (): Promise<AxiosResponse<any, any>> => {
  try {
    const servers = await axiosServerInstance.get(`/servers`);
    return servers;
  } catch (e: any) {
    throw new Error(e);
  }
};
export const addServer = async ({
  server,
  url,
  max_users,
}: addServerProps): Promise<any> => {
  try {
    const servers = await axiosServerInstance.post(`/server`, {
      server,
      url,
      max_users,
    });
    return servers.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

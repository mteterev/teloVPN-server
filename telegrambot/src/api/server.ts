import { AxiosResponse } from 'axios';
import { axiosServerInstance } from '../plugins/axios';

export const getServers = async (): Promise<AxiosResponse<any, any>> => {
  try {
    const servers = await axiosServerInstance.get(`/servers`);
    return servers;
  } catch (e: any) {
    throw new Error(e);
  }
};
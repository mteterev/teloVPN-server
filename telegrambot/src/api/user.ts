import { axiosServerInstance } from '../plugins/axios';
import { IUserRequest } from '../interfaces/requests/user';
import { AxiosResponse } from 'axios';

interface ICreateUser {
  user_id: number;
}

interface IUpdateUserAfterFirstPay {
  user_id: number;
  expiration_time: number;
}

export const createUser = async ({ user_id }: ICreateUser) => {
  try {
    const user = await axiosServerInstance.post('/user', { user_id });
    return user.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const updateUserAfterFirstPay = async ({
  user_id,
  expiration_time,
}: IUpdateUserAfterFirstPay) => {
  try {
    const user = await axiosServerInstance.post<IUserRequest>(
      '/user/pay/success',
      {
        user_id,
        expiration_time,
      }
    );
    return user.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const updateUser = async ({
  user_id,
  expiration_time,
}: IUpdateUserAfterFirstPay) => {
  try {
    const user = await axiosServerInstance.put<IUserRequest>('/user/', {
      user_id,
      expiration_time: new Date(expiration_time),
    });
    return user.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getUsers = async () => {
  try {
    const users = await axiosServerInstance.get('/users');
    return users.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getUser = async (id: number): Promise<any> => {
  try {
    const users = await axiosServerInstance.get(`/user/${id}`);
    return users.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getUserServer = async (
  user_id: number
) => {
  try {
    const userServer = await axiosServerInstance.get(`/user/server/${user_id}`);
    return userServer.data;
  } catch (e: any) {
    throw new Error(e);
  }
};
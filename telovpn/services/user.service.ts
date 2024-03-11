import { Op } from 'sequelize';
import { removeEmptyFromObj } from '../functions/removeEmptyFromObj';
import UserModel from '../models/user.model';
import { getServerByName } from './server.service';

type addUserServiceProps = {
  user_id: number;
  username: string;
  refer: number;
};

type updateUserServiceProps = {
  user_id: number;
  role?: string;
  server?: string;
  expiration_time?: number;
  uuid?: string;
  promocode?: number;
  subId?: string;
  username?: string;
  refer?: number;
};

type DeleteUserServiceProps = {
  user_id: number;
};

export const getUserService = async (user_id: number) => {
  const user = await UserModel.findByPk(user_id);
  return user;
};

export const getUsersService = async () => {
  const users = await UserModel.findAll();
  return users;
};

export const addUserService = async (props: addUserServiceProps) => {
  await UserModel.create({
    ...props,
    role: 'user',
    start_date: new Date().getTime(),
    promocode: 'base',
  });

  const user = await getUserService(props.user_id);

  if (user) {
    return user;
  } else {
    throw new Error('Добавить юзера не получилось');
  }
};

export const updateUserService = async (props: updateUserServiceProps) => {
  const normalizedProps = removeEmptyFromObj(props);
  const updatedUser = await getUserService(normalizedProps.user_id);

  if (updatedUser) {
    await UserModel.update(normalizedProps, {
      where: { user_id: normalizedProps.user_id },
    });
    return await getUserService(normalizedProps.user_id);
  } else {
    throw new Error('Такого пользователя не существует');
  }
};

export const deleteUserService = async ({
  user_id,
}: DeleteUserServiceProps) => {
  try {
    const foundUser = await getUserService(user_id);
    if (foundUser) {
      await UserModel.destroy({ where: { user_id } });
      return foundUser;
    } else {
      throw new Error('Такого пользователя не существует');
    }
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getUsersNotPayService = async () => {
  const users = await UserModel.findAll();

  const notPayedUsers = users.filter((user) => {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    //@ts-ignore
    const start_date: Date = user.start_date;

    if (
      user.role === 'user' &&
      start_date.getDate() === yesterday.getDate() &&
      start_date.getMonth() === yesterday.getMonth() &&
      start_date.getFullYear() === yesterday.getFullYear()
    ) {
      return user;
    }
  });

  return notPayedUsers;
};

export const getUsersEndSubscriptionService = async () => {
  const users = await UserModel.findAll({
    where: {
      expiration_time: {
        [Op.and]: [
          {
            [Op.gt]: new Date(),
          },
          {
            [Op.lt]: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
          },
        ],
      },
      role: 'client',
    },
  });

  return users;
};

export const getUserServerService = async ({
  user_id,
}: DeleteUserServiceProps) => {
  const user = await UserModel.findByPk(user_id);

  const serverName = user?.server;

  if (serverName) {
    const server = await getServerByName(serverName);

    if (server) {
      return server;
    } else {
      throw new Error('Сервер не найден');
    }
  } else {
    throw new Error('Пользователь не найден');
  }
};

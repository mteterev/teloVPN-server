import { removeEmptyFromObj } from '../functions/removeEmptyFromObj';
import ServerModel from '../models/server.model';

type AddServerServiceProps = {
  server: string;
  url: string;
  max_users: number;
};

type DeleteServerServiceProps = {
  server: string;
};

export const getServerByName = (server: string) => {
  return ServerModel.findByPk(server);
};

export const addServerService = async ({
  server,
  url,
  max_users,
}: AddServerServiceProps) => {
  try {
    const data = await ServerModel.create({
      server,
      url,
      max_users,
      cnt_users: 0,
    });
    const serverData = await getServerByName(data.server);
    return serverData;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const deleteServersService = async ({
  server,
}: DeleteServerServiceProps) => {
  try {
    const foundServer = await getServerByName(server);
    if (foundServer) {
      await ServerModel.destroy({ where: { server } });
      return foundServer;
    } else {
      throw new Error('Такого сервера не существует');
    }
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getServersService = async () => {
  const servers = await ServerModel.findAll();
  return servers;
};

export const updateServerService = async (props: AddServerServiceProps) => {
  const normalizedProps = removeEmptyFromObj(props);
  const updatedServer = await getServerByName(normalizedProps.server);

  if (updatedServer) {
    await ServerModel.update(normalizedProps, {
      where: { server: normalizedProps.server },
    });
    return await getServerByName(normalizedProps.server);
  } else {
    throw new Error('Такого сервера не существует');
  }
};

export const bestServerService = async () => {
  const servers = await ServerModel.findAll();

  let bestServer = {
    server: '',
    available_users: -100,
  };

  servers.forEach((server) => {
    if (server.max_users - server.cnt_users > bestServer.available_users) {
      bestServer = {
        server: server.server,
        available_users: server.max_users - server.cnt_users,
      };
    }
  });

  if (bestServer.server) {
    return bestServer;
  } else {
    throw new Error('Ошибка поиска лучшего сервера');
  }
};

import { Request, Response } from 'express';
import {
  addServerService,
  bestServerService,
  deleteServersService,
  getServersService,
  updateServerService,
} from '../services/server.service';

const addServerController = async (req: Request, res: Response) => {
  const { server, url, max_users } = req.body;

  try {
    const data = await addServerService({ server, url, max_users });
    res.json(data);
  } catch (e) {
    res.status(400).send(e);
  }
};

const deleteServersController = async (req: Request, res: Response) => {
  try {
    const { server } = req.body;
    await deleteServersService({ server });
    res.json(`server ${server} deleted`);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

const getServersController = async (req: Request, res: Response) => {
  try {
    const servers = await getServersService();
    res.json(servers);
  } catch (e) {
    res.json(e);
  }
};

const updateServerController = async (req: Request, res: Response) => {
  try {
    const { server, url, max_users } = req.body;
    const updServer = await updateServerService({ server, url, max_users });
    res.json(updServer);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

const bestServerController = async (req: Request, res: Response) => {
  try {
    const bestServer = await bestServerService();
    res.json(bestServer);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const serverController = {
  addServer: addServerController,
  deleteServers: deleteServersController,
  getServers: getServersController,
  updateServer: updateServerController,
  bestServer: bestServerController,
};

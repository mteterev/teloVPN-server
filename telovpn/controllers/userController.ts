import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';

import {
  addUserService,
  deleteUserService,
  getUserServerService,
  getUserService,
  getUsersEndSubscriptionService,
  getUsersNotPayService,
  getUsersService,
  updateUserService,
} from '../services/user.service';
import { bestServerService } from '../services/server.service';

const addUserController = async (req, res) => {
  const { user_id, username, refer } = req.body;

  try {
    const user = await addUserService({
      user_id,
      username,
      refer,
    });
    res.status(200).json(user);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

const getUserController = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const user = await getUserService(user_id);
    res.status(200).json(user);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

const getUsersController = async (req, res) => {
  try {
    const users = await getUsersService();
    res.status(200).json(users);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

const updateUserController = async (req, res) => {
  const {
    user_id,
    role,
    server,
    expiration_time,
    uuid,
    promocode,
    subId,
    username,
    refer,
  } = req.body;
  try {
    const updUser = await updateUserService({
      user_id,
      role,
      server,
      expiration_time,
      uuid,
      promocode,
      subId,
      username,
      refer,
    });
    res.json(updUser);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

const updateUserTestController = async (req, res) => {
  try {
    const { user_id, expiration_time } = req.body;
    const uuid = uuidv4();
    const bestServerQuery = await bestServerService();
    const subId = nanoid(16);
    const bestServer = bestServerQuery.server;

    const updUser = await updateUserService({
      user_id,
      role: 'test',
      server: bestServer,
      expiration_time,
      uuid,
      subId,
    });
    res.json(updUser);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

const updateUserAfterFirstPayController = async (req, res) => {
  try {
    const { user_id, expiration_time } = req.body;
    const uuid = uuidv4();
    const bestServerQuery = await bestServerService();
    const subId = nanoid(16);
    const bestServer = bestServerQuery.server;

    const updUser = await updateUserService({
      user_id,
      role: 'client',
      server: bestServer,
      expiration_time,
      uuid,
      subId,
    });
    res.json(updUser);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

const deleteUserController = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    await deleteUserService({ user_id });
    res.json(`user ${user_id} deleted`);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

const getUsersNotPayController = async (req, res) => {
  try {
    const users = await getUsersNotPayService();
    res.json(users);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

const getUsersEndSubscriptionController = async (req, res) => {
  try {
    const users = await getUsersEndSubscriptionService();
    res.json(users);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

const getUserServerController = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const server = await getUserServerService({ user_id });
    res.json(server);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const userController = {
  addUser: addUserController,
  getUser: getUserController,
  getUsers: getUsersController,
  updateUser: updateUserController,
  updateUserTest: updateUserTestController,
  updateUserAfterFirstPay: updateUserAfterFirstPayController,
  deleteUser: deleteUserController,
  getUsersNotPay: getUsersNotPayController,
  getUsersEndSubscription: getUsersEndSubscriptionController,
  getUserServer: getUserServerController,
};
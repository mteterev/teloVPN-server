import { axiosVPNInstance } from '../../plugins/axios';
import { ServerService } from '../../services/server.services';

export const addNewClient = async (user: any) => {
  try {
    const response = await axiosVPNInstance.post(
      `${
        ServerService.userServer(user.server)?.url
      }/panel/api/inbounds/addClient`,
      {
        id: 1,
        settings: `{"clients":[{"email":"${
          user.user_id
        }","totalGB":215000000000,"expiryTime":${new Date(
          user.expiration_time
        ).getTime()},"enable":true,"flow":"xtls-rprx-vision","subId": "${
          user.subid
        }","limitip":3,"id":"${user.uuid}"}]}`,
      }
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const updateClient = async (user: any) => {
  try {
    const response = await axiosVPNInstance.post(
      `${
        ServerService.userServer(user.server)?.url
      }/panel/api/inbounds/updateClient/${user.uuid}`,
      {
        id: 1,
        settings: `{"clients":[{"email":"${
          user.user_id
        }","totalGB":215000000000,"expiryTime":${new Date(
          user.expiration_time
        ).getTime()},"enable":true,"flow":"xtls-rprx-vision","subId": "${
          user.subid
        }","limitip":3,"id":"${user.uuid}"}]}`,
      }
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

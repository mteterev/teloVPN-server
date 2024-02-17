import { axiosVPNInstance } from '../../plugins/axios';
import { ServerService } from '../../services/server.services';

export const getInbound = async (user: any) => {
  try {
    const response = await axiosVPNInstance.get(
      `${ServerService.userServer(user.server)?.url}/panel/api/inbounds/get/1`
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

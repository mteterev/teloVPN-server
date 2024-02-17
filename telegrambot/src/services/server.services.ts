import { getServers } from '../api/server';
import { IServerInstanceValue } from '../interfaces/server';

export class ServerService {
  static _servers: IServerInstanceValue[];

  static getServers = async (): Promise<IServerInstanceValue[] | undefined> => {
    try {
      const servers = await getServers();
      return servers.data;
    } catch (e: any) {
      throw new Error(e);
    }
  };

  static setServer = (servers: IServerInstanceValue[]) => {
    this._servers = [...servers];
  };

  static get servers() {
    return this._servers;
  }

  static init = async (): Promise<void> => {
    try {
      const servers = await this.getServers();
      if (servers && servers.length) {
        this.setServer(servers);
      }
    } catch (e) {
      console.log(e);
    }
  };

  static userServer(server_name: string): IServerInstanceValue | undefined {
    return this._servers.find((server) => server.server === server_name);
  }
}

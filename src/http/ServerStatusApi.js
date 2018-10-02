import { GET } from '../util/axios';

class ServerStatusApi {
  getServerData = () => GET('/serviceInfo', {});

  getRawUsageStatusData = () => GET('/usageStats', {});
}

const serverStatusApi = new ServerStatusApi();

export default serverStatusApi;

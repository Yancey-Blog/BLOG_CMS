import { GET } from '../util/axios';

class ServerStatusApi {
  getServerData = () => GET('https://api.64clouds.com/v1/getLiveServiceInfo?veid=668751&api_key=private_HFFGocLNLN6TzcGjo41d7BD0', {});

  getRawUsageStatusData = () => GET('https://api.64clouds.com/v1/getRawUsageStats?veid=668751&api_key=private_HFFGocLNLN6TzcGjo41d7BD0', {});
}

const serverStatusApi = new ServerStatusApi();

export default serverStatusApi;

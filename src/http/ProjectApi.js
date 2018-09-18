import {
  DELETE, GET, POST, PUT,
} from '../util/axios';

class ProjectApi {
  getData = () => GET('/projects', {});

  insertData = params => POST('/projects', params);

  modifyData = (id, params) => PUT(`/projects/${id}`, params);

  deleteData = id => DELETE(`/projects/${id}`, {});

  batchDeleteData = params => POST('/batchProjects', params);
}

const projectApi = new ProjectApi();

export default projectApi;

import {
  DELETE, GET, POST, PUT,
} from '../util/axios';

class WorkExperienceApi {
  getData = () => GET('/workExperience', {});

  insertData = params => POST('/workExperience', params);

  modifyData = (id, params) => PUT(`/workExperience/${id}`, params);

  deleteData = id => DELETE(`/workExperience/${id}`, {});
}

const workExperienceApi = new WorkExperienceApi();

export default workExperienceApi;

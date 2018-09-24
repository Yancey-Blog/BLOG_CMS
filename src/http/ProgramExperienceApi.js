import {
  DELETE, GET, POST, PUT,
} from '../util/axios';

class ProgramExperienceApi {
  getData = () => GET('/programExperience', {});

  insertData = params => POST('/programExperience', params);

  modifyData = (id, params) => PUT(`/programExperience/${id}`, params);

  deleteData = id => DELETE(`/programExperience/${id}`, {});
}

const programExperienceApi = new ProgramExperienceApi();

export default programExperienceApi;

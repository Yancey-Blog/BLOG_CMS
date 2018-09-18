import {
  DELETE, GET, POST, PUT,
} from '../util/axios';

class AnnouncementApi {
  getData = () => GET('/announcements', {});

  insertData = params => POST('/announcements', params);

  modifyData = (id, params) => PUT(`/announcements/${id}`, params);

  deleteData = id => DELETE(`/announcements/${id}`, {});

  batchDeleteData = params => POST('/batchAnnouncements', params);
}

const announcementApi = new AnnouncementApi();

export default announcementApi;

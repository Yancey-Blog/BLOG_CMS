import {
  action, observable, configure, runInAction,
} from 'mobx';
import { message } from 'antd/lib/index';
import announcementApi from '../http/AnnouncementApi';

configure({
  strict: 'always',
});

class AnnouncementStore {
  @observable dataSource;

  @observable selectedRowKeys;

  @observable showInsertModal;

  @observable insertedContent;

  @observable modifiedContent;

  @observable needRefresh;

  constructor() {
    this.announcementApi = announcementApi;
    this.dataSource = [];
    this.selectedRowKeys = [];
    this.showInsertModal = false;
    this.insertedContent = '';
    this.modifiedContent = '';
    this.getData();
  }

  getData = async () => {
    try {
      const response = await this.announcementApi.getData();
      runInAction(() => {
        this.dataSource = response.data;
      });
    } catch (e) {
      message.error('unknown error!');
    }
  };

  insertData = async () => {
    const params = {
      content: this.insertedContent,
    };
    try {
      const response = await this.announcementApi.insertData(params);
      this.showInsertModal = false;
      message.success('insert success');
      this.dataSource.splice(0, this.dataSource.length);
      this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  modifyRow = async (id) => {
    const params = {
      content: this.modifiedContent,
    };
    if (this.modifiedContent.length === 0) {
      message.error('This area is not allowed empty!', 2);
    } else {
      try {
        const response = await this.announcementApi.modifyData(id, params);
        message.success('modify success');
        this.dataSource.splice(0, this.dataSource.length);
        this.getData();
      } catch (e) {
        message.error('unknown error!');
      }
    }
  };

  deleteRow = async (id) => {
    try {
      const response = await this.announcementApi.deleteData(id);
      message.success('delete success');
      this.dataSource.splice(0, this.dataSource.length);
      this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  batchDelete = async () => {
    const params = {
      selectedList: this.selectedRowKeys,
    };
    try {
      const response = await this.announcementApi.batchDeleteData(params);
      message.success('delete success');
      this.dataSource.splice(0, this.dataSource.length);
      this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  @action onSelectChange = (selectedRowKeys) => {
    this.selectedRowKeys = selectedRowKeys;
  };

  @action openInsertModal = () => {
    this.showInsertModal = true;
    this.insertedContent = '';
  };

  @action closeInsertModal = () => {
    this.showInsertModal = false;
    this.insertedContent = '';
  };

  @action onInsertInputChange = (e) => {
    this.insertedContent = e.target.value;
  };

  @action onModifyInputChange = (e) => {
    this.modifiedContent = e.target.value;
  };
}

const announcementStore = new AnnouncementStore(announcementApi);

export default announcementStore;

import {
  action, observable, configure, runInAction,
} from 'mobx';
import { message } from 'antd/lib/index';
import { articleApi } from '../http/index';

configure({
  strict: 'always',
});

class ArticleStore {
  @observable dataSource;

  @observable selectedRowKeys;

  @observable curId;

  constructor() {
    this.articleApi = articleApi;
    this.dataSource = [];
    this.selectedRowKeys = [];
    this.curId = '';
  }

  getData = async () => {
    try {
      const response = await this.articleApi.getData();
      runInAction(() => {
        this.dataSource = response.data;
      });
    } catch (e) {
      message.error('unknown error!');
    }
  };

  deleteData = async (id) => {
    try {
      const response = await this.articleApi.deleteData(id);
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
      const response = await this.articleApi.batchDeleteData(params);
      message.success('delete success');
      this.dataSource.splice(0, this.dataSource.length);
      this.selectedRowKeys.splice(0, this.selectedRowKeys.length);
      this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  @action onSelectChange = (selectedRowKeys) => {
    this.selectedRowKeys = selectedRowKeys;
  };
}

const articleStore = new ArticleStore(articleApi);

export default articleStore;

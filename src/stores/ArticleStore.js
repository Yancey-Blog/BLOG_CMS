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

  @observable curPage;

  @observable totalAmount;

  @observable spinning;

  constructor() {
    this.articleApi = articleApi;
    this.dataSource = [];
    this.selectedRowKeys = [];
    this.curId = '';
    this.curPage = 1;
    this.totalAmount = 0;
    this.spinning = false;
  }

  getData = async () => {
    this.spinning = true;
    try {
      const response = await this.articleApi.getDataByPage(this.curPage);
      runInAction(() => {
        this.dataSource.splice(0, this.dataSource.length);
        this.dataSource = response.data;
        this.totalAmount = parseInt(response.headers.amount, 10);
        this.spinning = false;
      });
    } catch (e) {
      message.error('no articles!');
    }
  };

  getDataByTitle = async (title) => {
    this.spinning = true;
    try {
      const response = await this.articleApi.getDataByTitle(title);
      runInAction(() => {
        this.dataSource.splice(0, this.dataSource.length);
        this.dataSource = response.data;
        this.totalAmount = parseInt(response.headers.amount, 10);
        this.spinning = false;
      });
    } catch (e) {
      message.error('no articles!');
    }
  };

  getDataByDateRange = async (start, end) => {
    this.spinning = true;
    try {
      const response = await this.articleApi.getDataByDateRange(start, end);
      runInAction(() => {
        this.dataSource.splice(0, this.dataSource.length);
        this.dataSource = response.data;
        this.totalAmount = parseInt(response.headers.amount, 10);
        this.spinning = false;
      });
    } catch (e) {
      message.error('no articles!');
    }
  };


  switchStatus = async (id, checked) => {
    const params = {
      status: checked,
    };
    try {
      const response = await this.articleApi.switchStatus(id, params);
      if (checked) {
        message.success('this article has been published');
      } else {
        message.success('the article will be hidden');
      }
      this.dataSource.splice(0, this.dataSource.length);
      this.getData();
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

  @action onSwitchPage = (pageNumber) => {
    this.curPage = pageNumber;
    this.getData();
  };

  @action onTitleSearchChange = (value) => {
    this.getDataByTitle(value);
  };

  @action onDateRangeSearchChange = (date, daterange) => {
    this.getDataByDateRange(daterange[0], daterange[1]);
  };

  @action resetSearch = () => {
    this.getData();
  };
}

const articleStore = new ArticleStore(articleApi);

export default articleStore;

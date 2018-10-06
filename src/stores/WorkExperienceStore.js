import {
  action, observable, configure, computed,
} from 'mobx';
import { message } from 'antd/lib/index';
import { workExperienceApi } from '../http/index';
import { getCurrentDate } from '../util/tools';

configure({
  strict: 'always',
});

class WorkExperienceStore {
  @observable dataSource;

  @observable showModal;

  @observable modalType;

  @observable enterpriseName;

  @observable position;

  @observable inService;

  @observable workContent;

  @observable curId;

  @observable tags;

  @observable inputVisible;

  @observable inputValue;

  constructor() {
    this.workExperienceApi = workExperienceApi;
    this.dataSource = [];
    this.showModal = false;
    this.modalType = '';
    this.enterpriseName = '';
    this.position = '';
    this.inService = [];
    this.workContent = '';
    this.curId = '';
    // tags
    this.tags = [];
    this.inputVisible = false;
    this.inputValue = '';
  }

  getData = async () => {
    try {
      const response = await this.workExperienceApi.getData();
      this.dataSource = response.data;
    } catch (e) {
      message.error('unknown error!');
    }
  };

  insertData = async () => {
    const params = {
      enterprise_name: this.enterpriseName,
      position: this.position,
      in_service: this.inService,
      work_content: this.workContent,
      work_technology_stack: this.tags,
    };
    try {
      await this.workExperienceApi.insertData(params);
      this.showModal = false;
      message.success('insert success');
      this.dataSource.splice(0, this.dataSource.length);
      await this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  modifyData = async () => {
    const params = {
      enterprise_name: this.enterpriseName,
      position: this.position,
      in_service: this.inService,
      work_content: this.workContent,
      work_technology_stack: this.tags,
    };
    try {
      await this.workExperienceApi.modifyData(this.curId, params);
      this.showModal = false;
      message.success('modify success');
      this.dataSource.splice(0, this.dataSource.length);
      await this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  deleteData = async (id) => {
    try {
      await this.workExperienceApi.deleteData(id);
      message.success('delete success');
      this.dataSource.splice(0, this.dataSource.length);
      await this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  @computed get isFilled() {
    return this.enterpriseName !== '' && this.position !== '' && new Set([...this.inService]).size !== 1 && this.workContent !== '';
  }

  @action openModal = (type, enterpriseName = '', position = '', inService = [getCurrentDate(), getCurrentDate()], workContent = '', tags = [], id) => {
    this.showModal = true;
    this.modalType = type;
    this.enterpriseName = enterpriseName;
    this.position = position;
    this.inService = inService;
    this.workContent = workContent;
    this.tags = tags;
    this.curId = id;
  };

  @action closeModal = () => {
    this.showModal = false;
  };

  @action onEnterpriseNameChange = (e) => {
    this.enterpriseName = e.target.value;
  };

  @action onPositionChange = (e) => {
    this.position = e.target.value;
  };

  @action onInServiceChange = (date, dateString) => {
    this.inService = dateString;
  };

  @action onWorkContentChange = (e) => {
    this.workContent = e.target.value;
  };

  // tags
  @action handleClose = (removedTag) => {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  };

  @action showInput = () => {
    this.inputVisible = true;
  };

  @action handleInputChange = (e) => {
    this.inputValue = e.target.value;
  };

  @action handleInputConfirm = () => {
    if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
      this.tags = [...this.tags, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
  };

  saveInputRef = input => this.input = input; /* eslint-disable-line */
}

const workExperienceStore = new WorkExperienceStore(workExperienceApi);

export default workExperienceStore;

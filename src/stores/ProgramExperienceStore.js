import {
  action, observable, configure, computed,
} from 'mobx';
import { message } from 'antd/lib/index';
import { programExperienceApi } from '../http/index';

configure({
  strict: 'always',
});

class ProgramExperienceStore {
  @observable dataSource;

  @observable showModal;

  @observable modalType;

  @observable programName;

  @observable programUrl;

  @observable programContent;

  @observable curId;

  @observable tags;

  @observable inputVisible;

  @observable inputValue;

  constructor() {
    this.programExperienceApi = programExperienceApi;
    this.dataSource = [];
    this.showModal = false;
    this.modalType = '';
    this.programName = '';
    this.programUrl = '';
    this.programContent = '';
    this.curId = '';
    // tags
    this.tags = [];
    this.inputVisible = false;
    this.inputValue = '';
  }

  getData = async () => {
    try {
      const response = await this.programExperienceApi.getData();
      this.dataSource = response.data;
    } catch (e) {
      message.error('unknown error!');
    }
  };

  insertData = async () => {
    const params = {
      program_name: this.programName,
      program_url: this.programUrl,
      program_content: this.programContent,
      program_technology_stack: this.tags,
    };
    try {
      await this.programExperienceApi.insertData(params);
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
      program_name: this.programName,
      program_url: this.programUrl,
      program_content: this.programContent,
      program_technology_stack: this.tags,
    };
    try {
      await this.programExperienceApi.modifyData(this.curId, params);
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
      await this.programExperienceApi.deleteData(id);
      message.success('delete success');
      this.dataSource.splice(0, this.dataSource.length);
      await this.getData();
    } catch (e) {
      message.error('unknown error!');
    }
  };

  @computed get isFilled() {
    return this.programName !== '' && this.programUrl !== '' && this.programContent !== '';
  }

  @action openModal = (type, programName = '', programUrl = '', programContent = '', tags = [], id) => {
    this.showModal = true;
    this.modalType = type;
    this.programName = programName;
    this.programUrl = programUrl;
    this.programContent = programContent;
    this.tags = tags;
    this.curId = id;
  };

  @action closeModal = () => {
    this.showModal = false;
  };

  @action onProgramNameChange = (e) => {
    this.programName = e.target.value;
  };

  @action onProgramUrlChange = (e) => {
    this.programUrl = e.target.value;
  };

  @action onProgramContentChange = (e) => {
    this.programContent = e.target.value;
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

const programExperienceStore = new ProgramExperienceStore(programExperienceApi);

export default programExperienceStore;

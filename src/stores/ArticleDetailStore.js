import {
  action, observable, configure, runInAction, computed,
} from 'mobx';
import { message } from 'antd/lib/index';
import Editor from 'tui-editor';
import { articleApi } from '../http/index';

configure({
  strict: 'always',
});

class ArticleDetailStore {
  @observable headerCover;

  @observable title;

  @observable summary;

  @observable lastModifiedDate;

  @observable uploadStatus;

  @observable editorImage;

  @observable editorImageName;

  @observable editorInstance;

  @observable tags;

  @observable inputVisible;

  @observable inputValue;

  @observable pageType;

  constructor() {
    this.articleApi = articleApi;
    this.headerCover = '';
    this.title = '';
    this.summary = '';
    this.tags = [];
    this.lastModifiedDate = '';
    this.uploadStatus = false;
    this.editorImage = '';
    this.editorImageName = '';
    this.editorInstance = {};
    this.tags = [];
    this.inputVisible = false;
    this.inputValue = '';
    // "True" means update an article while "false" means add a new article.
    this.pageType = false;
  }

  initEditor = () => {
    const editor = new Editor({
      el: document.querySelector('#editSection'),
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height: '800px',
      hideModeSwitch: true,
      exts: ['scrollSync'],
      toolbarItems: [
        'heading',
        'bold',
        'italic',
        'strike',
        'divider',
        'hr',
        'quote',
        'divider',
        'ul',
        'ol',
        'task',
        'indent',
        'outdent',
        'divider',
        'table',
        'link',
        'divider',
        'code',
        'codeblock',
        'divider',
      ],
    });
    const toolbar = editor.getUI()
      .getToolbar();
    toolbar.addButton({
      name: 'upload',
      className: 'tui-image',
      event: 'upload',
      tooltip: 'Upload Images',
    }, -1);
    this.editorInstance = editor;
  };

  @action getPageType = () => {
    this.pageType = document.location.pathname.indexOf('update') !== -1;
  };

  @computed get curId() {
    return document.location.pathname.split('/').slice(-1)[0];
  }

  getDataById = async () => {
    try {
      const response = await this.articleApi.getDataById(this.curId);
      runInAction(() => {
        this.headerCover = response.data.header_cover;
        this.title = response.data.title;
        this.summary = response.data.summary;
        this.tags = response.data.tags;
      });
    } catch (e) {
      message.error('unknown error!');
    }
  };

  insertData = async (content) => {
    const params = {
      header_cover: this.headerCover,
      title: this.title,
      summary: this.summary,
      content,
      tags: this.tags,
    };
    try {
      const response = await this.articleApi.insertData(params);
      message.success('insert success');
    } catch (e) {
      message.error('unknown error!');
    }
  };

  @action onHeaderCoverChange = (e) => {
    this.headerCover = e.target.value;
  };

  @action onTitleChange = (e) => {
    this.title = e.target.value;
  };

  @action onSummaryChange = (e) => {
    this.summary = e.target.value;
    console.log(this.summary);
  };

  @action onContentChange = (e) => {
    this.content = e.target.value;
  };

  @action onTagsChange = (e) => {
    this.tags = e.target.value;
  };

  @action onLastModifiedDateChange = (e) => {
    this.lastModifiedDate = e.target.value;
  };

  @action onHeaderCoverUploadChange = (info) => {
    if (info.file.status === 'uploading') {
      this.uploadStatus = true;
      return;
    }
    if (info.file.status === 'done') {
      this.uploadStatus = false;
      this.headerCover = info.file.response.path;
    }
  };

  @action onContentImageUploadChange = (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      this.editorImageName = info.file.name;
      this.editorImage = info.file.response.path;
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // tags
  @action handleClose = (removedTag) => {
    this.tags = this.tags.filter(tag => tag !== removedTag);
    console.log(this.tags);
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
    console.log(this.tags);
    this.inputValue = '';
    this.inputVisible = false;
  };

  saveInputRef = input => this.input = input; /* eslint-disable-line */

  @computed get isFilled() {
    return this.headerCover !== '' && this.title !== '' && this.summary !== '' && this.tags.length !== 0;
  }

  // save
  @action handleSave = (content) => {
    if (content) {
      if (this.isFilled) {
        this.insertData(content);
      } else {
        message.error('All items are required～');
      }
    } else {
      message.error('Write something?');
    }
  };
}

const articleDetailStore = new ArticleDetailStore(articleApi);

export default articleDetailStore;

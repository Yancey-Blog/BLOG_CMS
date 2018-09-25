import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Button, Icon, Popconfirm, Input, Upload, Modal, message, Spin,
} from 'antd';
import Editor from 'tui-editor';
import 'tui-editor/dist/tui-editor-extScrollSync.min';
import { beforeUpload } from '../../util/tools';
import 'codemirror/lib/codemirror.css';
import 'tui-editor/dist/tui-editor.min.css';
import 'tui-editor/dist/tui-editor-contents.min.css';
import 'highlightjs/styles/github.css';
import './articleDetail.css';

const { TextArea } = Input;
const Dragger = Upload.Dragger;

@inject('articleDetailStore')
@observer
class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentDidMount() {
    this.initEditor();
  }

  initEditor = () => {
    const { articleDetailStore } = this.props;

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

    const toolbar = editor.getUI().getToolbar();

    editor.eventManager.addEventType('upload');
    editor.eventManager.listen('upload', () => {
      Modal.confirm({
        title: 'upload image',
        width: 700,
        content: (
          <div>
            <Spin spinning={articleDetailStore.loading} />
            <Dragger
              name="avatar"
              action="http://127.0.0.1:3001/api/uploads"
              beforeUpload={beforeUpload}
              onChange={articleDetailStore.onContentImageUploadChange}
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
            </Dragger>
          </div>
        ),
        onOk() {
          editor.insertText(`\n\n![${articleDetailStore.editorImageName}](${articleDetailStore.editorImage})`);
          console.log(editor.getValue());
        },
      });
    });

    toolbar.addButton({
      name: 'upload',
      className: 'tui-image',
      event: 'upload',
      tooltip: 'Upload Images',
    }, -1);

  };

  render() {
    const { articleDetailStore } = this.props;
    const uploadButton = (
      <div>
        <Icon type={articleDetailStore.uploadStatus ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <main className="wrapper article_detail_wrapper">
        <h1>
            Add New Article
        </h1>
        <section className="article_detail_container">
          <span style={{ lineHeight: '102px' }}>
                Header Cover:
          </span>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="http://127.0.0.1:3001/api/uploads"
            beforeUpload={beforeUpload}
            onChange={articleDetailStore.onHeaderCoverUploadChange}
          >
            {articleDetailStore.headerCover ? <img src={articleDetailStore.headerCover} alt="avatar" /> : uploadButton}
          </Upload>
          <span>
            Title:
          </span>
          <Input
            defaultValue={articleDetailStore.title}
            placeholder="Input title..."
            onChange={event => articleDetailStore.onTitleChange(event)}
          />
          <span>
            Summary:
          </span>
          <TextArea
            rows={8}
            defaultValue={articleDetailStore.title}
            placeholder="Input summary..."
            onChange={event => articleDetailStore.onSummaryChange(event)}
          />
        </section>
        <span
          style={{ position: 'relative', top: 400 }}
        >
          Content:
        </span>
        <div id="editSection" />
      </main>
    );
  }
}


export default ArticleDetail;

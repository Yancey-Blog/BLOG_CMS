import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Table, Button, Modal, Input, Icon, Popconfirm, Upload, Row, Col,
} from 'antd';

import {
  formatJSONDate, beforeUpload, capitalized, checkWebp, webp, upload,
} from '../../../util/tools';

const { Column, ColumnGroup } = Table;

@inject('projectStore')
@observer
class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentDidMount() {
    const { projectStore } = this.props;
    projectStore.getData();
  }

  render() {
    const { projectStore } = this.props;
    const selectedRowKeysLength = projectStore.selectedRowKeys.length;
    const rowSelection = {
      selectedRowKeys: projectStore.selectedRowKeys,
      onChange: projectStore.onSelectChange,
    };
    const pagination = {
      total: projectStore.dataSource.length,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      pageSize: 10,
      defaultCurrent: 1,
    };
    const uploadButton = (
      <div>
        <Icon type={projectStore.uploadStatus ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <main className="wrapper project_wrapper">
        <div className="add_batch_delete_wrapper">
          <Button
            onClick={() => projectStore.openModal('add')}
            type="primary"
            style={{
              marginBottom: 16,
              marginRight: 20,
            }}
          >
            <Icon
              type="plus"
              theme="outlined"
            />
            Add
          </Button>
          <Popconfirm
            title={`Are you sure delete ${selectedRowKeysLength} ${selectedRowKeysLength > 1 ? 'items' : 'item'}?`}
            icon={<Icon type="warning" style={{ color: 'red' }} />}
            onConfirm={() => projectStore.batchDelete()}
          >
            <Button
              type="danger"
              disabled={!(selectedRowKeysLength > 0)}
            >
              <Icon
                type="delete"
                theme="outlined"
              />
              Batch Delete
            </Button>
          </Popconfirm>
          <span style={{ marginLeft: 8 }}>
            {selectedRowKeysLength > 0 ? `Selected ${selectedRowKeysLength} ${selectedRowKeysLength > 1 ? 'items' : 'item'}` : ''}
          </span>
        </div>
        <Table
          rowKey={record => record._id} /* eslint-disable-line */
          dataSource={projectStore.dataSource}
          rowSelection={rowSelection}
          pagination={pagination}
        >
          <ColumnGroup>
            <Column
              title="Id"
              dataIndex="_id"
              key="_id"
            />
            <Column
              title="Title"
              dataIndex="title"
              key="title"
            />
            <Column
              title="Introduction"
              dataIndex="introduction"
              key="introduction"
            />
            <Column
              title="Url"
              dataIndex="url"
              key="url"
            />
            <Column
              title="Poster"
              dataIndex="poster"
              render={(text, record) => (
                <span>
                  <img
                    src={checkWebp() ? `${record.poster}${webp}` : record.poster}
                    alt={record.title}
                    style={{
                      width: 120, height: 120, objectFit: 'cover', cursor: 'pointer', borderRadius: 4,
                    }}
                    onClick={() => Modal.info({
                      width: 740,
                      iconType: 'zoom-in',
                      maskClosable: true,
                      title: 'Look full size picture',
                      content: <img
                        src={checkWebp() ? `${record.poster}${webp}` : record.poster}
                        alt={record.title}
                        style={{
                          marginTop: 10, width: '600px',
                        }}
                      />,
                    })}
                  />
                </span>
              )}
            />
            <Column
              title="Upload Date"
              key="upload_date"
              render={(text, record) => (
                <span>
                  {formatJSONDate(record.upload_date)}
                </span>
              )}
            />
            <Column
              title="Operation"
              key="operation"
              render={(text, record) => (
                <span>
                  <Icon
                    type="edit"
                    theme="twoTone"
                    twoToneColor="#007fff"
                    style={{ cursor: 'pointer', marginRight: 16 }}
                    onClick={
                      () => projectStore.openModal('update', record._id, record.title, record.introduction, record.poster, record.url) /* eslint-disable-line */
                    }
                  />
                  <Popconfirm
                    title="Are you sure delete this project?"
                    icon={<Icon type="warning" style={{ color: 'red' }} />}
                    onConfirm={() => projectStore.deleteData(record._id)} /* eslint-disable-line */
                  >
                    <Icon
                      type="delete"
                      theme="twoTone"
                      twoToneColor="#f5222d"
                      style={{ cursor: 'pointer' }}
                    />
                  </Popconfirm>
                </span>
              )}
            />
          </ColumnGroup>
        </Table>
        <Modal
          title={(
            <span>
              <Icon
                type="plus-circle"
                theme="twoTone"
                twoToneColor="#faad14"
                style={{ marginRight: 10 }}
              />
              {projectStore.modalType === 'add' ? 'Add New' : 'Update The'}
              {' '}
              Project
            </span>
          )}
          width={600}
          wrapClassName="reset_modal"
          closable={false}
          destroyOnClose
          visible={projectStore.showModal}
          okButtonProps={{ disabled: !projectStore.isFilled }}
          okText={capitalized(projectStore.modalType)}
          onOk={projectStore.modalType === 'add' ? () => projectStore.insertData() : () => projectStore.modifyData()}
          onCancel={projectStore.closeModal}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <span style={{ lineHeight: '32px' }}>
                Project Title:
              </span>
            </Col>
            <Col className="gutter-row" span={16}>
              <Input
                defaultValue={projectStore.title}
                placeholder="Project Title"
                onChange={event => projectStore.onTitleChange(event)}
              />
            </Col>
            <Col className="gutter-row" span={8} style={{ marginTop: 20, marginBottom: 20 }}>
              <span style={{ lineHeight: '32px' }}>
                Project Introduction:
              </span>
            </Col>
            <Col className="gutter-row" span={16} style={{ marginTop: 20, marginBottom: 20 }}>
              <Input
                defaultValue={projectStore.introduction}
                placeholder="Project Introduction"
                onChange={event => projectStore.onIntroductionChange(event)}
              />
            </Col>
            <Col className="gutter-row" span={8} style={{ marginBottom: 20 }}>
              <span style={{ lineHeight: '32px' }}>
                Project Url:
              </span>
            </Col>
            <Col className="gutter-row" span={16} style={{ marginBottom: 20 }}>
              <Input
                defaultValue={projectStore.url}
                placeholder="Project Url"
                onChange={event => projectStore.onUrlChange(event)}
              />
            </Col>
            <Col className="gutter-row" span={8}>
              <span style={{ lineHeight: '102px' }}>
                Upload Poster:
                <br />
              </span>
            </Col>
            <Col className="gutter-row" span={6}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                {...upload()}
                beforeUpload={beforeUpload}
                onChange={projectStore.onUploadChange}
              >
                {projectStore.poster ? <img src={projectStore.poster} alt="avatar" /> : uploadButton}
              </Upload>
            </Col>
          </Row>
        </Modal>
      </main>
    );
  }
}


export default Project;

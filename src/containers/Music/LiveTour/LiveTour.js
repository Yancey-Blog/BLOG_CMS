import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Table, Button, Modal, Input, Icon, Popconfirm, Upload, Row, Col,
} from 'antd';
import {
  formatJSONDate, beforeUpload, capitalized, checkWebp, webp, upload,
} from '../../../util/tools';

const { Column, ColumnGroup } = Table;

@inject('liveTourStore')
@observer
class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { liveTourStore } = this.props;
    liveTourStore.getData();
  }

  render() {
    const { liveTourStore } = this.props;
    const selectedRowKeysLength = liveTourStore.selectedRowKeys.length;
    const rowSelection = {
      selectedRowKeys: liveTourStore.selectedRowKeys,
      onChange: liveTourStore.onSelectChange,
    };
    const pagination = {
      total: liveTourStore.dataSource.length,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      pageSize: 10,
      defaultCurrent: 1,
    };
    const uploadButton = (
      <div>
        <Icon type={liveTourStore.uploadStatus ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <main className="wrapper live_tour_wrapper">
        <div className="add_batch_delete_wrapper">
          <Button
            onClick={() => liveTourStore.openModal('add')}
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
            onConfirm={() => liveTourStore.batchDelete()}
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
          dataSource={liveTourStore.dataSource}
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
                      () => liveTourStore.openModal('update', record._id, record.title, record.poster) /* eslint-disable-line */
                    }
                  />
                  <Popconfirm
                    title="Are you sure delete this live tour information?"
                    icon={<Icon type="warning" style={{ color: 'red' }} />}
                    onConfirm={() => liveTourStore.deleteData(record._id)} /* eslint-disable-line */
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
              {liveTourStore.modalType === 'add' ? 'Add New' : 'Update The'}
              {' '}
              Live Tour
            </span>
          )}
          width={600}
          wrapClassName="reset_modal"
          closable={false}
          destroyOnClose
          visible={liveTourStore.showModal}
          okButtonProps={{ disabled: !liveTourStore.isFilled }}
          okText={capitalized(liveTourStore.modalType)}
          onOk={liveTourStore.modalType === 'add' ? () => liveTourStore.insertData() : () => liveTourStore.modifyData()}
          onCancel={liveTourStore.closeModal}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={8} style={{ marginBottom: 20 }}>
              <span style={{ lineHeight: '32px' }}>
                Live Tour Title:
              </span>
            </Col>
            <Col className="gutter-row" span={16} style={{ marginBottom: 20 }}>
              <Input
                defaultValue={liveTourStore.title}
                placeholder="Live Tour Title"
                onChange={event => liveTourStore.onTitleChange(event)}
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
                onChange={liveTourStore.onUploadChange}
              >
                {liveTourStore.poster ? <img src={liveTourStore.poster} alt="avatar" /> : uploadButton}
              </Upload>
            </Col>
          </Row>
        </Modal>
      </main>
    );
  }
}


export default Project;

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Table, Button, Modal, Input, Icon, Popconfirm, Upload, Row, Col,
} from 'antd';

import { formatJSONDate, beforeUpload, capitalized } from '../../../util/tools';

const { Column, ColumnGroup } = Table;

@inject('featuredRecordStore')
@observer
class FeaturedRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { featuredRecordStore } = this.props;
    const selectedRowKeysLength = featuredRecordStore.selectedRowKeys.length;
    const rowSelection = {
      selectedRowKeys: featuredRecordStore.selectedRowKeys,
      onChange: featuredRecordStore.onSelectChange,
    };
    const pagination = {
      total: featuredRecordStore.dataSource.length,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      pageSize: 10,
      defaultCurrent: 1,
    };
    const uploadButton = (
      <div>
        <Icon type={featuredRecordStore.uploadStatus ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <main className="featured_record_wrapper">
        <div className="add_batch_delete_wrapper">
          <Button
            onClick={() => featuredRecordStore.openModal('add')}
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
            Add a row
          </Button>
          <Popconfirm
            title={`Are you sure to delete ${selectedRowKeysLength} ${selectedRowKeysLength > 1 ? 'items' : 'item'}?`}
            icon={<Icon type="warning" style={{ color: 'red' }} />}
            onConfirm={() => featuredRecordStore.batchDelete()}
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
          dataSource={featuredRecordStore.dataSource}
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
              title="Buy Link"
              dataIndex="url"
              key="url"
            />
            <Column
              title="Poster"
              dataIndex="poster"
              render={(text, record) => (
                <span>
                  <img
                    src={record.poster}
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
                        src={record.poster}
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
                      () => featuredRecordStore.openModal('update', record._id, record.title, record.poster, record.url) /* eslint-disable-line */
                    }
                  />
                  <Popconfirm
                    title="Are you sure to delete this record?"
                    icon={<Icon type="warning" style={{ color: 'red' }} />}
                    onConfirm={() => featuredRecordStore.deleteData(record._id)} /* eslint-disable-line */
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
                Add new Project
            </span>
          )}
          width={600}
          wrapClassName="reset_modal"
          closable={false}
          destroyOnClose
          visible={featuredRecordStore.showModal}
          okButtonProps={{ disabled: !featuredRecordStore.isFilled }}
          okText={capitalized(featuredRecordStore.modalType)}
          onOk={featuredRecordStore.modalType === 'add' ? () => featuredRecordStore.insertData() : () => featuredRecordStore.modifyData()}
          onCancel={featuredRecordStore.closeModal}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <span style={{ lineHeight: '32px' }}>
                Record Title:
              </span>
            </Col>
            <Col className="gutter-row" span={16}>
              <Input
                defaultValue={featuredRecordStore.title}
                placeholder="Record Title"
                onChange={event => featuredRecordStore.onTitleChange(event)}
              />
            </Col>
            <Col className="gutter-row" span={8} style={{ marginTop: 20, marginBottom: 20 }}>
              <span style={{ lineHeight: '32px' }}>
                Buy Url:
              </span>
            </Col>
            <Col className="gutter-row" span={16} style={{ marginTop: 20, marginBottom: 20 }}>
              <Input
                defaultValue={featuredRecordStore.url}
                placeholder="Buy Url"
                onChange={event => featuredRecordStore.onUrlChange(event)}
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
                action="http://127.0.0.1:3001/api/uploads"
                beforeUpload={beforeUpload}
                onChange={featuredRecordStore.onUploadChange}
              >
                {featuredRecordStore.poster ? <img src={featuredRecordStore.poster} alt="avatar" /> : uploadButton}
              </Upload>
            </Col>
          </Row>
        </Modal>
      </main>
    );
  }
}


export default FeaturedRecord;

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Table, Button, Modal, Input, Icon, Popconfirm, Upload, Row, Col, Switch,
} from 'antd';

import {
  formatJSONDate, beforeUpload, capitalized, checkWebp, webp, upload,
} from '../../../util/tools';

const { Column, ColumnGroup } = Table;

@inject('coverStore')
@observer
class Cover extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { coverStore } = this.props;
    coverStore.getData();
  }

  render() {
    const { coverStore } = this.props;
    const selectedRowKeysLength = coverStore.selectedRowKeys.length;
    const rowSelection = {
      selectedRowKeys: coverStore.selectedRowKeys,
      onChange: coverStore.onSelectChange,
    };
    const pagination = {
      total: coverStore.dataSource.length,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      pageSize: 10,
      defaultCurrent: 1,
    };
    const uploadButton = (
      <div>
        <Icon type={coverStore.uploadStatus ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <main className="wrapper cover_wrapper">
        <div className="add_batch_delete_wrapper">
          <Button
            onClick={() => coverStore.openModal('add')}
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
            onConfirm={() => coverStore.batchDelete()}
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
          dataSource={coverStore.dataSource}
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
              title="Name"
              dataIndex="name"
              key="name"
            />
            <Column
              title="Cover"
              dataIndex="cover"
              render={(text, record) => (
                <span>
                  <img
                    src={checkWebp() ? `${record.url}${webp}` : record.url}
                    alt={record.name}
                    style={{
                      width: 120, height: 120, objectFit: 'cover', cursor: 'pointer', borderRadius: 4,
                    }}
                    onClick={() => Modal.info({
                      width: 940,
                      iconType: 'zoom-in',
                      maskClosable: true,
                      title: 'Look full size picture',
                      content: <img
                        src={checkWebp() ? `${record.url}${webp}` : record.url}
                        alt={record.name}
                        style={{
                          marginTop: 10, width: '800px',
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
              title="Show"
              dataIndex="show"
              filters={[{ text: 'show', value: 'true' }, { text: 'hide', value: 'false' }]}
              filterMultiple={false}
              onFilter={(value, record) => record.show.toString().indexOf(value) === 0}
              render={(text, record) => (
                <span>
                  <Switch
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="close" />}
                    defaultChecked={record.show}
                    onChange={checked => coverStore.onSwitchShow(record._id, record.name, record.url, checked)} /* eslint-disable-line */
                  />
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
                      () => coverStore.openModal('update', record._id, record.name, record.url, record.show) /* eslint-disable-line */
                    }
                  />
                  <Popconfirm
                    title="Are you sure delete this cover?"
                    icon={<Icon type="warning" style={{ color: 'red' }} />}
                    onConfirm={() => coverStore.deleteData(record._id)} /* eslint-disable-line */
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
              {coverStore.modalType === 'add' ? 'Add New' : 'Update The'}
              {' '}
              Cover
            </span>
          )}
          width={600}
          wrapClassName="reset_modal"
          closable={false}
          destroyOnClose
          visible={coverStore.showModal}
          okButtonProps={{ disabled: !coverStore.isFilled }}
          okText={capitalized(coverStore.modalType)}
          onOk={coverStore.modalType === 'add' ? () => coverStore.insertData() : () => coverStore.modifyData()}
          onCancel={coverStore.closeModal}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={8} style={{ marginBottom: 20 }}>
              <span style={{ lineHeight: '32px' }}>
                Cover Title:
              </span>
            </Col>
            <Col className="gutter-row" span={16} style={{ marginBottom: 20 }}>
              <Input
                defaultValue={coverStore.name}
                placeholder="Cover Title"
                onChange={event => coverStore.onTitleChange(event)}
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
                onChange={coverStore.onUploadChange}
              >
                {coverStore.coverUrl ? <img src={coverStore.coverUrl} alt="avatar" /> : uploadButton}
              </Upload>
            </Col>
          </Row>
        </Modal>
      </main>
    );
  }
}


export default Cover;

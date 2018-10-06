import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Table, Button, Modal, Input, Icon, Popconfirm, Upload, Row, Col, DatePicker,
} from 'antd';
import moment from 'moment';
import {
  formatJSONDate, beforeUpload, capitalized, getCurrentDate, checkWebp, webp, upload,
} from '../../util/tools';

const { Column, ColumnGroup } = Table;
const { TextArea } = Input;

@inject('aboutStore')
@observer
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { aboutStore } = this.props;
    aboutStore.getData();
  }

  render() {
    const { aboutStore } = this.props;
    const selectedRowKeysLength = aboutStore.selectedRowKeys.length;
    const rowSelection = {
      selectedRowKeys: aboutStore.selectedRowKeys,
      onChange: aboutStore.onSelectChange,
    };
    const pagination = {
      total: aboutStore.dataSource.length,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      pageSize: 10,
      defaultCurrent: 1,
    };
    const uploadButton = (
      <div>
        <Icon type={aboutStore.uploadStatus ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const dateFormat = 'YYYY-MM-DD';
    return (
      <main className="wrapper about_wrapper">
        <div className="add_batch_delete_wrapper">
          <Button
            onClick={() => aboutStore.openModal('add')}
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
            onConfirm={() => aboutStore.batchDelete()}
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
          dataSource={aboutStore.dataSource}
          rowSelection={rowSelection}
          pagination={pagination}
        >
          <ColumnGroup>
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
              title="Cover"
              dataIndex="cover"
              render={(text, record) => (
                <span>
                  <img
                    src={checkWebp() ? `${record.cover}${webp}` : record.cover}
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
                        src={checkWebp() ? `${record.cover}${webp}` : record.cover}
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
              title="Date"
              key="release_date"
              render={(text, record) => (
                <span>
                  {formatJSONDate(record.release_date).split(' ')[0]}
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
                      () => aboutStore.openModal('update', record._id, record.title, record.introduction, record.release_date, record.cover) /* eslint-disable-line */
                    }
                  />
                  <Popconfirm
                    title="Are you sure delete this record?"
                    icon={<Icon type="warning" style={{ color: 'red' }} />}
                    onConfirm={() => aboutStore.deleteData(record._id)} /* eslint-disable-line */
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
              {aboutStore.modalType === 'add' ? 'Add New' : 'Update The'}
              {' '}
              Blog History
            </span>
          )}
          width={600}
          wrapClassName="reset_modal"
          closable={false}
          destroyOnClose
          visible={aboutStore.showModal}
          okButtonProps={{ disabled: !aboutStore.isFilled }}
          okText={capitalized(aboutStore.modalType)}
          onOk={aboutStore.modalType === 'add' ? () => aboutStore.insertData() : () => aboutStore.modifyData()}
          onCancel={aboutStore.closeModal}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <span style={{ lineHeight: '32px' }}>
                Title:
              </span>
            </Col>
            <Col className="gutter-row" span={16}>
              <Input
                defaultValue={aboutStore.title}
                placeholder="Title"
                onChange={event => aboutStore.onTitleChange(event)}
              />
            </Col>
            <Col className="gutter-row" span={8} style={{ marginTop: 20, marginBottom: 20 }}>
              <span style={{ lineHeight: '32px' }}>
                Introduction:
              </span>
            </Col>
            <Col className="gutter-row" span={16} style={{ marginTop: 20, marginBottom: 20 }}>
              <TextArea
                rows={3}
                defaultValue={aboutStore.introduction}
                placeholder="Introduction"
                onChange={event => aboutStore.onIntroductionChange(event)}
              />
            </Col>
            <Col className="gutter-row" span={8} style={{ marginBottom: 20 }}>
              <span style={{ lineHeight: '32px' }}>
                Release Date:
              </span>
            </Col>
            <Col className="gutter-row" span={16} style={{ marginBottom: 20 }}>
              <DatePicker
                defaultValue={moment(aboutStore.releaseDate !== '' ? aboutStore.releaseDate : getCurrentDate(), dateFormat)}
                format={dateFormat}
                onChange={(date, dateString) => aboutStore.onReleaseDateChange(date, dateString)}
              />
            </Col>
            <Col className="gutter-row" span={8}>
              <span style={{ lineHeight: '102px' }}>
                Upload Cover:
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
                onChange={aboutStore.onUploadChange}
              >
                {aboutStore.cover ? <img src={aboutStore.cover} alt="avatar" /> : uploadButton}
              </Upload>
            </Col>
          </Row>
        </Modal>
      </main>
    );
  }
}


export default About;

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Table, Button, Modal, Input, Icon, Popconfirm, Upload, Row, Col, DatePicker,
} from 'antd';
import moment from 'moment';
import {
  formatJSONDate, beforeUpload, capitalized, getCurrentDate, checkWebp, webp, upload,
} from '../../../util/tools';

const { Column, ColumnGroup } = Table;

@inject('yanceyMusicStore')
@observer
class YanceyMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { yanceyMusicStore } = this.props;
    yanceyMusicStore.getData();
  }

  render() {
    const { yanceyMusicStore } = this.props;
    const selectedRowKeysLength = yanceyMusicStore.selectedRowKeys.length;
    const rowSelection = {
      selectedRowKeys: yanceyMusicStore.selectedRowKeys,
      onChange: yanceyMusicStore.onSelectChange,
    };
    const pagination = {
      total: yanceyMusicStore.dataSource.length,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      pageSize: 10,
      defaultCurrent: 1,
    };
    const uploadButton = (
      <div>
        <Icon type={yanceyMusicStore.uploadStatus ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const dateFormat = 'YYYY-MM-DD';
    return (
      <main className="wrapper featured_record_wrapper">
        <div className="add_batch_delete_wrapper">
          <Button
            onClick={() => yanceyMusicStore.openModal('add')}
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
            onConfirm={() => yanceyMusicStore.batchDelete()}
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
          dataSource={yanceyMusicStore.dataSource}
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
              title="SoundCloud Url"
              dataIndex="soundCloud_url"
              key="soundCloud_url"
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
              title="Release Date"
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
                      () => yanceyMusicStore.openModal('update', record._id, record.title, record.soundCloud_url, record.release_date, record.cover) /* eslint-disable-line */
                    }
                  />
                  <Popconfirm
                    title="Are you sure delete this music?"
                    icon={<Icon type="warning" style={{ color: 'red' }} />}
                    onConfirm={() => yanceyMusicStore.deleteData(record._id)} /* eslint-disable-line */
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
              {yanceyMusicStore.modalType === 'add' ? 'Add New' : 'Update The'}
              {' '}
              Music
            </span>
          )}
          width={600}
          wrapClassName="reset_modal"
          closable={false}
          destroyOnClose
          visible={yanceyMusicStore.showModal}
          okButtonProps={{ disabled: !yanceyMusicStore.isFilled }}
          okText={capitalized(yanceyMusicStore.modalType)}
          onOk={yanceyMusicStore.modalType === 'add' ? () => yanceyMusicStore.insertData() : () => yanceyMusicStore.modifyData()}
          onCancel={yanceyMusicStore.closeModal}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <span style={{ lineHeight: '32px' }}>
                Music Title:
              </span>
            </Col>
            <Col className="gutter-row" span={16}>
              <Input
                defaultValue={yanceyMusicStore.title}
                placeholder="Music Title"
                onChange={event => yanceyMusicStore.onTitleChange(event)}
              />
            </Col>
            <Col className="gutter-row" span={8} style={{ marginTop: 20, marginBottom: 20 }}>
              <span style={{ lineHeight: '32px' }}>
                SoundCloud Url:
              </span>
            </Col>
            <Col className="gutter-row" span={16} style={{ marginTop: 20, marginBottom: 20 }}>
              <Input
                defaultValue={yanceyMusicStore.soundCloudUrl}
                placeholder="SoundCloud Url"
                onChange={event => yanceyMusicStore.onSoundCloudUrlChange(event)}
              />
            </Col>
            <Col className="gutter-row" span={8} style={{ marginBottom: 20 }}>
              <span style={{ lineHeight: '32px' }}>
                Release Date:
              </span>
            </Col>
            <Col className="gutter-row" span={16} style={{ marginBottom: 20 }}>
              <DatePicker
                defaultValue={moment(yanceyMusicStore.releaseDate !== '' ? yanceyMusicStore.releaseDate : getCurrentDate(), dateFormat)}
                format={dateFormat}
                onChange={(date, dateString) => yanceyMusicStore.onReleaseDateChange(date, dateString)}
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
                onChange={yanceyMusicStore.onUploadChange}
              >
                {yanceyMusicStore.cover ? <img src={yanceyMusicStore.cover} alt="avatar" /> : uploadButton}
              </Upload>
            </Col>
          </Row>
        </Modal>
      </main>
    );
  }
}


export default YanceyMusic;

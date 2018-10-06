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

@inject('featuredRecordStore')
@observer
class FeaturedRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { featuredRecordStore } = this.props;
    featuredRecordStore.getData();
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
    const dateFormat = 'YYYY-MM-DD';
    return (
      <main className="wrapper featured_record_wrapper">
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
            Add
          </Button>
          <Popconfirm
            title={`Are you sure delete ${selectedRowKeysLength} ${selectedRowKeysLength > 1 ? 'items' : 'item'}?`}
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
              title="Album"
              dataIndex="album_name"
              key="album_name"
            />
            <Column
              title="Artist"
              dataIndex="artist"
              key="artist"
            />
            <Column
              title="Buy Link"
              dataIndex="buy_url"
              key="buy_url"
            />
            <Column
              title="Cover"
              dataIndex="cover"
              render={(text, record) => (
                <span>
                  <img
                    src={checkWebp() ? `${record.cover}${webp}` : record.cover}
                    alt={record.album_name}
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
                        alt={record.album_name}
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
                      () => featuredRecordStore.openModal('update', record._id, record.album_name, record.artist, record.buy_url, record.release_date, record.cover) /* eslint-disable-line */
                    }
                  />
                  <Popconfirm
                    title="Are you sure delete this record?"
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
              {featuredRecordStore.modalType === 'add' ? 'Add New' : 'Update The'}
              {' '}
              Album
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
                Album Name:
              </span>
            </Col>
            <Col className="gutter-row" span={16}>
              <Input
                defaultValue={featuredRecordStore.albumName}
                placeholder="Album Name"
                onChange={event => featuredRecordStore.onAlbumNameChange(event)}
              />
            </Col>
            <Col className="gutter-row" span={8} style={{ marginTop: 20, marginBottom: 20 }}>
              <span style={{ lineHeight: '32px' }}>
                Artist:
              </span>
            </Col>
            <Col className="gutter-row" span={16} style={{ marginTop: 20, marginBottom: 20 }}>
              <Input
                defaultValue={featuredRecordStore.artist}
                placeholder="Artist"
                onChange={event => featuredRecordStore.onArtistChange(event)}
              />
            </Col>
            <Col className="gutter-row" span={8} style={{ marginBottom: 20 }}>
              <span style={{ lineHeight: '32px' }}>
                Buy Url:
              </span>
            </Col>
            <Col className="gutter-row" span={16} style={{ marginBottom: 20 }}>
              <Input
                defaultValue={featuredRecordStore.buyUrl}
                placeholder="Buy Url"
                onChange={event => featuredRecordStore.onBuyUrlChange(event)}
              />
            </Col>
            <Col className="gutter-row" span={8} style={{ marginBottom: 20 }}>
              <span style={{ lineHeight: '32px' }}>
                Release Date:
              </span>
            </Col>
            <Col className="gutter-row" span={16} style={{ marginBottom: 20 }}>
              <DatePicker
                defaultValue={moment(featuredRecordStore.releaseDate !== '' ? featuredRecordStore.releaseDate : getCurrentDate(), dateFormat)}
                format={dateFormat}
                onChange={(date, dateString) => featuredRecordStore.onReleaseDateChange(date, dateString)}
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
                onChange={featuredRecordStore.onUploadChange}
              >
                {featuredRecordStore.cover ? <img src={featuredRecordStore.cover} alt="avatar" /> : uploadButton}
              </Upload>
            </Col>
          </Row>
        </Modal>
      </main>
    );
  }
}


export default FeaturedRecord;

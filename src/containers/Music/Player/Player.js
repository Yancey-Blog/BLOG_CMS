import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Table, Button, Modal, Input, Icon, Popconfirm, Upload, Row, Col, Switch,
} from 'antd';
import {
  formatJSONDate, beforeUpload, musicBeforeUpload, capitalized, checkWebp, webp, upload,
} from '../../../util/tools';

const { Column, ColumnGroup } = Table;
const { TextArea } = Input;

@inject('playerStore')
@observer
class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { playerStore } = this.props;
    playerStore.getData();
  }

  render() {
    const { playerStore } = this.props;
    const selectedRowKeysLength = playerStore.selectedRowKeys.length;
    const rowSelection = {
      selectedRowKeys: playerStore.selectedRowKeys,
      onChange: playerStore.onSelectChange,
    };
    const pagination = {
      total: playerStore.dataSource.length,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      pageSize: 10,
      defaultCurrent: 1,
    };
    const uploadButton = (
      <div>
        <Icon type={playerStore.imgUploadStatus ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const props = playerStore.musicFileUrl ? {
      defaultFileList: [{
        uid: -1, status: 'done', name: playerStore.title, url: playerStore.musicFileUrl,
      }],
    } : {};

    return (
      <main className="wrapper cover_wrapper">
        <div className="add_batch_delete_wrapper">
          <Button
            onClick={() => playerStore.openModal('add')}
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
            onConfirm={() => playerStore.batchDelete()}
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
          dataSource={playerStore.dataSource}
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
              title="Artist"
              dataIndex="artist"
              filters={playerStore.artistData}
              filterMultiple
              onFilter={(value, record) => record.artist.indexOf(value) === 0}
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
              title="Cover"
              dataIndex="cover"
              render={(text, record) => (
                <span>
                  <img
                    src={checkWebp() ? `${record.cover}${webp}` : record.cover}
                    alt={`${record.artist} - ${record.title}`}
                    style={{
                      width: 120, height: 120, objectFit: 'cover', cursor: 'pointer', borderRadius: 4,
                    }}
                    onClick={() => Modal.info({
                      width: 940,
                      iconType: 'zoom-in',
                      maskClosable: true,
                      title: 'Look full size picture',
                      content: <img
                        src={checkWebp() ? `${record.cover}${webp}` : record.cover}
                        alt={`${record.artist} - ${record.title}`}
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
              title="Music File"
              dataIndex="music_file_url"
              render={(text, record) => (
                <span>
                  <audio src={record.music_file_url} controls="controls">
                    Your browser does not support the audio element.
                  </audio>
                </span>
              )}
            />
            <Column
              title="LRC"
              dataIndex="lrc"
              render={(text, record) => (
                <span>
                  <Button
                    type="primary"
                    onClick={() => Modal.info({
                      width: 600,
                      iconType: 'zoom-in',
                      maskClosable: true,
                      title: 'LRC Detail',
                      content: <TextArea
                        rows={20}
                        defaultValue={record.lrc}
                        disabled
                      />,
                    })}
                  >
                    <Icon type="file-text" theme="outlined" />
                    Detail
                  </Button>
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
                    onChange={checked => playerStore.onSwitchShow(record._id, record.title, record.artist, record.cover, record.music_file_url, record.lrc, checked)} /* eslint-disable-line */
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
                      () => playerStore.openModal('update', record._id, record.title, record.artist, record.cover, record.music_file_url, record.lrc, record.show) /* eslint-disable-line */
                    }
                  />
                  <Popconfirm
                    title="Are you sure delete the music?"
                    icon={<Icon type="warning" style={{ color: 'red' }} />}
                    onConfirm={() => playerStore.deleteData(record._id)} /* eslint-disable-line */
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
              {playerStore.modalType === 'add' ? 'Add New' : 'Update The'}
              {' '}
              Music
            </span>
          )}
          width={600}
          wrapClassName="reset_modal"
          closable={false}
          destroyOnClose
          visible={playerStore.showModal}
          okButtonProps={{ disabled: !playerStore.isFilled }}
          okText={capitalized(playerStore.modalType)}
          onOk={playerStore.modalType === 'add' ? () => playerStore.insertData() : () => playerStore.modifyData()}
          onCancel={playerStore.closeModal}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={8} style={{ marginBottom: 20 }}>
              <span style={{ lineHeight: '32px' }}>
                Music Title:
              </span>
            </Col>
            <Col className="gutter-row" span={16} style={{ marginBottom: 20 }}>
              <Input
                defaultValue={playerStore.title}
                placeholder="Music Title"
                onChange={event => playerStore.onTitleChange(event)}
              />
            </Col>
            <Col className="gutter-row" span={8} style={{ marginBottom: 20 }}>
              <span style={{ lineHeight: '32px' }}>
                Artist:
              </span>
            </Col>
            <Col className="gutter-row" span={16} style={{ marginBottom: 20 }}>
              <Input
                defaultValue={playerStore.artist}
                placeholder="Artist"
                onChange={event => playerStore.onArtistChange(event)}
              />
            </Col>
            <Col className="gutter-row" span={8} style={{ marginBottom: 20 }}>
              <span style={{ lineHeight: '32px' }}>
                LRC:
              </span>
            </Col>
            <Col className="gutter-row" span={16} style={{ marginBottom: 20 }}>
              <TextArea
                rows={20}
                placeholder="LRC"
                defaultValue={playerStore.lrc}
                onChange={event => playerStore.onLrcChange(event)}
              />
            </Col>
            <Col className="gutter-row" span={8}>
              <span style={{ lineHeight: '102px' }}>
                Upload Poster:
                <br />
              </span>
            </Col>
            <Col className="gutter-row" span={16}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                {...upload()}
                beforeUpload={beforeUpload}
                onChange={playerStore.onImgUploadChange}
              >
                {playerStore.coverUrl ? <img src={playerStore.coverUrl} alt="avatar" /> : uploadButton}
              </Upload>
            </Col>
            <Col className="gutter-row" span={8}>
              <span style={{ lineHeight: '102px' }}>
                Upload Music:
                <br />
              </span>
            </Col>
            <Col className="gutter-row" span={16} style={{ marginTop: 36 }}>
              <Upload
                name="file"
                {...props}
                // When a file had been uploaded, you must delete it first and upload a new one. Otherwise, the upload button will not be clicked.
                // Similarly, if a file is being uploaded, you also can not click the upload button.
                disabled={playerStore.musicUploadStatus || playerStore.musicFileUrl !== ''}
                beforeUpload={musicBeforeUpload}
                {...upload()}
                onChange={playerStore.onMusicFileUploadChange}
              >
                <Button>
                  <Icon type="upload" />
                  {' '}
                  Click to Upload
                </Button>
              </Upload>
            </Col>
          </Row>
        </Modal>
      </main>
    );
  }
}


export default Player;

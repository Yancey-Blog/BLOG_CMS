import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Table, Button, Modal, Input, Icon, Popconfirm, Row, Col,
} from 'antd';

import { capitalized } from '../../../util/tools';

const { Column, ColumnGroup } = Table;

@inject('announcementStore')
@observer
class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentDidMount() {
    const { announcementStore } = this.props;
    announcementStore.getData();
  }

  render() {
    const { announcementStore } = this.props;
    const selectedRowKeysLength = announcementStore.selectedRowKeys.length;
    const rowSelection = {
      selectedRowKeys: announcementStore.selectedRowKeys,
      onChange: announcementStore.onSelectChange,
    };
    const pagination = {
      total: announcementStore.dataSource.length,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      pageSize: 10,
      defaultCurrent: 1,
    };
    return (
      <main className="wrapper project_wrapper">
        <div className="add_batch_delete_wrapper">
          <Button
            onClick={() => announcementStore.openModal('add')}
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
            onConfirm={() => announcementStore.batchDelete()}
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
          dataSource={announcementStore.dataSource}
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
              title="Content"
              dataIndex="content"
              key="content"
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
                      () => announcementStore.openModal('update', record._id, record.content) /* eslint-disable-line */
                    }
                  />
                  <Popconfirm
                    title="Are you sure delete this announcement?"
                    icon={<Icon type="warning" style={{ color: 'red' }} />}
                    onConfirm={() => announcementStore.deleteData(record._id)} /* eslint-disable-line */
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
              {announcementStore.modalType === 'add' ? 'Add New' : 'Update The'}
              {' '}
              Announcement
            </span>
          )}
          width={600}
          wrapClassName="reset_modal"
          closable={false}
          destroyOnClose
          visible={announcementStore.showModal}
          okButtonProps={{ disabled: !announcementStore.isFilled }}
          okText={capitalized(announcementStore.modalType)}
          onOk={announcementStore.modalType === 'add' ? () => announcementStore.insertData() : () => announcementStore.modifyData()}
          onCancel={announcementStore.closeModal}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <span>
                Announcement Content:
              </span>
            </Col>
            <Col className="gutter-row" span={16}>
              <Input
                defaultValue={announcementStore.content}
                placeholder="Announcement Content"
                onChange={event => announcementStore.onContentChange(event)}
              />
            </Col>
          </Row>
        </Modal>
      </main>
    );
  }
}


export default Announcement;

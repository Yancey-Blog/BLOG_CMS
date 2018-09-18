import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Table, Button, Modal, Input, Icon, Popconfirm,
} from 'antd';

import { formatJSONDate } from '../../util/tools';

const { Column, ColumnGroup } = Table;

@inject('announcementStore')
@observer
class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
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
      <main className="announcement_wrapper">
        <div className="add_batch_delete_wrapper">
          <Button
            onClick={announcementStore.openInsertModal}
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
                    style={{ cursor: 'pointer' }}
                    onClick={() => Modal.confirm({
                      width: 600,
                      iconType: 'form',
                      maskClosable: true,
                      title: 'Modify the announcement',
                      content: <Input defaultValue={record.content} onChange={event => announcementStore.onModifyInputChange(event)} />,
                      onOk: () => announcementStore.modifyRow(record._id), /* eslint-disable-line */
                    })}
                  />
                  <Popconfirm
                    title="Are you sure to delete this announcement?"
                    icon={<Icon type="warning" style={{ color: 'red' }} />}
                    onConfirm={() => announcementStore.deleteRow(record._id)} /* eslint-disable-line */
                  >
                    <Icon
                      type="delete"
                      theme="twoTone"
                      twoToneColor="#f5222d"
                      style={{ cursor: 'pointer', marginLeft: '16px' }}
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
                Add new announcement
            </span>
          )}
          width={600}
          wrapClassName="reset_modal"
          closable={false}
          destroyOnClose
          visible={announcementStore.showInsertModal}
          okButtonProps={{ disabled: announcementStore.insertedContent.length === 0 }}
          onOk={announcementStore.insertData}
          onCancel={announcementStore.closeInsertModal}
        >
          <Input
            placeholder="Announcement"
            onChange={event => announcementStore.onInsertInputChange(event)}
          />
        </Modal>
      </main>
    );
  }
}


export default Announcement;

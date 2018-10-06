import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Table, Button, Modal, Input, Icon, Popconfirm, Row, Col,
} from 'antd';

import { capitalized } from '../../../util/tools';

const { Column, ColumnGroup } = Table;

@inject('mottoStore')
@observer
class Motto extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentDidMount() {
    const { mottoStore } = this.props;
    mottoStore.getData();
  }

  render() {
    const { mottoStore } = this.props;
    const selectedRowKeysLength = mottoStore.selectedRowKeys.length;
    const rowSelection = {
      selectedRowKeys: mottoStore.selectedRowKeys,
      onChange: mottoStore.onSelectChange,
    };
    const pagination = {
      total: mottoStore.dataSource.length,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      pageSize: 10,
      defaultCurrent: 1,
    };
    return (
      <main className="wrapper project_wrapper">
        <div className="add_batch_delete_wrapper">
          <Button
            onClick={() => mottoStore.openModal('add')}
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
            onConfirm={() => mottoStore.batchDelete()}
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
          dataSource={mottoStore.dataSource}
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
                      () => mottoStore.openModal('update', record._id, record.content) /* eslint-disable-line */
                    }
                  />
                  <Popconfirm
                    title="Are you sure delete this motto?"
                    icon={<Icon type="warning" style={{ color: 'red' }} />}
                    onConfirm={() => mottoStore.deleteData(record._id)} /* eslint-disable-line */
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
              {mottoStore.modalType === 'add' ? 'Add New' : 'Update The'}
              {' '}
              Motto
            </span>
          )}
          width={600}
          wrapClassName="reset_modal"
          closable={false}
          destroyOnClose
          visible={mottoStore.showModal}
          okButtonProps={{ disabled: !mottoStore.isFilled }}
          okText={capitalized(mottoStore.modalType)}
          onOk={mottoStore.modalType === 'add' ? () => mottoStore.insertData() : () => mottoStore.modifyData()}
          onCancel={mottoStore.closeModal}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <span>
                Motto Content:
              </span>
            </Col>
            <Col className="gutter-row" span={16}>
              <Input
                defaultValue={mottoStore.content}
                placeholder="Motto Content"
                onChange={event => mottoStore.onContentChange(event)}
              />
            </Col>
          </Row>
        </Modal>
      </main>
    );
  }
}


export default Motto;

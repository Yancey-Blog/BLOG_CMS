import React, { Component } from 'react';
import {
  Table, Button, Modal, Input, Icon, Popconfirm, message,
} from 'antd';
import {
  GET, PUT, POST, DELETE,
} from '../../../util/axios';

import { formatJSONDate } from '../../../util/tools';
import './motto.css';

const { Column, ColumnGroup } = Table;

class Motto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      selectedRowKeys: [],
      content: '',
      modifyContent: '',
      showInsertModal: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.modifyInputChange = this.modifyInputChange.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
  }

  // get table data
  getData = () => {
    GET('/mottoes', {})
      .then((res) => {
        this.setState({
          dataSource: res.data,
        });
      })
      .catch((error) => {
        // todo
      });
  };

  // click 'add row' btn
  openInsertModal = () => {
    this.setState({ showInsertModal: true });
  };

  closeInsertModal = () => {
    this.setState({ showInsertModal: false });
  };

  // listen input status on insert modal
  handleChange = (event) => {
    this.setState({ content: event.target.value });
  };

  // insert a row
  insertMotto = () => {
    const { content, dataSource } = this.state;
    const params = {
      content,
    };
    POST('/mottoes', params)
      .then((res) => {
        this.setState({ showInsertModal: false, content: '' });
        message.success('insert success');
        dataSource.splice(0, dataSource.length);
        this.getData();
      })
      .catch((error) => {
      });
  };

  // listen input status on insert modal
  modifyInputChange = (event) => {
    this.setState({ modifyContent: event.target.value });
  };

  // click modify btn
  modifyRow = (id) => {
    const { modifyContent, dataSource } = this.state;
    const params = {
      content: modifyContent,
    };
    if (modifyContent.length === 0) {
      message.error('This area is not allowed empty!', 2);
    } else {
      PUT(`/mottoes/${id}`, params)
        .then((res) => {
          message.success('modify success');
          dataSource.splice(0, dataSource.length);
          this.getData();
        })
        .catch((error) => {
        });
    }
  };

  // delete a row
  deleteRow = (id) => {
    const { dataSource } = this.state;
    DELETE(`/mottoes/${id}`, {})
      .then((res) => {
        message.success('delete success');
        dataSource.splice(0, dataSource.length);
        this.getData();
      })
      .catch((error) => {
        // todo
      });
  };

  // get the rows to be deleted
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  // batch delete
  batchDelete = () => {
    const { dataSource, selectedRowKeys } = this.state;
    const params = {
      selectedList: selectedRowKeys,
    };
    POST('/batchMottoes', params)
      .then((res) => {
        selectedRowKeys.splice(0, selectedRowKeys.length);
        message.success('delete success');
        dataSource.splice(0, dataSource.length);
        this.getData();
      })
      .catch((error) => {
        // todo
      });
  };

  render() {
    const {
      dataSource, selectedRowKeys, showInsertModal, content,
    } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    const pagination = {
      total: dataSource.length,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      pageSize: 10,
      defaultCurrent: 1,
    };

    return (
      <main className="wrapper motto_wrapper">
        <div className="add_batch_delete_wrapper">
          <Button
            onClick={this.openInsertModal}
            type="primary"
            style={{ marginBottom: 16, marginRight: 20 }}
          >
            <Icon
              type="edit"
              theme="outlined"
            />
            Add a row
          </Button>
          <Popconfirm
            title={`Are you sure to delete ${selectedRowKeys.length} ${selectedRowKeys.length > 1 ? 'mottoes' : 'motto'}?`}
            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            onConfirm={() => this.batchDelete()}
          >
            <Button
              type="primary"
              disabled={!hasSelected}
            >
              <Icon
                type="delete"
                theme="outlined"
              />
              Batch Delete
            </Button>
          </Popconfirm>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} ${selectedRowKeys.length > 1 ? 'items' : 'item'}` : ''}
          </span>
        </div>
        <Table
          rowKey={record => record._id} /* eslint-disable-line */
          dataSource={dataSource}
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
              title="Action"
              key="action"
              render={(text, record) => (
                <span>
                  <Button
                    size="small"
                    onClick={() => Modal.confirm({
                      width: 600,
                      iconType: 'form',
                      maskClosable: true,
                      title: 'Modify the motto',
                      content: <Input defaultValue={record.content} onChange={this.modifyInputChange} />,
                      onOk: () => this.modifyRow(record._id), /* eslint-disable-line */
                    })}
                  >
                    Modify
                  </Button>
                  <Popconfirm
                    title="Are you sure to delete this motto?"
                    icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                    onConfirm={() => this.deleteRow(record._id)} /* eslint-disable-line */
                  >
                    <Button
                      size="small"
                      type="danger"
                      style={{ marginLeft: 10 }}
                    >
                      Delete
                    </Button>
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
                style={{ marginRight: 10 }}
              />
                Add a new motto
            </span>
          )}
          width={600}
          wrapClassName="reset_modal"
          closable={false}
          destroyOnClose
          visible={showInsertModal}
          okButtonProps={{ disabled: content.length === 0 }}
          onOk={this.insertMotto}
          onCancel={this.closeInsertModal}
        >
          <Input
            placeholder="Motto"
            onChange={this.handleChange}
          />
        </Modal>
      </main>
    );
  }
}


export default Motto;

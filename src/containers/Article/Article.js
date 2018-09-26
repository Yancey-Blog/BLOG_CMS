import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import {
  Table, Button, Modal, Icon, Popconfirm,
} from 'antd';
import { formatJSONDate } from '../../util/tools';

const { Column, ColumnGroup } = Table;

@inject('articleStore')
@observer
class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentDidMount() {
    const { articleStore } = this.props;
    articleStore.getData();
  }

  render() {
    const { articleStore } = this.props;
    const selectedRowKeysLength = articleStore.selectedRowKeys.length;
    const rowSelection = {
      selectedRowKeys: articleStore.selectedRowKeys,
      onChange: articleStore.onSelectChange,
    };
    const pagination = {
      total: articleStore.dataSource.length,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      pageSize: 10,
      defaultCurrent: 1,
    };
    return (
      <main className="wrapper article_wrapper">
        <div className="add_batch_delete_wrapper">
          <Button
            type="primary"
            style={{
              marginBottom: 16,
              marginRight: 20,
            }}
          >
            <Link to="/article/add">
              <Icon
                type="plus"
                theme="outlined"
                style={{ position: 'relative', top: 1, marginRight: 10 }}
              />
            Add New Article
            </Link>
          </Button>
          <Popconfirm
            title={`Are you sure to delete ${selectedRowKeysLength} ${selectedRowKeysLength > 1 ? 'items' : 'item'}?`}
            icon={<Icon type="warning" style={{ color: 'red' }} />}
            onConfirm={() => articleStore.batchDelete()}
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
          dataSource={articleStore.dataSource}
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
              title="Summary"
              dataIndex="summary"
              key="summary"
              width={300}
            />
            <Column
              title="Publish Date"
              dataIndex="publish_date"
              render={(text, record) => (
                <span>
                  {formatJSONDate(record.publish_date)}
                </span>
              )}
            />
            <Column
              title="Last Modified Date"
              dataIndex="last_modified_date"
              render={(text, record) => (
                <span>
                  {formatJSONDate(record.publish_date)}
                </span>
              )}
            />
            <Column
              title="Like Count"
              dataIndex="like_count"
              key="like_count"
            />
            <Column
              title="PV Count"
              dataIndex="pv_count"
              key="pv_count"
            />
            <Column
              title="Header Cover"
              dataIndex="header_cover"
              render={(text, record) => (
                <span>
                  <img
                    src={record.header_cover}
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
                        src={record.header_cover}
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
              title="Operation"
              key="operation"
              render={(text, record) => (
                <span>
                  <Link to={`/article/update/${record._id}`}>
                    <Icon
                      type="edit"
                      theme="twoTone"
                      twoToneColor="#007fff"
                      style={{ cursor: 'pointer', marginRight: 16 }}
                    />
                  </Link>
                  <Popconfirm
                    title="Are you sure to delete this project?"
                    icon={<Icon type="warning" style={{ color: 'red' }} />}
                    onConfirm={() => articleStore.deleteData(record._id)} /* eslint-disable-line */
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
      </main>
    );
  }
}


export default Article;

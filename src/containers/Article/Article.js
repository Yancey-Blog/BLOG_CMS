import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import {
  Table, Button, Modal, Icon, Popconfirm, Switch, Pagination, Spin, Input, DatePicker,
} from 'antd';
import { formatJSONDate, checkWebp, webp } from '../../util/tools';

const { Column, ColumnGroup } = Table;
const Search = Input.Search;
const { RangePicker } = DatePicker;

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
    return (
      <main className="wrapper article_wrapper">
        <div
          className="search_container"
          style={{
            display: 'flex', justifyContent: 'space-between', margin: '0 0 30px 0', width: '50%',
          }}
        >
          <Search
            placeholder="Search by title..."
            onSearch={value => articleStore.onTitleSearchChange(value)}
            enterButton
            style={{ width: 300 }}
          />
          <RangePicker onChange={articleStore.onDateRangeSearchChange} />
          <Button
            type="primary"
            onClick={articleStore.resetSearch}
          >
            Reset
          </Button>
        </div>
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
            title={`Are you sure delete ${selectedRowKeysLength} ${selectedRowKeysLength > 1 ? 'items' : 'item'}?`}
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
          pagination={false}
          loading={articleStore.loading}
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
              title="Header Cover"
              dataIndex="header_cover"
              render={(text, record) => (
                <span>
                  <img
                    src={checkWebp() ? `${record.header_cover}${webp}` : record.header_cover}
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
                        src={checkWebp() ? `${record.header_cover}${webp}` : record.header_cover}
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
                  {formatJSONDate(record.last_modified_date)}
                </span>
              )}
            />
            <Column
              title="Like Count"
              dataIndex="like_count"
              render={(text, record) => (
                <span>
                  {record.like_count.length}
                </span>
              )}
            />
            <Column
              title="PV Count"
              dataIndex="pv_count"
              key="pv_count"
            />
            <Column
              title="Status"
              dataIndex="status"
              render={(text, record) => (
                <span>
                  <Switch
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="close" />}
                    checked={record.status}
                    defaultChecked={record.status}
                    onChange={checked => articleStore.switchStatus(record._id, checked)} /* eslint-disable-line */
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
                    title="Are you sure delete this project?"
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
        <Spin
          spinning={articleStore.spinning}
          style={{ marginLeft: '50%', marginTop: 20 }}
        />
        <Pagination
          size="small"
          showQuickJumper
          defaultCurrent={1}
          total={articleStore.totalAmount}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          onChange={articleStore.onSwitchPage}
          style={{ marginTop: 20, textAlign: 'right' }}
        />
      </main>
    );
  }
}


export default Article;

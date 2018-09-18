import React, { Component } from 'react';
import './player.css';
import {
  Table, Button, Modal, Input, Icon, Upload, Popconfirm, message,
} from 'antd';
import {
  GET, PUT, POST, DELETE,
} from '../../util/axios';
import { beforeUpload } from '../../util/tools';

const { Column, ColumnGroup } = Table;
const { TextArea } = Input;

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      selectedRowKeys: [],
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.getMusicList();
  }

  componentWillUnmount() {
  }

  getMusicList = () => {
    GET('/aplayers', {})
      .then((res) => {
        this.setState({
          dataSource: res.data,
        });
      })
      .catch((error) => {
        // todo
      });
  };

  batchDelete = () => {
    // todo
  };

  /*
  * get _id list for batch delete
  * */
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  handleAdd = () => {
    Modal.confirm({
      title: 'add new music',
      content:
  <div>
    <Input placeholder="Music title" />
    <Input placeholder="Artist" />
  </div>,
      width: 600,
    });
  };


  render() {
    const { dataSource, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <main className="player_wrapper">
        <div className="batch_delete">
          <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
            Add a row
          </Button>
          <Popconfirm
            title={`Are you sure to delete ${selectedRowKeys.length} music?`}
            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            onConfirm={this.batchDelete}
          >
            <Button
              type="primary"
              disabled={!hasSelected}
            >
              Batch Delete
            </Button>
          </Popconfirm>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table
          rowKey={record => record._id} /* eslint-disable-line */
          dataSource={dataSource}
          rowSelection={rowSelection}
        >
          <ColumnGroup>
            <Column
              title="Name"
              dataIndex="name"
              key="name"
            />
            <Column
              title="Artist"
              dataIndex="artist"
              key="artist"
            />
            <Column
              title="Cover"
              dataIndex="cover"
              key="cover"
            />
            <Column
              title="Url"
              dataIndex="url"
              key="url"
            />
            <Column
              title="Lrc"
              key="lrc"
              render={(text, record) => (
                <span>
                  <Button
                    type="primary"
                    onClick={() => Modal.confirm({
                      title: 'Lrc Detail',
                      content: <TextArea defaultValue={record.lrc} rows={25} />,
                      width: 600,
                    })}
                  >
                  Show Detail
                  </Button>
                </span>
              )}
            />
          </ColumnGroup>
        </Table>
      </main>
    );
  }
}


export default Player;

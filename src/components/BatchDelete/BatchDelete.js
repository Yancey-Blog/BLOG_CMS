import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Table, Button, Modal, Input, Icon, Popconfirm, message,
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
    const { announcementStore } = this.props;
    announcementStore.fetchAnnouncementData();
  }

  render() {
    const { announcementStore } = this.props;
    return (
      <main className="motto_wrapper">
        <Table
          rowKey={record => record._id} /* eslint-disable-line */
          dataSource={announcementStore.dataSource}
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
          </ColumnGroup>
        </Table>
      </main>
    );
  }
}


export default Announcement;

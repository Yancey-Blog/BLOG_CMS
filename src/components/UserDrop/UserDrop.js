import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import {
  Menu, Dropdown, Icon, Avatar, message, Popconfirm,
} from 'antd';
import history from '../../history';

@inject('userInfoStore')
@observer
class UserDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
  }

  componentDidMount() {
    const { userInfoStore } = this.props;
    userInfoStore.getData();
  }

  componentWillUnmount() {
  }

  logout = () => {
    message.info('logout after 2s');
    setTimeout(() => {
      history.push('/login');
      window.localStorage.clear();
    }, 2000);
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <Link to="/setting/basic">
            <Icon type="user" theme="outlined" style={{ marginRight: 8 }} />
            User Center
          </Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to="/setting/security">
            <Icon type="security-scan" theme="outlined" style={{ marginRight: 8 }} />
            Security Center
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/setting/global">
            <Icon type="setting" theme="outlined" style={{ marginRight: 8 }} />
            Global Setting
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          <Popconfirm
            title="Are you sure logout?"
            onConfirm={this.logout}
            okText="Yes"
            cancelText="No"
          >
            <Icon
              type="logout"
              theme="outlined"
              style={{ marginRight: 10 }}
            />
            Logout
          </Popconfirm>
        </Menu.Item>
      </Menu>
    );
    const { userInfoStore } = this.props;
    return (
      <section className="server_status_wrapper">
        <Dropdown overlay={menu}>
          <span>
            <Avatar
              size="small"
              icon="user"
              src={userInfoStore.avatar}
              style={{ marginRight: 8 }}
            />
            {userInfoStore.userName}
          </span>
        </Dropdown>
      </section>
    );
  }
}


export default UserDrop;

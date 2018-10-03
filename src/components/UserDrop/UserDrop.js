import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Icon, Switch } from 'antd';

class UserDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <Link to="/cc">
            <Icon type="user" theme="outlined" style={{ marginRight: 8 }} />
            User Center
          </Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to="/cc">
            <Icon type="security-scan" theme="outlined" style={{ marginRight: 8 }} />
            Security Center
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/cc">
            <Icon type="setting" theme="outlined" style={{ marginRight: 8 }} />
            Global Setting
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          <Icon type="logout" theme="outlined" />
          Logout
        </Menu.Item>
      </Menu>
    );
    return (
      <section className="server_status_wrapper">
        <Dropdown overlay={menu}>
          <span>
            Yancey Leo
          </span>
        </Dropdown>
      </section>
    );
  }
}


export default UserDrop;

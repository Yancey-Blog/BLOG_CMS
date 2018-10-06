import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link, Switch, Route } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import UserInfo from '../../components/UserInfo/UserInfo';
import SecurityCenter from '../../components/SecurityCenter/SecurityCenter';
import GlobalConfig from '../../components/GlobalConfig/GlobalConfig';
import Exception from '../Exception/Exception';

@inject('announcementStore')
@observer
class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentDidMount() {
  }

  render() {
    const layout = {
      display: 'grid',
      gridTemplateColumns: '16% 84%',
    };
    return (
      <main
        className="wrapper setting_wrapper"
        style={layout}
      >
        <div className="menu_group">
          <Menu
            onClick={this.handleClick}
            style={{ width: 200 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            <Menu.Item key="1">
              <Link to="/setting/basic">
                <Icon type="pie-chart" />
                <span>
                Basic Information
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/setting/security">
                <Icon type="desktop" />
                <span>Security Center</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/setting/global">
                <Icon type="inbox" />
                <span>Global Config</span>
              </Link>
            </Menu.Item>
          </Menu>
        </div>
        <Switch>
          <Route path="/setting/basic" component={UserInfo} />
          <Route path="/setting/security" component={SecurityCenter} />
          <Route path="/setting/global" component={GlobalConfig} />
          <Route component={Exception} />
        </Switch>
      </main>
    );
  }
}


export default Setting;

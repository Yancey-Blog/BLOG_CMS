import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Input, Button } from 'antd';

const { TextArea } = Input;

@inject('userInfoStore')
@observer
class SecurityCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    const { userInfoStore } = this.props;
    const labelStyle = {
      display: 'block',
      margin: '26px 0',
    };
    const inputStyle = {
      marginTop: 8,
    };
    return (
      <section className="security_center_wrapper">
        <h2>
          Security Center
        </h2>
      </section>
    );
  }
}


export default SecurityCenter;

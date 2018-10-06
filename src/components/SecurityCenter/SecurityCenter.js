import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Input, Button } from 'antd';

@inject('modifyPasswordStore')
@observer
class SecurityCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    const { modifyPasswordStore } = this.props;
    const labelStyle = {
      display: 'block',
      margin: '26px 0',
    };
    const inputStyle = {
      marginTop: 8,
    };
    return (
      <section
        className="security_center_wrapper"
        style={{ width: 320 }}
      >
        <h2>
          Security Center
        </h2>
        <label
          htmlFor="email"
          style={labelStyle}
        >
          Email
          <Input
            id="email"
            placeholder="Email"
            style={inputStyle}
            onChange={event => modifyPasswordStore.onEmailChange(event)}
          />
        </label>
        <label
          htmlFor="oldPassword"
          style={labelStyle}
        >
          Old Password
          <Input
            id="oldPassword"
            type="password"
            placeholder="Old Password"
            style={inputStyle}
            onChange={event => modifyPasswordStore.onOldPasswordChange(event)}
          />
        </label>
        <label
          htmlFor="password"
          style={labelStyle}
        >
          New Password
          <Input
            id="password"
            type="password"
            placeholder="New Password"
            style={inputStyle}
            onChange={event => modifyPasswordStore.onNewPasswordChange(event)}
          />
        </label>
        <label
          htmlFor="confirmPassword"
          style={labelStyle}
        >
          Confirm Password
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            style={inputStyle}
            onChange={event => modifyPasswordStore.onConfirmPasswordChange(event)}
          />
        </label>
        <Button
          disabled={!modifyPasswordStore.isFilled}
          onClick={() => modifyPasswordStore.handleModifyPassword()}
          type="primary"
        >
          Submit
        </Button>
      </section>
    );
  }
}


export default SecurityCenter;

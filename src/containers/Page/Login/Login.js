import React, { Component } from 'react';
import Recaptcha from 'react-google-recaptcha';
import './login.css';
import { inject, observer } from 'mobx-react/index';

@inject('loginStore')
@observer
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  onChange = (value) => {
    console.log('Captcha value:', value);
  };

  render() {
    const { loginStore } = this.props;
    return (
      <main className="login_wrapper">
        <figure className="blur_bg" />
        <section className="login_container">
          <h1 className="title">
            <a href="https://www.yanceyleo.com/">
              <figure className="title_img" />
            </a>
          </h1>
          <div className="user_input_group">
            <label htmlFor="account">
              Email Address
              <input id="account" type="email" onChange={e => loginStore.onEmailChange(e)}/>
            </label>
          </div>
          <div className="user_input_group">
            <label htmlFor="password">
              PassWord
              <input id="password" type="password" onChange={e => loginStore.onPasswordChange(e)}/>
            </label>
          </div>
          <Recaptcha
            sitekey="6LdLTDgUAAAAAPq-N2YNVoqcYPLyDTypJ8SMvCEj"
            onChange={value => loginStore.onCaptchaChange(value)}
          />
          <button
            onClick={loginStore.login}
          >
            login
          </button>
        </section>
      </main>
    );
  }
}


export default Login;

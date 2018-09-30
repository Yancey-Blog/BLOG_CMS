import React, { Component } from 'react';
import Recaptcha from 'react-google-recaptcha';
import './login.css';
import { inject, observer } from 'mobx-react/index';

@inject('loginStore')
@observer
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  onChange = (value) => {
    console.log('Captcha value:', value);
  };

  render() {
    const { loginStore } = this.props;
    window.recaptchaOptions = {
      lang: 'ja',
    };
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
              <input id="account" type="email" onChange={e => loginStore.onEmailChange(e)} />
            </label>
          </div>
          <div className="user_input_group">
            <label htmlFor="password">
              Password
              <input id="password" type="password" onChange={e => loginStore.onPasswordChange(e)} />
            </label>
          </div>
          <div className="user_input_group">
            <span>
              Recaptcha
            </span>
            <Recaptcha
              sitekey="6LdLTDgUAAAAAPq-N2YNVoqcYPLyDTypJ8SMvCEj"
              onChange={value => loginStore.onCaptchaChange(value)}
            />
          </div>
          <button
            className="login_btn"
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

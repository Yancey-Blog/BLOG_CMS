import React, { Component } from 'react';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
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
            <label htmlFor="userName">
              Username or Email Address
              <input id="userName" type="text" />
            </label>
          </div>
        </section>
      </main>
    );
  }
}


export default Login;

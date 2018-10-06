import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

class Exception extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentDidMount() {
  }

  render() {
    const wrapperStyle = {
      display: 'flex',
      justifyContent: 'space-around',
      padding: '100px 320px 0',
    };
    const figureStyle = {
      width: 430,
      height: 360,
      background: 'url("http://yancey-assets.oss-cn-beijing.aliyuncs.com/404.svg") no-repeat center top',
    };
    const headerStyle = {
      color: '#434e59',
      fontSize: 72,
      fontWeight: 600,
      marginBottom: 16,
    };
    const introStyle = {
      color: 'rgba(0,0,0,.45)',
      fontSize: 20,
      marginBottom: 16,
    };
    return (
      <main
        className="wrapper exception_wrapper"
        style={wrapperStyle}
      >
        <figure
          style={figureStyle}
        />
        <div className="exception_intro">
          <h1
            style={headerStyle}
          >
            404
          </h1>
          <p
            style={introStyle}
          >
            The Page You Requested Could Not Found.
          </p>
          <Button
            type="primary"
          >
            <Link to="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </main>
    );
  }
}


export default Exception;

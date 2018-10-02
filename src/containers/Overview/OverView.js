import React, { Component } from 'react';
import ServerStatus from '../../components/ServerStatus/ServerStatus';
import './overview.css';

class OverView extends Component {
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
    return (
      <main className="wrapper overview_wrapper">
        <ServerStatus />
      </main>
    );
  }
}


export default OverView;

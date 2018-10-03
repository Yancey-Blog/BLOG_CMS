import React, { Component } from 'react';
import ServerStatus from '../../components/ServerStatus/ServerStatus';
import ArticleStatistics from '../../components/ArticleStatistics/ArticleStatistics';
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
        <ArticleStatistics />
      </main>
    );
  }
}


export default OverView;

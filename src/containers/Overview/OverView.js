import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ServerStatus from '../../components/ServerStatus/ServerStatus';
import './overview.css';

@inject('overViewStore')
@observer
class OverView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
  }

  componentDidMount() {
    const { overViewStore } = this.props;
    overViewStore.getServerData();
  }

  componentWillUnmount() {
  }

  render() {
    const { overViewStore } = this.props;
    return (
      <main className="wrapper overview_wrapper">
        <ServerStatus />
      </main>
    );
  }
}


export default OverView;

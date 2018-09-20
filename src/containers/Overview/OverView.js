import React, { Component } from 'react';

import { WaterWave } from 'ant-design-pro/lib/Charts';

import { GET } from '../../util/axios';

class OverView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.getServerData();
  }

  componentWillUnmount() {
  }

  getServerData = () => {
    GET('https://api.64clouds.com/v1/getLiveServiceInfo?veid=668751&api_key=private_HFFGocLNLN6TzcGjo41d7BD0', {})
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        // todo
      });
  };

  render() {
    return (
      <main className="over_view_wrapper">
        <WaterWave
          height={161}
          title="Bandwidth Usage"
          percent={34}
        />
      </main>
    );
  }
}


export default OverView;

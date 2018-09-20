import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  ChartCard, MiniProgress,
} from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
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
        <section className="server_status_wrapper">
          <ChartCard
            title="BandWidth Usage"
            total={`${overViewStore.bandwidthUsage}%`}
            footer={(
              <div>
                <span>
              周同比
                  <Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>12%</Trend>
                </span>
                <span style={{ marginLeft: 16 }}>
              日环比
                  <Trend flag="down" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>11%</Trend>
                </span>
              </div>
            )}
            contentHeight={46}
          >
            <MiniProgress percent={overViewStore.bandwidthUsage} strokeWidth={8} target={overViewStore.bandwidthUsage + 10} />
          </ChartCard>
          <ChartCard
            title="线上购物转化率"
            total="78%"
            footer={(
              <div>
                <span>
              周同比
                  <Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>12%</Trend>
                </span>
                <span style={{ marginLeft: 16 }}>
              日环比
                  <Trend flag="down" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>11%</Trend>
                </span>
              </div>
            )}
            contentHeight={46}
          >
            <MiniProgress percent={78} strokeWidth={8} target={80} />
          </ChartCard>
          <ChartCard
            title="线上购物转化率"
            total="78%"
            footer={(
              <div>
                <span>
              周同比
                  <Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>12%</Trend>
                </span>
                <span style={{ marginLeft: 16 }}>
              日环比
                  <Trend flag="down" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>11%</Trend>
                </span>
              </div>
            )}
            contentHeight={46}
          >
            <MiniProgress percent={78} strokeWidth={8} target={80} />
          </ChartCard>
          <ChartCard
            title="线上购物转化率"
            total="78%"
            footer={(
              <div>
                <span>
              周同比
                  <Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>12%</Trend>
                </span>
                <span style={{ marginLeft: 16 }}>
              日环比
                  <Trend flag="down" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>11%</Trend>
                </span>
              </div>
            )}
            contentHeight={46}
          >
            <MiniProgress percent={78} strokeWidth={8} target={80} />
          </ChartCard>
        </section>
      </main>
    );
  }
}


export default OverView;

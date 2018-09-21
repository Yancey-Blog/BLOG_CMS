import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Radio } from 'antd';
import {
  ChartCard, MiniProgress,
} from 'ant-design-pro/lib/Charts';
import { Line } from 'react-chartjs-2';
import './serverStatus.css';

@inject('serverStatusStore')
@observer
class ServerStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
  }

  componentDidMount() {
    const { serverStatusStore } = this.props;
    serverStatusStore.getServerData();
    serverStatusStore.getRawUsageStatusData();
  }

  componentWillUnmount() {
  }

  render() {
    const { serverStatusStore } = this.props;
    const networkChartConfig = {
      labels: serverStatusStore.timestampData.slice(-200),
      datasets: [
        {
          label: 'Network In Bytes',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: serverStatusStore.networkInBytesData.slice(-200),
        },
        {
          label: 'Network Out Bytes',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(255, 203, 94)',
          borderColor: 'rgba(255, 203, 94)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(255, 203, 94)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(255, 203, 94))',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: serverStatusStore.networkOutBytesData.slice(-200),
        },
      ],
    };
    const diskChartConfig = {
      labels: serverStatusStore.timestampData.slice(-200),
      datasets: [
        {
          label: 'Disk Read Bytes',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(55, 165, 233)',
          borderColor: 'rgba(55, 165, 233)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(55, 165, 233)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(55, 165, 233)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: serverStatusStore.diskReadBytesData.slice(-200),
        },
        {
          label: 'Disk Write Bytes',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(252, 96, 133)',
          borderColor: 'rgba(252, 96, 133)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(252, 96, 133)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(252, 96, 133)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: serverStatusStore.diskWriteBytesData.slice(-200),
        },
      ],
    };
    const cpuChartConfig = {
      labels: serverStatusStore.timestampData.slice(-200),
      datasets: [
        {
          label: 'CPU Usage',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(148, 107, 252)',
          borderColor: 'rgba(148, 107, 252)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(148, 107, 252)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(148, 107, 252)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: serverStatusStore.cpuUsageData.slice(-200),
        },
      ],
    };
    return (
      <section className="server_status_wrapper">
        <div className="server_params_container">
          <ChartCard
            title="Bandwidth Usage"
            total={`${serverStatusStore.bandwidthUsage}%`}
            footer={(
              <div>
                <span>
                Dosage:
                  <span style={{ marginLeft: 4, color: 'rgba(0,0,0,.85)' }}>
                    {serverStatusStore.bandwidthDosage}
                  </span>
                  {' '}
                GB
                </span>
                <span style={{ marginLeft: 16 }}>
                Total:
                  <span style={{ marginLeft: 4, color: 'rgba(0,0,0,.85)' }}>
                    {serverStatusStore.totalBandwidth}
                  </span>
                  {' '}
                  GB
                </span>
              </div>
            )}
            contentHeight={46}
          >
            <MiniProgress percent={serverStatusStore.bandwidthUsage} strokeWidth={8} target={serverStatusStore.bandwidthUsage + 2} />
          </ChartCard>
          <ChartCard
            title="Disk Usage"
            total={`${serverStatusStore.diskUsage}%`}
            footer={(
              <div>
                <span>
                Dosage:
                  <span style={{ marginLeft: 4, color: 'rgba(0,0,0,.85)' }}>
                    {serverStatusStore.diskDosage}
                  </span>
                  {' '}
                GB
                </span>
                <span style={{ marginLeft: 16 }}>
                Total:
                  <span style={{ marginLeft: 4, color: 'rgba(0,0,0,.85)' }}>
                    {serverStatusStore.totalDisk}
                  </span>
                  {' '}
                  GB
                </span>
              </div>
            )}
            contentHeight={46}
          >
            <MiniProgress percent={serverStatusStore.diskUsage} strokeWidth={8} target={serverStatusStore.diskUsage + 2} />
          </ChartCard>
          <ChartCard
            title="RAM Usage"
            total={`${serverStatusStore.RAMUsage}%`}
            footer={(
              <div>
                <span>
                Dosage:
                  <span style={{ marginLeft: 4, color: 'rgba(0,0,0,.85)' }}>
                    {serverStatusStore.RAMUsage}
                  </span>
                  {' '}
                MB
                </span>
                <span style={{ marginLeft: 16 }}>
                Total:
                  <span style={{ marginLeft: 4, color: 'rgba(0,0,0,.85)' }}>
                    {serverStatusStore.totalRAM}
                  </span>
                  {' '}
                  MB
                </span>
              </div>
            )}
            contentHeight={46}
          >
            <MiniProgress percent={serverStatusStore.RAMUsage} strokeWidth={8} target={serverStatusStore.RAMUsage + 2} />
          </ChartCard>
          <ChartCard
            title="SWAP Usage"
            total={`${serverStatusStore.SWAPUsage}%`}
            footer={(
              <div>
                <span>
                Dosage:
                  <span style={{ marginLeft: 4, color: 'rgba(0,0,0,.85)' }}>
                    {serverStatusStore.SWAPDosage}
                  </span>
                  {' '}
                MB
                </span>
                <span style={{ marginLeft: 16 }}>
                Total:
                  <span style={{ marginLeft: 4, color: 'rgba(0,0,0,.85)' }}>
                    {serverStatusStore.totalSWAP}
                  </span>
                  {' '}
                  MB
                </span>
              </div>
            )}
            contentHeight={46}
          >
            <MiniProgress percent={serverStatusStore.SWAPUsage} strokeWidth={8} target={serverStatusStore.SWAPUsage + 2} />
          </ChartCard>
        </div>
        <div className="server_running_container">
          <Radio.Group value={size} onChange={this.handleSizeChange}>
            <Radio.Button value="large">Large</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="small">Small</Radio.Button>
          </Radio.Group>
          <Line
            data={networkChartConfig}
          />
          <Line
            data={diskChartConfig}
          />
          <Line
            data={cpuChartConfig}
          />
        </div>
      </section>
    );
  }
}


export default ServerStatus;

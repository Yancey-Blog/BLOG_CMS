import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Radio, Tabs, Icon, Skeleton,
} from 'antd';
import { Line } from 'react-chartjs-2';
import './serverStatus.css';

const TabPane = Tabs.TabPane;

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
      labels: serverStatusStore.timestampData.slice(-serverStatusStore.dataLength),
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
          data: serverStatusStore.networkInBytesData.slice(-serverStatusStore.dataLength),
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
          data: serverStatusStore.networkOutBytesData.slice(-serverStatusStore.dataLength),
        },
      ],
    };
    const diskChartConfig = {
      labels: serverStatusStore.timestampData.slice(-serverStatusStore.dataLength),
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
          data: serverStatusStore.diskReadBytesData.slice(-serverStatusStore.dataLength),
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
          data: serverStatusStore.diskWriteBytesData.slice(-serverStatusStore.dataLength),
        },
      ],
    };
    const cpuChartConfig = {
      labels: serverStatusStore.timestampData.slice(-serverStatusStore.dataLength),
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
          data: serverStatusStore.cpuUsageData.slice(-serverStatusStore.dataLength),
        },
      ],
    };
    const operations = (
      <Radio.Group
        defaultValue={serverStatusStore.curTab}
        buttonStyle="solid"
        onChange={event => serverStatusStore.onSelectRange(event)}
      >
        <Radio.Button value="sevenDays">7 days</Radio.Button>
        <Radio.Button value="oneDay">24 Hours</Radio.Button>
        <Radio.Button value="halfDay">12 Hours</Radio.Button>
        <Radio.Button value="oneHour">1 Hour</Radio.Button>
      </Radio.Group>
    );
    return (
      <section className="server_status_wrapper">
        <div className="server_params_container">
          <Skeleton
            active
            avatar
            loading={serverStatusStore.serverStatusLoading}
          >
            <div className="server_params">
              <span className="param_title">
              Bandwidth Usage
                <span>
                  <Icon type="info-circle" theme="outlined" />
                </span>
              </span>
              <span className="usage_ratio">
                {serverStatusStore.bandwidthUsage}
                %
              </span>
              <div className="progress_wrapper">
                <div
                  className="current_progress"
                  style={{ width: `${serverStatusStore.bandwidthUsage}%` }}
                />
              </div>
              <div className="dosage_total">
                <span>
                Dosage:
                  <span style={{
                    marginLeft: 4,
                    color: 'rgba(0,0,0,.85)',
                  }}
                  >
                    {serverStatusStore.bandwidthDosage}
                  </span>
                  {' '}
                  GB
                </span>
                <span style={{ marginLeft: 16 }}>
                Total:
                  <span style={{
                    marginLeft: 4,
                    color: 'rgba(0,0,0,.85)',
                  }}
                  >
                    {serverStatusStore.totalBandwidth}
                  </span>
                  {' '}
                  GB
                </span>
              </div>
            </div>
          </Skeleton>
          <Skeleton
            active
            avatar
            loading={serverStatusStore.serverStatusLoading}
          >
            <div className="server_params">
              <span className="param_title">
              Disk Usage
                <span>
                  <Icon type="info-circle" theme="outlined" />
                </span>
              </span>
              <span className="usage_ratio">
                {serverStatusStore.diskUsage}
                %
              </span>
              <div className="progress_wrapper">
                <div
                  className="current_progress"
                  style={{ width: `${serverStatusStore.diskUsage}%` }}
                />
              </div>
              <div className="dosage_total">
                <span>
                Dosage:
                  <span style={{
                    marginLeft: 4,
                    color: 'rgba(0,0,0,.85)',
                  }}
                  >
                    {serverStatusStore.diskDosage}
                  </span>
                  {' '}
                GB
                </span>
                <span style={{ marginLeft: 16 }}>
                Total:
                  <span style={{
                    marginLeft: 4,
                    color: 'rgba(0,0,0,.85)',
                  }}
                  >
                    {serverStatusStore.totalDisk}
                  </span>
                  {' '}
                  GB
                </span>
              </div>
            </div>
          </Skeleton>
          <Skeleton
            active
            avatar
            loading={serverStatusStore.serverStatusLoading}
          >
            <div className="server_params">
              <span className="param_title">
              RAM Usage
                <span>
                  <Icon type="info-circle" theme="outlined" />
                </span>
              </span>
              <span className="usage_ratio">
                {serverStatusStore.RAMUsage}
                %
              </span>
              <div className="progress_wrapper">
                <div
                  className="current_progress"
                  style={{ width: `${serverStatusStore.RAMUsage}%` }}
                />
              </div>
              <div className="dosage_total">
                <span>
                Dosage:
                  <span style={{
                    marginLeft: 4,
                    color: 'rgba(0,0,0,.85)',
                  }}
                  >
                    {serverStatusStore.RAMDosage}
                  </span>
                  {' '}
                MB
                </span>
                <span style={{ marginLeft: 16 }}>
                Total:
                  <span style={{
                    marginLeft: 4,
                    color: 'rgba(0,0,0,.85)',
                  }}
                  >
                    {serverStatusStore.totalRAM}
                  </span>
                  {' '}
                  MB
                </span>
              </div>
            </div>
          </Skeleton>
          <Skeleton
            active
            avatar
            loading={serverStatusStore.serverStatusLoading}
          >
            <div className="server_params">
              <span className="param_title">
              SWAP Usage
                <span>
                  <Icon type="info-circle" theme="outlined" />
                </span>
              </span>
              <span className="usage_ratio">
                {serverStatusStore.SWAPUsage}
                %
              </span>
              <div className="progress_wrapper">
                <div
                  className="current_progress"
                  style={{ width: `${serverStatusStore.SWAPUsage}%` }}
                />
              </div>
              <div className="dosage_total">
                <span>
                Dosage:
                  <span style={{
                    marginLeft: 4,
                    color: 'rgba(0,0,0,.85)',
                  }}
                  >
                    {serverStatusStore.SWAPDosage}
                  </span>
                  {' '}
                MB
                </span>
                <span style={{ marginLeft: 16 }}>
                Total:
                  <span style={{
                    marginLeft: 4,
                    color: 'rgba(0,0,0,.85)',
                  }}
                  >
                    {serverStatusStore.totalSWAP}
                  </span>
                  {' '}
                  MB
                </span>
              </div>
            </div>
          </Skeleton>
        </div>
        <div className="server_running_container">
          <Skeleton
            active
            avatar
            loading={serverStatusStore.serverUsageLoading}
          >
            <Tabs tabBarExtraContent={operations}>
              <TabPane tab="Network" key="1">
                <Line
                  data={networkChartConfig}
                />
              </TabPane>
              <TabPane tab="Disk" key="2">
                <Line
                  data={diskChartConfig}
                />
              </TabPane>
              <TabPane tab="CPU" key="3">
                <Line
                  data={cpuChartConfig}
                />
              </TabPane>
            </Tabs>
          </Skeleton>
        </div>
      </section>
    );
  }
}


export default ServerStatus;

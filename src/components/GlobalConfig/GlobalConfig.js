import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { List, Switch, Icon } from 'antd';

@inject('globalStore')
@observer
class GlobalConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { globalStore } = this.props;
    globalStore.getData();
  }

  render() {
    const { globalStore } = this.props;
    const listData = [
      {
        title: 'Mourning Mode',
        description: 'To set filter: grayscale(100%) for full site.',
      },
    ];
    return (
      <section
        className="global_wrapper"
      >
        <h2>
            Global Config
        </h2>
        <List
          itemLayout="horizontal"
          dataSource={listData}
          renderItem={item => (
            <List.Item actions={[
              <Switch
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
                defaultChecked={globalStore.fullSiteGrayStatus}
                onChange={checked => globalStore.onFullSiteGray(checked)} /* eslint-disable-line */
              />,
            ]}
            >
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </section>
    );
  }
}


export default GlobalConfig;

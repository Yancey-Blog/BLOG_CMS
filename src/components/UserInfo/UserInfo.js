import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Input, Button, Upload, Icon, Avatar,
} from 'antd';
import { beforeUpload, upload } from '../../util/tools';

const { TextArea } = Input;

@inject('userInfoStore')
@observer
class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { userInfoStore } = this.props;
    userInfoStore.getData();
  }

  render() {
    const { userInfoStore } = this.props;
    const labelStyle = {
      display: 'block',
      margin: '26px 0',
    };
    const inputStyle = {
      marginTop: 8,
    };
    const wrapperStyle = {
      display: 'grid',
      gridTemplateColumns: '360px 200px',
      gridColumnGap: 100,
    };
    return (
      <section
        className="user_info_wrapper"
        style={wrapperStyle}
      >
        <div>
          <h2>
          User Info
          </h2>
          <label
            htmlFor="userName"
            style={labelStyle}
          >
          User Name
            <Input
              id="userName"
              defaultValue={userInfoStore.userName}
              placeholder="User Name"
              style={inputStyle}
              onChange={event => userInfoStore.onUserNameChange(event)}
            />
          </label>
          <label
            htmlFor="position"
            style={labelStyle}
          >
          Position
            <Input
              id="position"
              value={userInfoStore.position}
              placeholder="Position"
              style={inputStyle}
              onChange={event => userInfoStore.onPositionChange(event)}
            />
          </label>
          <label
            htmlFor="city"
            style={labelStyle}
          >
          City
            <Input
              id="city"
              value={userInfoStore.city}
              placeholder="City"
              style={inputStyle}
              onChange={event => userInfoStore.onCityChange(event)}
            />
          </label>
          <label
            htmlFor="selfIntroduction"
            style={labelStyle}
          >
          Self Introduction
            <TextArea
              id="selfIntroduction"
              value={userInfoStore.selfIntroduction}
              rows={16}
              placeholder="Self Introduction"
              style={inputStyle}
              onChange={event => userInfoStore.onSelfIntroductionChange(event)}
            />
          </label>
          <Button
            disabled={!userInfoStore.isFilled}
            onClick={() => userInfoStore.onSubmitChange()}
            type="primary"
          >
          Submit
          </Button>
        </div>
        <div
          className="avatar"
          style={{ marginTop: 60, overflow: 'hidden' }}
        >
          <p>
            Avatar
          </p>
          <Avatar
            size={144}
            icon="user"
            src={userInfoStore.avatar}
            style={{ display: 'block' }}
          />
          <Upload
            name="avatar"
            {...upload()}
            beforeUpload={beforeUpload}
            showUploadList={false}
            onChange={userInfoStore.onUploadChange}
          >
            <Button
              style={{ marginTop: 20 }}
            >
              <Icon type="upload" />
              Change Avatar
            </Button>
          </Upload>
        </div>
      </section>
    );
  }
}


export default UserInfo;

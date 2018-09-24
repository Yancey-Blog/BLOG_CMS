import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment';
import {
  Modal, Input, Icon, Row, Col, DatePicker, Tag, Tooltip,
} from 'antd';
import { getCurrentDate } from '../../util/tools';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

@inject('workExperienceStore')
@observer
class WorkExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { workExperienceStore } = this.props;
    workExperienceStore.getData();
  }

  render() {
    const { workExperienceStore } = this.props;
    const dateFormat = 'YYYY-MM-DD';
    const tagColorList = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];
    return (
      <Modal
        title={(
          <span>
            <Icon
              type="plus-circle"
              theme="twoTone"
              twoToneColor="#faad14"
              style={{ marginRight: 10 }}
            />
            {workExperienceStore.modalType === 'add' ? 'Add new' : 'Update the'}
            {' '}
              Work Experience
          </span>
          )}
        width={600}
        wrapClassName="reset_modal"
        closable={false}
        destroyOnClose
        visible={workExperienceStore.showModal}
        okButtonProps={{ disabled: !workExperienceStore.isFilled }}
        okText=""
        onOk={workExperienceStore.modalType === 'add' ? () => workExperienceStore.insertData() : () => workExperienceStore.modifyData()}
        onCancel={workExperienceStore.closeModal}
      >
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <span style={{ color: '#f50', verticalAlign: 'sub' }}>
                *
              {' '}
            </span>
            <span style={{ lineHeight: '32px' }}>
                Enterprise Name:
            </span>
          </Col>
          <Col className="gutter-row" span={18}>
            <Input
              defaultValue={workExperienceStore.enterpriseName}
              placeholder="Enterprise Name"
              onChange={event => workExperienceStore.onEnterpriseNameChange(event)}
            />
          </Col>
          <Col className="gutter-row" span={6} style={{ marginTop: 20 }}>
            <span style={{ color: '#f50', verticalAlign: 'sub' }}>
                *
              {' '}
            </span>
            <span style={{ lineHeight: '32px' }}>
                Position:
            </span>
          </Col>
          <Col className="gutter-row" span={18} style={{ marginTop: 20 }}>
            <Input
              defaultValue={workExperienceStore.position}
              placeholder="Position"
              onChange={event => workExperienceStore.onPositionChange(event)}
            />
          </Col>
          <Col className="gutter-row" span={6} style={{ marginTop: 20, marginBottom: 20 }}>
            <span style={{ color: '#f50', verticalAlign: 'sub' }}>
                *
              {' '}
            </span>
            <span style={{ lineHeight: '32px' }}>
                In Service:
            </span>
          </Col>
          <Col className="gutter-row" span={18} style={{ marginTop: 20, marginBottom: 20 }}>
            <RangePicker
              defaultValue={
                [moment(workExperienceStore.inService.length === 2 ? workExperienceStore.inService[0] : getCurrentDate(), dateFormat),
                  moment(workExperienceStore.inService.length === 2 ? workExperienceStore.inService[1] : getCurrentDate(), dateFormat)]}
              format={dateFormat}
              onChange={(date, dateString) => workExperienceStore.onInServiceChange(date, dateString)}
            />
          </Col>
          <Col className="gutter-row" span={6} style={{ marginBottom: 20 }}>
            <span style={{ color: '#f50', verticalAlign: 'sub' }}>
                *
              {' '}
            </span>
            <span style={{ lineHeight: '32px' }}>
              Work Content:
            </span>
          </Col>
          <Col className="gutter-row" span={18} style={{ marginBottom: 20 }}>
            <TextArea
              rows={8}
              placeholder="Work Content"
              defaultValue={workExperienceStore.workContent}
              onChange={event => workExperienceStore.onWorkContentChange(event)}
            />
          </Col>
          <Col className="gutter-row" span={6} style={{ marginBottom: 20 }}>
            <span style={{ lineHeight: '32px' }}>
                Technology Stack:
            </span>
          </Col>
          <Col className="gutter-row" span={18} style={{ marginBottom: 20 }}>
            <div>
              {workExperienceStore.tags.map((tag, index) => {
                const isLongTag = tag.length > 10;
                const tagElem = (
                  <Tag
                    key={tag}
                    closable
                    color={tagColorList[index]}
                    afterClose={() => workExperienceStore.handleClose(tag)}
                  >
                    {isLongTag ? `${tag.slice(0, 10)}...` : tag}
                  </Tag>
                );
                return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
              })}
              {workExperienceStore.inputVisible && (
              <Input
                ref={workExperienceStore.saveInputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={workExperienceStore.inputValue}
                onChange={workExperienceStore.handleInputChange}
                onBlur={workExperienceStore.handleInputConfirm}
                onPressEnter={workExperienceStore.handleInputConfirm}
              />
              )}
              {!workExperienceStore.inputVisible && (
              <Tag
                onClick={workExperienceStore.showInput}
                style={{ background: '#fff', borderStyle: 'dashed' }}
              >
                <Icon type="plus" />
                {' '}
                    New Tag
              </Tag>
              )}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  }
}


export default WorkExperience;

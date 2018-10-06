import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Modal, Input, Icon, Row, Col, Tag, Tooltip,
} from 'antd';

const { TextArea } = Input;

@inject('programExperienceStore')
@observer
class ProgramExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { programExperienceStore } = this.props;
    programExperienceStore.getData();
  }

  render() {
    const { programExperienceStore } = this.props;
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
            {programExperienceStore.modalType === 'add' ? 'Add new' : 'Update the'}
            {' '}
              Program Experience
          </span>
          )}
        width={600}
        wrapClassName="reset_modal"
        closable={false}
        destroyOnClose
        visible={programExperienceStore.showModal}
        okButtonProps={{ disabled: !programExperienceStore.isFilled }}
        okText=""
        onOk={programExperienceStore.modalType === 'add' ? () => programExperienceStore.insertData() : () => programExperienceStore.modifyData()}
        onCancel={programExperienceStore.closeModal}
      >
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <span style={{ color: '#f50', verticalAlign: 'sub' }}>
                *
              {' '}
            </span>
            <span style={{ lineHeight: '32px' }}>
                Program Name:
            </span>
          </Col>
          <Col className="gutter-row" span={18}>
            <Input
              defaultValue={programExperienceStore.programName}
              placeholder="Program Name"
              onChange={event => programExperienceStore.onProgramNameChange(event)}
            />
          </Col>
          <Col className="gutter-row" span={6} style={{ marginTop: 20 }}>
            <span style={{ color: '#f50', verticalAlign: 'sub' }}>
                *
              {' '}
            </span>
            <span style={{ lineHeight: '32px' }}>
                Program Url:
            </span>
          </Col>
          <Col className="gutter-row" span={18} style={{ marginTop: 20 }}>
            <Input
              defaultValue={programExperienceStore.programUrl}
              placeholder="Program Url"
              onChange={event => programExperienceStore.onProgramUrlChange(event)}
            />
          </Col>
          <Col className="gutter-row" span={6} style={{ marginTop: 20, marginBottom: 20 }}>
            <span style={{ color: '#f50', verticalAlign: 'sub' }}>
                *
              {' '}
            </span>
            <span style={{ lineHeight: '32px' }}>
              Program Content:
            </span>
          </Col>
          <Col className="gutter-row" span={18} style={{ marginTop: 20, marginBottom: 20 }}>
            <TextArea
              rows={8}
              placeholder="Program Content"
              defaultValue={programExperienceStore.programContent}
              onChange={event => programExperienceStore.onProgramContentChange(event)}
            />
          </Col>
          <Col className="gutter-row" span={6} style={{ marginBottom: 20 }}>
            <span style={{ lineHeight: '32px' }}>
                Technology Stack:
            </span>
          </Col>
          <Col className="gutter-row" span={18} style={{ marginBottom: 20 }}>
            <div>
              {programExperienceStore.tags.map((tag, index) => {
                const isLongTag = tag.length > 10;
                const tagElem = (
                  <Tag
                    key={tag}
                    closable
                    color={tagColorList[index]}
                    afterClose={() => programExperienceStore.handleClose(tag)}
                  >
                    {isLongTag ? `${tag.slice(0, 10)}...` : tag}
                  </Tag>
                );
                return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
              })}
              {programExperienceStore.inputVisible && (
              <Input
                ref={programExperienceStore.saveInputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={programExperienceStore.inputValue}
                onChange={programExperienceStore.handleInputChange}
                onBlur={programExperienceStore.handleInputConfirm}
                onPressEnter={programExperienceStore.handleInputConfirm}
              />
              )}
              {!programExperienceStore.inputVisible && (
              <Tag
                onClick={programExperienceStore.showInput}
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


export default ProgramExperience;

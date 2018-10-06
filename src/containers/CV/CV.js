import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Icon, Popconfirm } from 'antd';
import WorkExperience from '../../components/WorkExperience/WorkExperience';
import ProgramExperience from '../../components/ProgramExperience/ProgramExperience';
import './CV.css';

@inject('workExperienceStore', 'programExperienceStore')
@observer
class CV extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  handleKeyDown = () => {
  };

  render() {
    const { workExperienceStore, programExperienceStore } = this.props;
    return (
      <main className="wrapper cv_wrapper">
        <section className="work_experience_container">
          <div className="add_wrapper">
            <div
              className="add_btn"
              role="button"
              tabIndex={0}
              onClick={() => workExperienceStore.openModal('add')}
              onKeyDown={this.handleKeyDown}
            />
            <span className="add_intro">
              Add Work Experience
            </span>
          </div>
          <ul className="work_experience_list">
            {
              Object.keys(workExperienceStore.dataSource).map(key => (
                <li className="work_experience_item" key={key}>
                  <div className="enterprise_in_service">
                    <div className="operation">
                      <Icon
                        type="form"
                        theme="outlined"
                        onClick={
                          () => workExperienceStore.openModal('update',
                            workExperienceStore.dataSource[key].enterprise_name,
                            workExperienceStore.dataSource[key].position,
                            workExperienceStore.dataSource[key].in_service,
                            workExperienceStore.dataSource[key].work_content,
                            workExperienceStore.dataSource[key].work_technology_stack,
                            workExperienceStore.dataSource[key]._id,) /* eslint-disable-line */
                        }
                      />
                      <Popconfirm
                        title="Are you sure delete the work experience?"
                        icon={<Icon type="warning" style={{ color: 'red' }} />}
                        onConfirm={() => workExperienceStore.deleteData(workExperienceStore.dataSource[key]._id,)} /* eslint-disable-line */
                      >
                        <Icon
                          type="delete"
                          theme="outlined"
                        />
                      </Popconfirm>
                    </div>
                    <h4 className="enterprise_name">
                      {workExperienceStore.dataSource[key].enterprise_name}
                    </h4>
                    <span className="in_service">
                      {workExperienceStore.dataSource[key].in_service[0]}
                      {' '}
                      ~
                      {' '}
                      {workExperienceStore.dataSource[key].in_service[1]}
                    </span>
                  </div>
                  <p className="position">
                    {workExperienceStore.dataSource[key].position}
                  </p>
                  <p className="work_content">
                    {workExperienceStore.dataSource[key].work_content}
                  </p>
                  <div className="technology_stack">
                    {
                      Object.keys(workExperienceStore.dataSource[key].work_technology_stack).map(tag => (
                        <span className="technology_stack_item" key={tag}>
                          {workExperienceStore.dataSource[key].work_technology_stack[tag]}
                        </span>
                      ))
                    }
                  </div>
                </li>
              ))
            }
          </ul>
          <WorkExperience />
        </section>
        <section className="program_experience_container">
          <div
            className="add_wrapper"
          >
            <div
              className="add_btn"
              role="button"
              tabIndex={0}
              onClick={() => programExperienceStore.openModal('add')}
              onKeyDown={this.handleKeyDown}
              style={{ marginLeft: '20px' }}
            />
            <span className="add_intro">
              Add Program Experience
            </span>
          </div>
          <ul className="work_experience_list">
            {
              Object.keys(programExperienceStore.dataSource).map(key => (
                <li className="work_experience_item" key={key}>
                  <div className="enterprise_in_service">
                    <div className="operation">
                      <Icon
                        type="form"
                        theme="outlined"
                        onClick={
                          () => programExperienceStore.openModal('update',
                            programExperienceStore.dataSource[key].program_name,
                            programExperienceStore.dataSource[key].program_url,
                            programExperienceStore.dataSource[key].program_content,
                            programExperienceStore.dataSource[key].program_technology_stack,
                            programExperienceStore.dataSource[key]._id,) /* eslint-disable-line */
                        }
                      />
                      <Popconfirm
                        title="Are you sure delete the program experience?"
                        icon={<Icon type="warning" style={{ color: 'red' }} />}
                        onConfirm={() => programExperienceStore.deleteData(programExperienceStore.dataSource[key]._id,)} /* eslint-disable-line */
                      >
                        <Icon
                          type="delete"
                          theme="outlined"
                        />
                      </Popconfirm>
                    </div>
                    <h4 className="enterprise_name">
                      {programExperienceStore.dataSource[key].program_name}
                    </h4>
                  </div>
                  <p className="position">
                    {programExperienceStore.dataSource[key].program_url}
                  </p>
                  <p className="work_content">
                    {programExperienceStore.dataSource[key].program_content}
                  </p>
                  <div className="technology_stack">
                    {
                      Object.keys(programExperienceStore.dataSource[key].program_technology_stack).map(tag => (
                        <span className="technology_stack_item" key={tag}>
                          {programExperienceStore.dataSource[key].program_technology_stack[tag]}
                        </span>
                      ))
                    }
                  </div>
                </li>
              ))
            }
          </ul>
          <ProgramExperience />
        </section>
      </main>
    );
  }
}


export default CV;

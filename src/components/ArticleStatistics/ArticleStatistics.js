import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ReactTooltip from 'react-tooltip';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

@inject('articleStore')
@observer
class ArticleStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
  }

  componentDidMount() {
    const { articleStore } = this.props;
    articleStore.getDataByDay();
  }

  componentWillUnmount() {
  }

  render() {
    const { articleStore } = this.props;
    const year = new Date().getFullYear();
    const startDay = `${year}-01-01`;
    const endDay = new Date();
    const wrapperStyle = {
      display: 'grid',
      gridTemplateColumns: '70% 30%',
      gridColumnGap: 24,
      marginTop: 24,
      padding: 24,
      background: '#fff',
    };
    return (
      <section
        className="article_statistics_wrapper"
        style={wrapperStyle}
      >
        <div>
          <CalendarHeatmap
            startDate={new Date(startDay)}
            endDate={new Date(endDay)}
            values={articleStore.dayDataSource}
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return `color-gitlab-${value.count}`;
            }}
            tooltipDataAttrs={value => ({
              'data-tip': value.date ? `${value.date} has count: ${value.count}` : 'no articles on this day',
            })}
            showWeekdayLabels
          />
          <ReactTooltip/>
        </div>
        <div>
          Top 10
        </div>
      </section>
    );
  }
}


export default ArticleStatistics;

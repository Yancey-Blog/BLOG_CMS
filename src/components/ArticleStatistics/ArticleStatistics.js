import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ReactTooltip from 'react-tooltip';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './articleStatistic.css';

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
    articleStore.getDataByPV();
  }

  componentWillUnmount() {
  }

  render() {
    const { articleStore } = this.props;
    const year = new Date().getFullYear();
    const startDay = `${year}-01-01`;
    const endDay = new Date();
    const rankNumberStyle = {
      backgroundColor: 'rgb(49, 70, 89)',
      color: 'rgb(255, 255, 255)',
    };
    return (
      <section className="article_statistics_wrapper">
        <div>
          <h4 className="heat_map_header">
            Heat Map
          </h4>
          <CalendarHeatmap
            startDate={new Date(startDay)}
            endDate={new Date(endDay)}
            values={articleStore.dayDataSource}
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return `color-github-${value.count}`;
            }}
            tooltipDataAttrs={value => ({
              'data-tip': value.date ? `${value.date} you post ${value.count} ${value.count > 1 ? 'articles' : 'article'}` : 'no articles on this day',
            })}
            showWeekdayLabels
          />
          <ReactTooltip />
        </div>
        <div className="rank_articles_wrapper">
          <h4>
            Top 7 Articles
          </h4>
          <ul>
            {
              Object.keys(articleStore.PVDataSource).map(key => (
                <li key={key}>
                  <span className="rank_number_wrapper">
                    <span
                      className="rank_number"
                      style={parseInt(key, 10) < 3 ? rankNumberStyle : {}}
                    >
                      {parseInt(key, 10) + 1}
                    </span>
                    <span className="article_title">
                      {articleStore.PVDataSource[key].title}
                    </span>
                  </span>
                  <span className="pv_number">
                    {articleStore.PVDataSource[key].pv_count}
                    {' '}
                    PV
                  </span>
                </li>
              ))
            }
          </ul>
        </div>
      </section>
    );
  }
}


export default ArticleStatistics;

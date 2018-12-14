import InfiniteScroll from 'react-infinite-scroller';
import React, { Component } from 'react';
import { Avatar, List, Spin, message } from 'antd';
import './index.css';

import { getForestRankingDataFromServer, maximumNumber } from '../../api';

class Chart extends Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
  };

  async componentDidMount() {
    const results = await getForestRankingDataFromServer({
      lastPosition: 0,
    });
    console.log('In ComponentDidMount');
    console.log(results);

    this.setState({ data: results });
  }

  handleInfiniteOnLoad = async () => {
    let { data } = this.state;
    this.setState({ loading: true });

    if (data.length >= maximumNumber) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }

    const results = await getForestRankingDataFromServer({
      lastPosition: data.length,
    });
    console.log(results);

    data = data.concat(results);
    this.setState({ data, loading: false });
  };

  // TODO: 用成另外元件
  renderItem = ({
    user_id: userId,
    avatar,
    name,
    health_count: healthCount,
    dead_count: deadCount,
    total_minutes: totalMinutes,
  }) => (
    <List.Item key={userId}>
      <List.Item.Meta
        avatar={<Avatar src={avatar} />}
        title={name}
        description={totalMinutes}
      />
      <div>
        {healthCount} / {deadCount}
      </div>
    </List.Item>
  );

  isRowLoaded = ({ index }) => !!this.loadedRowsMap[index];

  render() {
    const { data, loading, hasMore } = this.state;

    return (
      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!loading && hasMore}
          useWindow={false}
        >
          <List dataSource={data} renderItem={this.renderItem}>
            {loading && hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}

export default Chart;

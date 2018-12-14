import InfiniteScroll from 'react-infinite-scroller';
import React, { Component } from 'react';
import { List, Spin, message } from 'antd';
import './index.css';

import { getForestRankingDataFromServer, maximumNumber } from '../../api';

import Cell from './Cell';

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

    data = data.concat(results);
    this.setState({ data, loading: false });
  };

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
          <List dataSource={data} renderItem={item => <Cell item={item} />}>
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

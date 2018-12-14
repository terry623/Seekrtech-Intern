import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import React, { Component } from 'react';
import VList from 'react-virtualized/dist/commonjs/List';
import { Avatar, List, Spin, message } from 'antd';

import './index.css';

import { getForestRankingDataFromServer, maximumNumber } from '../../api';

// import Cell from './Cell';

class Chart extends Component {
  state = {
    data: [],
    loading: false,
  };

  loadedRowsMap = {};

  // async componentDidMount() {
  //   const results = await getForestRankingDataFromServer({
  //     lastPosition: 0,
  //   });

  //   this.setState({ data: results });
  // }

  componentDidUpdate() {
    if (this.state.loading) {
      const hide = message.loading('Action in progress..', 0);
      setTimeout(hide, 1500);
    }
  }

  handleInfiniteOnLoad = async ({ startIndex, stopIndex }) => {
    let { data } = this.state;
    this.setState({ loading: true });

    console.log(startIndex, stopIndex);

    for (let i = startIndex; i <= stopIndex; i++) {
      // 1 means loading
      this.loadedRowsMap[i] = 1;
    }

    if (data.length >= maximumNumber) {
      message.warning('Infinite List loaded all');
      this.setState({ loading: false });
      return;
    }

    const results = await getForestRankingDataFromServer({
      lastPosition: data.length,
    });

    data = data.concat(results);
    this.setState({ data, loading: false });
  };

  isRowLoaded = ({ index }) => !!this.loadedRowsMap[index];

  renderItem = ({ index, key, style }) => {
    const { data } = this.state;
    const item = data[index];
    return (
      <List.Item key={key} style={style}>
        <List.Item.Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={<a href="https://ant.design">{index}</a>}
          // description={item.name}
        />
        <div>Content</div>
      </List.Item>
    );
  };

  render() {
    const { data, loading } = this.state;

    return (
      <List>
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.handleInfiniteOnLoad}
          rowCount={maximumNumber}
          minimumBatchSize={20}
          threshold={20}
        >
          {({ onRowsRendered, registerChild }) => (
            <VList
              height={500}
              onRowsRendered={onRowsRendered}
              ref={registerChild}
              rowCount={maximumNumber}
              rowHeight={50}
              rowRenderer={this.renderItem}
              width={600}
            />
          )}
        </InfiniteLoader>
      </List>
    );
  }
}

export default Chart;

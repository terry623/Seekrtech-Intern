import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import React, { Component, Fragment } from 'react';
import VList from 'react-virtualized/dist/commonjs/List';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import { message } from 'antd';

import './index.css';

import {
  getForestRankingDataFromServer,
  maximumNumber,
  recordsNumber,
} from '../../api';

import Cell from './Cell';

class Chart extends Component {
  state = {
    data: [],
    loading: false,
  };

  loadedRowsMap = {};

  async componentDidMount() {
    const results = await getForestRankingDataFromServer({
      lastPosition: 0,
    });

    this.setState({ data: results });
  }

  componentDidUpdate() {
    if (this.state.loading) {
      const hide = message.loading('Action in progress..', 0);
      setTimeout(hide, 1500);
    }
  }

  handleInfiniteOnLoad = async ({ startIndex, stopIndex }) => {
    let { data } = this.state;
    this.setState({ loading: true });

    console.log(`Start: ${startIndex}, Stop ${stopIndex}`);

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
    return <Cell key={key} style={style} rank={index} item={item} />;
  };

  render() {
    const { data } = this.state;

    const vlist = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop,
      onRowsRendered,
    }) => (
      <VList
        autoHeight
        className="main"
        height={height}
        isScrolling={isScrolling}
        onScroll={onChildScroll}
        overscanRowCount={2}
        rowCount={data.length}
        rowHeight={80}
        rowRenderer={this.renderItem}
        onRowsRendered={onRowsRendered}
        scrollTop={scrollTop}
        width={400}
      />
    );

    const infiniteLoader = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop,
    }) => (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.handleInfiniteOnLoad}
        rowCount={data.length}
        minimumBatchSize={recordsNumber}
        threshold={0}
      >
        {({ onRowsRendered }) =>
          vlist({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
            onRowsRendered,
          })
        }
      </InfiniteLoader>
    );

    return (
      <Fragment>
        {data.length > 0 && <WindowScroller>{infiniteLoader}</WindowScroller>}
      </Fragment>
    );
  }
}

export default Chart;

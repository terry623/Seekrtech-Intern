import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import React, { Component } from 'react';
import VList from 'react-virtualized/dist/commonjs/List';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import { Avatar, List, Spin, message } from 'antd';
import './index.css';

import { getForestRankingDataFromServer, recordsNumber } from '../../api';

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
    console.log('In ComponentDidMount');
    console.log(results);

    this.setState({ data: results });
  }

  inProgress = ({ startIndex, stopIndex }) => {
    console.log(`StartIndex: ${startIndex}, StopIndex: ${stopIndex}`);
    const hide = message.loading('Action in progress..', 0);
    setTimeout(hide, 1000);
  };

  isFinish = ({ startIndex, stopIndex }) => {
    console.log(`StartIndex: ${startIndex}, StopIndex: ${stopIndex}`);
    message.warning('Virtualized List loaded all');
    this.setState({ loading: false });
  };

  handleInfiniteOnLoad = async ({ startIndex, stopIndex }) => {
    let { data } = this.state;
    this.setState({ loading: true });
    this.inProgress({ startIndex, stopIndex });

    for (let i = startIndex; i <= stopIndex; i++) {
      // 1 means loading
      this.loadedRowsMap[i] = 1;
    }

    // FIXME: 有問題!
    // if (data.length > maximumNumber) {
    //   this.isFinish();
    //   return;
    // }

    const results = await getForestRankingDataFromServer({
      lastPosition: startIndex,
    });
    console.log(results);

    data = data.concat(results);
    this.setState({ data, loading: false });
  };

  // TODO: 用成另外元件
  renderItem = ({ index, key, style }) => {
    const { data } = this.state;
    const item = data[index];
    return (
      <List.Item key={key} style={style}>
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={item.name}
          description={item.user_id}
        />
        <div>{index}</div>
      </List.Item>
    );
  };

  isRowLoaded = ({ index }) => !!this.loadedRowsMap[index];

  render() {
    const { data } = this.state;

    const vlist = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop,
      onRowsRendered,
      width,
    }) => (
      <VList
        autoHeight
        height={height}
        isScrolling={isScrolling}
        onScroll={onChildScroll}
        overscanRowCount={2}
        rowCount={data.length}
        rowHeight={73}
        rowRenderer={this.renderItem}
        onRowsRendered={onRowsRendered}
        scrollTop={scrollTop}
        width={width}
      />
    );

    const autoSize = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop,
      onRowsRendered,
    }) => (
      <AutoSizer disableHeight>
        {({ width }) =>
          vlist({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
            onRowsRendered,
            width,
          })
        }
      </AutoSizer>
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
        minimumBatchSize={recordsNumber}
        rowCount={data.length}
      >
        {({ onRowsRendered }) =>
          autoSize({
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
      <List>
        {data.length > 0 && <WindowScroller>{infiniteLoader}</WindowScroller>}
        {this.state.loading && <Spin className="demo-loading" />}
      </List>
    );
  }
}

export default Chart;

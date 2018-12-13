import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import React, { Component } from 'react';
import VList from 'react-virtualized/dist/commonjs/List';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import { Avatar, List, Spin, message } from 'antd';

import { getForestRankingDataFromServer } from '../../api';

class Chart extends Component {
  state = {
    data: [],
    loading: false,
  };

  loadedRowsMap = {};

  async componentDidMount() {
    const results = await getForestRankingDataFromServer({
      number: 10,
      lastPosition: 0,
    });
    console.log(results.ranking);
    this.setState({ data: results.ranking });
  }

  isRowLoaded = ({ index }) => !!this.loadedRowsMap[index];

  handleInfiniteOnLoad = async ({ startIndex, stopIndex }) => {
    let { data } = this.state;
    this.setState({ loading: true });

    for (let i = startIndex; i <= stopIndex; i++) {
      // 1 means loading
      this.loadedRowsMap[i] = 1;
    }

    if (data.length > 19) {
      message.warning('Virtualized List loaded all');
      this.setState({ loading: false });
      return;
    }

    const results = await getForestRankingDataFromServer({
      number: 10,
      lastPosition: 0,
    });
    data = data.concat(results);
    this.setState({ data, loading: false });
  };

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
        <div>Content</div>
      </List.Item>
    );
  };

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
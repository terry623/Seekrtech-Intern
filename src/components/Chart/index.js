// import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
// import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import React, { Component } from 'react';
// import VList from 'react-virtualized/dist/commonjs/List';
// import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import { Avatar, List, message } from 'antd';

import { getForestRankingData } from '../../api';

class Chart extends Component {
  state = {
    data: [],
    loading: false,
  };

  loadedRowsMap = {};

  async componentDidMount() {
    const results = await getForestRankingData({ number: 10, lastPosition: 0 });
    console.table(results);
    // this.setState({ data: results });
  }

  isRowLoaded = ({ index }) => !!this.loadedRowsMap[index];

  async handleInfiniteOnLoad({ startIndex, stopIndex }) {
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

    const results = await getForestRankingData({ number: 10, lastPosition: 0 });
    data = data.concat(results);
    this.setState({ data, loading: false });
  }

  renderItem = ({ index, key, style }) => {
    const { data } = this.state;
    const item = data[index];
    return (
      <List.Item key={key} style={style}>
        <List.Item.Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={<a href="https://ant.design">{item.name.last}</a>}
          description={item.email}
        />
        <div>Content</div>
      </List.Item>
    );
  };

  render() {
    const { data } = this.state;
    // const vlist = ({
    //   height,
    //   isScrolling,
    //   onChildScroll,
    //   scrollTop,
    //   onRowsRendered,
    //   width,
    // }) => (
    //   <VList
    //     autoHeight
    //     height={height}
    //     isScrolling={isScrolling}
    //     onScroll={onChildScroll}
    //     overscanRowCount={2}
    //     rowCount={data.length}
    //     rowHeight={73}
    //     rowRenderer={this.renderItem}
    //     onRowsRendered={onRowsRendered}
    //     scrollTop={scrollTop}
    //     width={width}
    //   />
    // );
    // const autoSize = ({
    //   height,
    //   isScrolling,
    //   onChildScroll,
    //   scrollTop,
    //   onRowsRendered,
    // }) => (
    //   <AutoSizer disableHeight>
    //     {({ width }) =>
    //       vlist({
    //         height,
    //         isScrolling,
    //         onChildScroll,
    //         scrollTop,
    //         onRowsRendered,
    //         width,
    //       })
    //     }
    //   </AutoSizer>
    // );
    // const infiniteLoader = ({
    //   height,
    //   isScrolling,
    //   onChildScroll,
    //   scrollTop,
    // }) => (
    //   <InfiniteLoader
    //     isRowLoaded={this.isRowLoaded}
    //     loadMoreRows={this.handleInfiniteOnLoad}
    //     rowCount={data.length}
    //   >
    //     {({ onRowsRendered }) =>
    //       autoSize({
    //         height,
    //         isScrolling,
    //         onChildScroll,
    //         scrollTop,
    //         onRowsRendered,
    //       })
    //     }
    //   </InfiniteLoader>
    // );
    return (
      // <List>
      //   {data.length > 0 && <WindowScroller>{infiniteLoader}</WindowScroller>}
      //   {this.state.loading && <Spin className="demo-loading" />}
      // </List>
      <div>
        {this.state.loading}
        {console.log(data)}
      </div>
    );
  }
}

export default Chart;

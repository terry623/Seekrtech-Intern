import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import List from 'react-virtualized/dist/commonjs/List';
import React, { Component } from 'react';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';

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
  };

  async componentDidMount() {
    const results = await getForestRankingDataFromServer({
      lastPosition: 0,
    });

    console.log(`Start: 0, Stop: ${recordsNumber}`);
    console.log(results);

    this.setState({ data: results });
  }

  handleInfiniteOnLoad = async ({ startIndex, stopIndex }) => {
    let { data } = this.state;
    const results = await getForestRankingDataFromServer({
      lastPosition: startIndex,
    });

    console.log(`Start: ${startIndex}, Stop: ${stopIndex}`);
    console.log(results);

    data = data.concat(results);
    this.setState({ data });
  };

  isRowLoaded = ({ index }) => {
    const { data } = this.state;
    return !!data[index];
  };

  renderItem = ({ index, key, style }) => {
    const { data } = this.state;
    const item = data[index];
    return <Cell key={key} style={style} rank={index} item={item} />;
  };

  render() {
    const { data } = this.state;

    return (
      <WindowScroller>
        {({ height }) => (
          <InfiniteLoader
            isRowLoaded={this.isRowLoaded}
            loadMoreRows={this.handleInfiniteOnLoad}
            rowCount={maximumNumber}
            minimumBatchSize={recordsNumber}
            threshold={1}
          >
            {({ onRowsRendered, registerChild }) => (
              <List
                className="main"
                height={height}
                onRowsRendered={onRowsRendered}
                ref={registerChild}
                rowCount={data.length}
                rowHeight={80}
                rowRenderer={this.renderItem}
                width={400}
              />
            )}
          </InfiniteLoader>
        )}
      </WindowScroller>
    );
  }
}

export default Chart;

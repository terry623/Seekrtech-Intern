import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import React, { Component } from 'react';
import VList from 'react-virtualized/dist/commonjs/List';

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

    this.setState({ data: results });
  }

  handleInfiniteOnLoad = async ({ startIndex, stopIndex }) => {
    let { data } = this.state;
    console.log(`Start: ${startIndex}, Stop ${stopIndex}`);

    const results = await getForestRankingDataFromServer({
      lastPosition: startIndex,
    });

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
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.handleInfiniteOnLoad}
        rowCount={maximumNumber}
        minimumBatchSize={recordsNumber}
        threshold={1}
      >
        {({ onRowsRendered, registerChild }) => (
          <VList
            className="main"
            height={640}
            onRowsRendered={onRowsRendered}
            ref={registerChild}
            rowCount={data.length}
            rowHeight={80}
            rowRenderer={this.renderItem}
            width={400}
          />
        )}
      </InfiniteLoader>
    );
  }
}

export default Chart;

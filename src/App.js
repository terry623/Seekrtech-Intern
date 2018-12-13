import React, { Component, Fragment } from 'react';
import { Card } from 'antd';

import Chart from './components/Chart';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Card
          title="Card title"
          extra={<a href="#">More</a>}
          style={{ width: 300 }}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Chart />
      </Fragment>
    );
  }
}

export default App;

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Avatar, List } from 'antd';

import icon from '../../../image/icon_120.png';

class Cell extends Component {
  render() {
    const {
      avatar,
      name,
      health_count: healthCount,
      dead_count: deadCount,
      total_minutes: totalMinutes,
    } = this.props.item;

    return (
      <List.Item style={this.props.style}>
        <List.Item.Meta
          avatar={<Avatar src={avatar || icon} />}
          title={name}
          description={totalMinutes}
        />
        <div>
          {healthCount} / {deadCount}
        </div>
      </List.Item>
    );
  }
}

Cell.propTypes = {
  item: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string.isRequired,
    health_count: PropTypes.number.isRequired,
    dead_count: PropTypes.number.isRequired,
    total_minutes: PropTypes.number.isRequired,
  }).isRequired,
  style: PropTypes.object.isRequired,
};

export default Cell;

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Avatar, List } from 'antd';

class Cell extends Component {
  render() {
    const {
      user_id: userId,
      avatar,
      name,
      health_count: healthCount,
      dead_count: deadCount,
      total_minutes: totalMinutes,
    } = this.props.item;

    return (
      <List.Item key={userId}>
        <List.Item.Meta
          avatar={<Avatar src={avatar} />}
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
    user_id: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    name: PropTypes.string.isRequired,
    health_count: PropTypes.number.isRequired,
    dead_count: PropTypes.number.isRequired,
    total_minutes: PropTypes.number.isRequired,
  }).isRequired,
};

export default Cell;

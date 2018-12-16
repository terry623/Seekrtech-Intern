import PropTypes from 'prop-types';
import React from 'react';
import { Avatar, Col, Row } from 'antd';

import badge from '../image/leaderboard_badge.png';
import dead from '../image/tree_icon_dead.png';
import health from '../image/tree_icon_healthy.png';
import icon from '../image/icon_120.png';

import './index.css';

const Cell = ({
  rank,
  style,
  item: {
    avatar,
    name,
    health_count: healthCount,
    dead_count: deadCount,
    total_minutes: totalMinutes,
  },
}) => (
  <Row style={style} className="each_row">
    <Col span={4} className="each_col">
      <Avatar size={40} src={avatar || icon} />
    </Col>
    <Col span={14} className="each_col">
      <div>{name}</div>
      <span className="icon_block">
        <Avatar className="icon_avatar" size={16} src={health} />
        {healthCount}
      </span>
      <span className="icon_block">
        <Avatar className="icon_avatar" size={16} src={dead} />
        {deadCount}
      </span>
    </Col>
    <Col span={6}>
      <div className="badgeBlock">
        <div className="rank">{rank + 1}</div>
        <img className="badge" alt="badge" src={badge} />
      </div>
      <div className="minutes">{totalMinutes} 分鐘</div>
    </Col>
  </Row>
);

Cell.propTypes = {
  item: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string.isRequired,
    health_count: PropTypes.number.isRequired,
    dead_count: PropTypes.number.isRequired,
    total_minutes: PropTypes.number.isRequired,
  }).isRequired,
  rank: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

export default Cell;

import React from "react";
import PropTypes from "prop-types";

class TimelineRoom extends React.Component {
  render() {
    const { left, name, width } = this.props;

    return (
      <div
        className="timeline-room"
        style={{
          marginLeft: `${left}px`,
          width: `${width}px`
        }}
      >
        <div className="timeline-room__text">{name}</div>
      </div>
    );
  }
}

TimelineRoom.defaultProps = {
  left: 0,
  width: 80
};

TimelineRoom.propTypes = {
  left: PropTypes.number,
  width: PropTypes.number
};

export default TimelineRoom;

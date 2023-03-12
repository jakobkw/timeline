import React from "react";
import PropTypes from "prop-types";

class TimelineBar extends React.Component {
  render() {
    const { left, name, width, key } = this.props;

    return (
      <div
        className="timeline-bar"
        key={key}
        style={{
          "margin-left": `${left}px`,
          width: `${width}px`
        }}
      >
        <div className="timeline-bar__text">{name}</div>
      </div>
    );
  }
}

TimelineBar.defaultProps = {
  left: 0,
  width: 80
};

TimelineBar.propTypes = {
  left: PropTypes.number,
  width: PropTypes.number
};

export default TimelineBar;

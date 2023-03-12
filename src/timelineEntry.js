import React from 'react';
import PropTypes from 'prop-types';

class TimelineEntry extends React.Component {
	render() {
		return null;
	}
}

TimelineEntry.propTypes = {
	id:    PropTypes.number.isRequired,
	start: PropTypes.string,
	end:   PropTypes.string,
	name:  PropTypes.string,
}

export default TimelineEntry;
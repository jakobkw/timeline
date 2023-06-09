import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import TimelineBar from "./timelineBar";

class Timeline extends React.Component {
  /**
   * Sort data by start date.
   * Assumption that the start date will always be before end date.
   *
   * @param  {Array} data The data to sort.
   * @return {Array}     Sorted data.
   */
  sortData(data) {
    let sorted = data.sort((a, b) => {
      a = new Date(a.start);
      b = new Date(b.start);
      return a < b ? -1 : a > b ? 1 : 0;
    });

    return sorted;
  }

  /**
   * Get the last date from the data.
   * Assumption that the start date will always be before end date.
   *
   * @param  {Array} data The data to sort.
   * @return {String}     The first date for the grid.
   */
  getEndDate(data) {
    let sorted = data.sort((a, b) => {
      a = new Date(a.end);
      b = new Date(b.end);
      return a < b ? -1 : a > b ? 1 : 0;
    });

    return sorted[sorted.length - 1]["end"];
  }

  /**
   * Calculate number of days between start and end dates.
   *
   * @param  {String} start The start date.
   * @param  {String} end   The end date.
   * @return {Array}        An array of all the dates between.
   */
  getDatesBetween(start, end) {
    let dates = [];
    let currDate = moment(start).startOf("day");
    let endDate = moment(end).startOf("day");

    // Add current date.
    dates.push(currDate.toDate());

    // Loop through all days until end date.
    while (currDate.add(1, "days").diff(endDate) < 0) {
      dates.push(currDate.clone().toDate());
    }

    // Add an extra 2 days just for buffer.
    dates.push(endDate.toDate());
    dates.push(endDate.add(1, "days").toDate());

    return dates;
  }

  /**
   * Output grid for the timeline.
   *
   * @param  {Array}  dates  All the dates to output.
   * @return {XML}
   */
  outputHeader(dates) {
    return dates.map((date, index) => {
      return (
        <div className="timeline-grid__header" key={`header-${index}`}>
          <span>{moment(date).format("DD.MM.")}</span>
        </div>
      );
    });
  }

  /**
   * Output timeline data.
   *
   * @param  {Array}  entries       The data to output.
   * @param  {String} gridStartDate Start date for the grid.
   * @return {XML}
   */
  outputTimeline(entries, gridStartDate) {
    return entries.map((entry, index) => {
      const { start, end } = entry;

      const startDate = moment(start);
      const endDate = moment(end);

      var beforeDate =
        moment.duration(startDate.diff(gridStartDate)).asDays() + 0.625;
      if (index > 0) {
        beforeDate =
          moment
            .duration(startDate.diff(moment(entries[index - 1].end)))
            .asDays() + 0.2083;
      }

      // We need to add 1 to include the starting day.
      // Moment.js does not include the start date when check duration.
      const durationBetween =
        moment.duration(endDate.diff(startDate)).asDays() - 0.2083;
      // Get the start point.
      const startPoint =
        moment.duration(startDate.diff(gridStartDate)).asDays() + 0.625;

      return (
        <TimelineBar
          key={`bar-${index}`}
          left={80 * beforeDate}
          width={80 * durationBetween}
          {...entry}
        />
      );
    });
  }

  render() {
    const { data } = this.props;
    // Sort the data ordered by start.
    const sortedData = this.sortData(data);

    // Get the start date.
    const startDate = sortedData[0]["start"];
    // Get the end date.
    const endDate = this.getEndDate(data);
    // Get dates between start and end to output.
    const datesBetween = this.getDatesBetween(startDate, endDate);

    return (
      <div className="timeline-grid__container">
        <div className="timeline-grid__row">
          {this.outputHeader(datesBetween)}
        </div>

        <div className="timeline-grid__content">
          {this.outputTimeline(sortedData, startDate)}
        </div>
      </div>
    );
  }
}

Timeline.propTypes = { data: PropTypes.arrayOf(PropTypes.object) };

export default Timeline;

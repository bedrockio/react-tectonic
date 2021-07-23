import PropTypes from "prop-types";

export const AggregateFilterType = PropTypes.shape({
  from: PropTypes.number,
  size: PropTypes.number,
  terms: PropTypes.arrayOf(PropTypes.object),
  range: PropTypes.object,
  notExists: PropTypes.string,
  exists: PropTypes.string,
  minTimestamp: PropTypes.number,
  q: PropTypes.string,
});

const timeField = PropTypes.oneOfType([
  PropTypes.instanceOf(Date),
  PropTypes.number,
  PropTypes.string,
]);

export const TimeRangeType = PropTypes.shape({
  from: timeField.isRequired,
  to: timeField.isRequired,
  timeZone: PropTypes.string,
});

export const OptionType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  value: PropTypes.string.isRequired,
});

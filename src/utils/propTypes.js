import PropTypes from "prop-types";

export const AggregateFilter = PropTypes.shape({
  from: PropTypes.number,
  size: PropTypes.number,
  terms: PropTypes.arrayOf(PropTypes.object),
  range: PropTypes.object,
  notExists: PropTypes.string,
  exists: PropTypes.string,
  minTimestamp: PropTypes.number,
  q: PropTypes.string,
});

import React from "react";
import PropTypes from "prop-types";

export const ChartContainer = ({ children, height }) => {
  const classes = ["techonic", "chart"].filter(Boolean);
  return (
    <div style={{ height: `${height}px` }} className={classes.join(" ")}>
      {children}
    </div>
  );
};

ChartContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

ChartContainer.defaultProps = {};

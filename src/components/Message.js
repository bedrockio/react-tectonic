import React from "react";
import PropTypes from "prop-types";

export const Message = ({ children, floating, center }) => {
  const classes = [
    "techonic",
    "message",
    center && "center",
    floating && "floating",
  ].filter(Boolean);
  return (
    <div className={classes.join(" ")}>
      <div className="content">{children}</div>
    </div>
  );
};

Message.propTypes = {
  children: PropTypes.node,
  floating: PropTypes.bool,
  /**
   * Centers the text
   */
  center: PropTypes.bool,
};

Message.defaultProps = {
  center: true,
};

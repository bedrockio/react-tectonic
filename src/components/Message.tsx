import React from "react";
import PropTypes from "prop-types";

export const Message = ({ children, error, classNames = [] }: { children:React.ReactNode, error?: boolean, classNames?: string[]}) => {
  const classes = ["tnic-message", error && "error", ...classNames].filter(
    Boolean
  );

  return (
    <div className={classes.join(" ")}>
      <div className="content">{children}</div>
    </div>
  );
};



Message.propTypes = {
  children: PropTypes.node,
  boolean: PropTypes.bool,
  /**
   * Centers the text
   */
   classNames: PropTypes.arrayOf(PropTypes.string),
};

Message.defaultProps = {
  center: true,
};

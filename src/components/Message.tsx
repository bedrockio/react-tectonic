import React from "react";
import PropTypes from "prop-types";

export const Message = ({
  children,
  error,
  className,
  centered,
}: {
  children: React.ReactNode;
  centered?: boolean;
  error?: boolean;
  className?: string;
}): JSX.Element => {
  const classes = [
    "tnic-message",
    error && "error",
    centered !== false && "centered",
    className,
  ].filter(Boolean);

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

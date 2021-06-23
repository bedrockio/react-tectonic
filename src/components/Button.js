import React from "react";
import PropTypes from "prop-types";

export const Button = ({
  children,
  icon,
  disabled,
  primary,
  secondary,
  basic,
  ...props
}) => {
  const className = [
    "tnic-button",
    primary && "tnic-button--primary",
    icon && "tnic-button--icon",
    disabled && "tnic-button--disabled",
    basic && "tnic-button--basic",
  ].filter(Boolean);

  return (
    <button disabled={disabled} className={className.join(" ")} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.bool,
  disabled: PropTypes.bool,
  basic: PropTypes.bool,
};

Button.defaultProps = {};

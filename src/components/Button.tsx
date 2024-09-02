import React from "react";
import PropTypes from "prop-types";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: boolean;
  disabled?: boolean;
  primary?: boolean;
  secondary?: boolean;
  compact?: boolean;
  basic?: boolean;
}

export const Button = ({
  children,
  icon,
  disabled,
  primary,
  secondary,
  compact,
  basic,
  ...props
}: ButtonProps): JSX.Element => {
  const className = [
    "tnic-button",
    primary && "tnic-button--primary",
    icon && "tnic-button--icon",
    compact && "tnic-button--compact",
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
  compact: PropTypes.bool,
};

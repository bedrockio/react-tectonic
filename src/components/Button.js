import React from "react";

export const Button = ({ children, icon, disabled, secondary, ...props }) => {
  const className = [
    "tnic-button",
    secondary && "tnic-button--secondary",
    icon && "tnic-button--icon",
    disabled && "tnic-button--disabled",
  ].filter(Boolean);

  return (
    <button disabled={disabled} {...props} className={className.join(" ")}>
      {children}
    </button>
  );
};

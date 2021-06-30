import React from "react";
import PropTypes from "prop-types";
import { Button } from "./Button";
import { OptionType } from "../utils/propTypes";

export const Dropdown = ({
  icon: Icon,
  alignMenu,
  title,
  options,
  onChange,
  classNames,
}) => {
  const [open, setOpen] = React.useState(false);

  const classes = [
    "tnic-dropdown",
    open && "tnic-dropdown__active",
    `tnic-dropdown__${alignMenu}`,
    ...classNames,
  ].filter(Boolean);

  function listener() {
    setOpen(false);
  }

  React.useEffect(() => {
    if (open) {
      document.addEventListener("click", listener);
    }
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [open]);

  return (
    <div className={classes.join(" ")}>
      <Button
        onClick={(e) => {
          setOpen(!open);
        }}
        icon={!!Icon}
      >
        {Icon && <Icon />}
        {title}
      </Button>
      <i aria-hidden="true" className="dropdown icon"></i>
      <div className="tnic-dropdown--menu">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <div
              key={option.label}
              role="option"
              className="tnic-dropdown--item"
              onClick={() => onChange(option)}
            >
              {Icon && <Icon />}
              {option.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(OptionType),
  onChange: PropTypes.func,
  alignMenu: PropTypes.oneOf(["left", "right", "center"]),
};

Dropdown.defaultProps = {
  onChange: () => {},
  alignMenu: "center",
  options: [],
  classNames: [],
};

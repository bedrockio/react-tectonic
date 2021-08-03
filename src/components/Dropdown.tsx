import React, { ReactNode } from "react";
import { Button } from "./Button";

const defaultProps = {
  onChange: (option: OptionType) => {},
  alignMenu: "center",
  options: [],
  classNames: [],
};

type OptionType = {
  icon?: React.ElementType;
  value?: string;
  label: string;
};

type DropdownType = {
  icon?: React.ElementType;
  alignMenu?: "center" | "right" | "left";
  onChange?: (option: OptionType) => void;
  title?: ReactNode;
  classNames: string[];
  value?: any;
  options: OptionType[];
};

export const Dropdown = ({
  icon: Icon,
  alignMenu,
  title,
  value,
  options,
  onChange,
  classNames,
}: DropdownType & typeof defaultProps): JSX.Element => {
  const [open, setOpen] = React.useState(false);

  const classes = [
    "tnic-dropdown",
    open && "tnic-dropdown__active",
    `tnic-dropdown__${alignMenu}`,
    ...classNames,
  ].filter(Boolean);

  function listener() {
    setOpen(false);
    return false;
  }

  React.useEffect(() => {
    if (open) {
      document.addEventListener("click", listener);
    } else {
      document.removeEventListener("click", listener);
    }
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [open]);

  return (
    <div className={classes.join(" ")}>
      <Button
        basic
        onClick={(e) => {
          setOpen(!open);
        }}
        icon={!!Icon}
      >
        {Icon && <Icon />}
        {title}
      </Button>
      <div className="tnic-dropdown--menu">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <div
              key={option.label}
              role="option"
              className={[
                "tnic-dropdown--item",
                value === option.value && "tnic-dropdown__selected",
              ]
                .filter(Boolean)
                .join(" ")}
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

Dropdown.defaultProps = defaultProps;

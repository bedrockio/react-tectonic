import React from "react";
import PropTypes from "prop-types";
import { OptionType } from "../utils/propTypes";
import { Dropdown } from "../components/Dropdown";
import { IconMore } from "../components/Icons";

export const ChartContainer = ({
  children,
  height,
  title,
  variants,
  onVariant,
  intervals,
  onInterval,
  actions,
  onAction,
  classNames,
}) => {
  const classes = [
    "tnic-chartContainer",
    !title?.length && "tnic-chartContainer__no-title",
    classNames,
  ].filter(Boolean);

  return (
    <div style={{ height: `${height}px` }} className={classes.join(" ")}>
      <div className="tnic-chartContainer--container">
        <div className="tnic-chartContainer--title tnic-title">{title}</div>
        <div
          className="tnic-chartContainer--actions"
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 0,
          }}
        >
          {variants.length > 0 && (
            <Dropdown
              title="Variants"
              options={variants}
              onChange={onVariant}
            />
          )}
          {intervals.length > 0 && (
            <Dropdown
              title="Interval"
              options={intervals}
              onChange={onInterval}
            />
          )}
          {actions.length > 0 && (
            <Dropdown
              icon={IconMore}
              alignMenu="right"
              options={actions}
              onChange={onAction}
            />
          )}
        </div>
      </div>

      {children}
    </div>
  );
};

ChartContainer.propTypes = {
  actions: PropTypes.arrayOf(OptionType),
  variants: PropTypes.arrayOf(OptionType),
  intervals: PropTypes.arrayOf(OptionType),
  title: PropTypes.string,
  onInterval: PropTypes.func,
  onVariant: PropTypes.func,
  onAction: PropTypes.func,
  children: PropTypes.node.isRequired,
};

ChartContainer.defaultProps = {
  variants: [],
  actions: [],
  intervals: [],
  onInterval: () => {},
  onVariant: () => {},
  onAction: () => {},
};

import React from "react";
import PropTypes from "prop-types";
import { Calendar } from "./Calendar";

export const Overlay = ({ onChange, className }) => {
  const [inputs, setInputs] = React.useState({
    minutes: "15",
    hours: "3",
    days: "7",
  });

  const [option, setOption] = React.useState();

  return (
    <div className="tectonic-timerangepicker">
      <div className="column">
        <div className="tectonic-timerangepicker__header">
          <div>Select time range</div>
          <div>
            <button className="tectonic-button">Reset</button>
          </div>
        </div>
        <div className="options">
          <div className="option-item" onClick={() => setOption("minutes")}>
            <input
              type="text"
              value={inputs.minutes}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  minutes: e.target.value,
                })
              }
            />
            minutes
            <span className="help-text">Click to select or edit value</span>
          </div>
          <div className="option-item" onClick={() => setOption("hours")}>
            <input
              value={inputs.hours}
              type="text"
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  hours: e.target.value,
                })
              }
            />
            hours
            <span className="help-text">Click to select or edit value</span>
          </div>
          <div className="option-item" onClick={() => setOption("days")}>
            <input
              value={inputs.days}
              type="text"
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  days: e.target.value,
                })
              }
            />
            days
            <span className="help-text">Click to select or edit value</span>
          </div>
          <div>
            Enter Custom Range
            <span className="help-text">Click to select or edit value</span>
          </div>
        </div>
        <div className="footer">
          <button>Cancel</button>
          <button
            onClick={() => {
              onChange();
            }}
          >
            Apply
          </button>
        </div>
      </div>
      <div className="column">
        <Calendar />
      </div>
    </div>
  );
};

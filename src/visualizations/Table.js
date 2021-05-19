import React from "react";
import PropTypes from "prop-types";
import { numberWithCommas } from "../utils/formatting";
import { startCase } from "lodash";
import { Message, ChartContainer } from "../components";

export const Table = ({
  keyField,
  keyName,
  valueField,
  valueFieldName,
  data,
  keyFormatter,
  valueFieldFormatter,
  collapsing,
  labels = {},
}) => {
  const defaultKeyFormatter = (item) => {
    const key = keyField || "key";
    const label = item[key];
    if (label.length <= 3) {
      return label.toUpperCase();
    }
    return labels[key] || startCase(label.toLowerCase());
  };

  const noData = !data || !data.length;

  return (
    <ChartContainer height={400}>
      {noData && (
        <Message floating center>
          No data available for this time period
        </Message>
      )}

      <table
        width={"100%"}
        className="techonic table"
        celled
        collapsing={collapsing}
      >
        <thead>
          <tr>
            <th style={{ width: "62.5%" }}>{keyName || "Name"}</th>
            <th>{valueFieldName || "Value"}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.key}>
                <td>
                  {keyFormatter
                    ? keyFormatter(item)
                    : defaultKeyFormatter(item)}
                </td>
                <td>
                  {valueFieldFormatter
                    ? valueFieldFormatter(item[valueField || "value"])
                    : numberWithCommas(Math.round(item[valueField || "value"]))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </ChartContainer>
  );
};

Table.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  data: PropTypes.array,
};

Table.defaultProps = {
  data: [],
};

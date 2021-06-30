import React from "react";
import PropTypes from "prop-types";
import { numberWithCommas } from "../utils/formatting";
import { defaultActions } from "../utils/visualization";
import { startCase } from "lodash";
import {
  Message,
  ChartContainer as DefaultChartContainer,
} from "../components";

import { exportToCsv } from "../utils/exporters";

export const Table = ({
  status,
  title,
  keyField,
  keyName,
  valueField,
  valueFieldName,
  data,
  keyFormatter,
  valueFieldFormatter,
  chartContainer: ChartContainer,
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

  const _valueField = valueField || "value";

  const getKeyValue = keyFormatter ? keyFormatter : defaultKeyFormatter;

  function handleAction(option) {
    const action = option.value;
    if (action === "download-image") {
      // handleDownloadImage(svgChartRef.current);
    } else if (action === "export-data") {
      exportToCsv(
        [keyName || "Name", valueFieldName || "Value"],
        data.map((row) => [getKeyValue(row), row[_valueField]]),
        "export.csv"
      );
    }
  }

  return (
    <ChartContainer
      title={title}
      height={400}
      actions={defaultActions.filter((c) => c.value !== "download-image")}
      onAction={handleAction}
    >
      {status.success && noData && (
        <Message>No data available for this time period</Message>
      )}
      {status.loading && <Message>Loading...</Message>}
      {status.error && <Message error>{status.error.message}</Message>}

      <table width={"100%"} className="tnic-table">
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
                <td>{getKeyValue(item)}</td>
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
  status: PropTypes.object,
  title: PropTypes.string,
  /**
   * Is this the principal call to action on the page?
   */
  data: PropTypes.array,
  chartContainer: PropTypes.elementType,
};

Table.defaultProps = {
  status: { success: true },
  data: [],
  chartContainer: DefaultChartContainer,
};

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
import { IStatus } from "types";

const defaultProps = {
  exportFilename: "export.csv",
  status: { success: true },
  data: [],
  chartContainer: DefaultChartContainer,
  valueFieldName: "Value",
  labelFieldName: "Name",
  labelField: "key",
  valueField: "value",
  labelFormatter: (label) => {
    return startCase(label.toString().toLowerCase());
  },
  valueFormatter: (value) => {
    return numberWithCommas(value);
  },
  rowFormatter: (item, label, value) => {
    return (
      <>
        <td>{label}</td>
        <td>{value}</td>
      </>
    );
  },
  enabledControls: ["actions"],
};

type EnabledControlType = "actions";

type TableProps = {
  status?: IStatus;
  title?: JSX.Element;
  rowFormatter?: (item: any, label: string, value: string) => JSX.Element;
  labelFormatter?: (label: string) => string;
  valueFormatter?: (value: number) => string;
  valueField?: string;
  labelField?: string;
  valueFieldName?: string;
  labelFieldName?: string;
  data: any[];
  chartContainer?: React.ElementType;
  enabledControls?: EnabledControlType[];
  exportFilename?: string;
};

export const Table = ({
  status,
  title,
  labelField,
  valueField,
  valueFieldName,
  labelFieldName,
  data,
  labelFormatter,
  valueFormatter,
  rowFormatter,
  chartContainer: ChartContainer,
  enabledControls,
  exportFilename,
}: TableProps & typeof defaultProps): JSX.Element => {
  const noData = !data || !data.length;

  function handleAction(option) {
    const action = option.value;
    if (action === "download-image") {
      // handleDownloadImage(svgChartRef.current);
    } else if (action === "export-data") {
      exportToCsv(
        [valueFieldName, valueFieldName],
        data.map((row) => [row[labelField], row[valueField]]),
        exportFilename
      );
    }
  }

  return (
    <ChartContainer
      title={title}
      height={400}
      actions={defaultActions}
      onActionChange={handleAction}
      enabledControls={enabledControls}
    >
      {status.success && noData && (
        <Message>No data available for this time period</Message>
      )}
      {status.loading && <Message>Loading...</Message>}
      {status.error && <Message error>{status.error.message}</Message>}

      <table width={"100%"} className="tnic-table">
        <thead>
          <tr>
            <th style={{ width: "62.5%" }}>{labelFieldName}</th>
            <th>{valueFieldName}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item[labelField]}>
                {rowFormatter(
                  item,
                  labelFormatter(item[labelField]),
                  valueFormatter(item[valueField])
                )}
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
  /**
   * Is this the principal call to action on the page?
   */
  data: PropTypes.array,
  chartContainer: PropTypes.elementType,
  title: PropTypes.node,
  labelFormatter: PropTypes.func,
  valueFormatter: PropTypes.func,
  valueField: PropTypes.string,
  labelField: PropTypes.string,
  valueFieldName: PropTypes.string,
  labelFieldName: PropTypes.string,
  enabledControls: PropTypes.arrayOf(PropTypes.oneOf(["actions"])),
  exportFilename: PropTypes.string,
};

Table.defaultProps = defaultProps;

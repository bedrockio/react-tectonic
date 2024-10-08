import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import { getValueFormatter, getMinMaxRange } from "../utils/formatting";
import { getScrollbarWidth } from "../utils/dom";
import { defaultActions } from "../utils/visualization";
import { startCase, get } from "lodash-es";
import {
  Message,
  ChartContainer as DefaultChartContainer,
  TitleAlignType,
} from "../components";

import { exportToCsv } from "../utils/exporters";
import { IStatus } from "types";

type EnabledControlType = "actions";

type TableProps = {
  status?: IStatus;
  title?: ReactNode;
  height?: number;
  titleAlign?: TitleAlignType;
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

// turns out people modify the scrollbar
const scrollbarWidth = getScrollbarWidth();

export const Table = ({
  title,
  titleAlign,
  valueFormatter,
  chartContainer: ChartContainer = DefaultChartContainer,
  exportFilename = "export.csv",
  status = { success: true },
  data = [],
  valueFieldName = "Value",
  labelFieldName = "Name",
  labelField = "key",
  valueField = "value",
  height = 400,
  labelFormatter = (label) => {
    return startCase(label.toString().toLowerCase());
  },
  rowFormatter = (item, label, value) => {
    return (
      <>
        <td>{label}</td>
        <td>{value}</td>
      </>
    );
  },
  enabledControls = ["actions"],
}: TableProps): JSX.Element => {
  const noData = !data || !data.length;

  function handleAction(action: string) {
    if (action === "export-data") {
      exportToCsv(
        [valueFieldName, valueFieldName],
        data.map((row) => [get(row, labelField), row[valueField]]),
        exportFilename
      );
    }
  }

  const _valueFormatter =
    valueFormatter || getValueFormatter(getMinMaxRange(data, valueField));

  return (
    <ChartContainer
      title={title}
      titleAlign={titleAlign}
      height={height}
      actions={defaultActions}
      onActionChange={handleAction}
      enabledControls={enabledControls}
    >
      {status.success && noData && (
        <Message>No data available for this time period</Message>
      )}
      {status.loading && <Message>Loading...</Message>}
      {status.error && <Message error>{status.error.message}</Message>}

      <table className="tnic-table">
        <thead>
          <tr style={{ paddingRight: `${scrollbarWidth}px` }}>
            <th>{labelFieldName}</th>
            <th>{valueFieldName}</th>
          </tr>
        </thead>

        <tbody style={{ maxHeight: `${height - 80}px` }}>
          {data.map((item) => {
            return (
              <tr key={item[labelField]}>
                {rowFormatter(
                  item,
                  labelFormatter(get(item, labelField)),
                  _valueFormatter(get(item, valueField))
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

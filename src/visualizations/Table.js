import React from "react";
import PropTypes from "prop-types";
import { Message, Table as SemanticTable } from "semantic-ui-react";
import { numberWithCommas } from "../utils/formatting";
import { startCase } from "lodash";

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
  const noData = !data || !data.length;
  if (noData) {
    return (
      <Message
        style={{ textAlign: "center" }}
        content="No data available for this time period"
      />
    );
  }
  const defaultKeyFormatter = (item) => {
    const key = keyField || "key";
    const label = item[key];
    if (label.length <= 3) {
      return label.toUpperCase();
    }
    return labels[key] || startCase(label.toLowerCase());
  };

  return (
    <SemanticTable celled basic="very" collapsing={collapsing}>
      <SemanticTable.Header>
        <SemanticTable.Row>
          <SemanticTable.HeaderCell width={10}>
            {keyName || "Name"}
          </SemanticTable.HeaderCell>
          <SemanticTable.HeaderCell>
            {valueFieldName || "Value"}
          </SemanticTable.HeaderCell>
        </SemanticTable.Row>
      </SemanticTable.Header>
      <SemanticTable.Body>
        {data.map((item) => {
          return (
            <SemanticTable.Row key={item.key}>
              <SemanticTable.Cell>
                {keyFormatter ? keyFormatter(item) : defaultKeyFormatter(item)}
              </SemanticTable.Cell>
              <SemanticTable.Cell>
                {valueFieldFormatter
                  ? valueFieldFormatter(item[valueField || "value"])
                  : numberWithCommas(Math.round(item[valueField || "value"]))}
              </SemanticTable.Cell>
            </SemanticTable.Row>
          );
        })}
      </SemanticTable.Body>
    </SemanticTable>
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

import React from "react";
import { request } from "../utils/request";
import { Message, Dropdown } from "semantic-ui-react";

const validIntervals = ["1w", "1d", "1h", "15m", "5m", "1m"];

function intervalIsAllowed(from, to, interval) {
  const durationSeconds = (to - from) / 1000;
  const durationMinutes = durationSeconds / 60;
  const durationHours = durationMinutes / 60;
  if (interval === "1w" && durationHours < 7 * 24) {
    return false;
  }
  if (interval === "1d" && durationHours < 24) {
    return false;
  }
  if (interval === "1h" && durationMinutes < 60) {
    return false;
  }
  if (interval === "15m" && durationMinutes < 15) {
    return false;
  }
  if (interval === "15m" && durationHours > 24 * 4) {
    return false;
  }
  if (interval === "1h" && durationHours > 24 * 30) {
    return false;
  }
  if (interval === "5m" && durationHours > 24) {
    return false;
  }
  if (interval === "1m" && durationHours > 4) {
    return false;
  }
  return true;
}

function determineInterval(from, to) {
  const durationSeconds = (to - from) / 1000;
  const durationMinutes = durationSeconds / 60;
  const durationHours = durationMinutes / 60;
  if (durationHours > 6 * 30 * 24) {
    return "1w";
  }
  if (durationHours > 10 * 24) {
    return "1d";
  }
  if (durationHours > 6) {
    return "1h";
  }
  if (durationHours > 2) {
    return "15m";
  }
  if (durationMinutes > 60) {
    return "5m";
  }
  if (durationMinutes <= 60) {
    return "1m";
  }
  return "1d";
}

function formatInterval(interval) {
  if (interval === "1m") return "1 minute";
  return interval
    .replace(/m/, " minutes")
    .replace(/h/, " hour")
    .replace(/w/, " week")
    .replace(/d/, " day");
}

export default class TimeSelector extends React.Component {
  state = {
    data: null,
    loading: true,
    error: null,
  };
  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const { index, fields, filter = {} } = this.props;
    const body = {
      index,
      fields: ["occurredAt"],
      filter,
    };
    request({
      method: "POST",
      path: "/1/analytics/stats",
      body,
    })
      .then((data) => {
        const { occurredAt } = data;
        if (!occurredAt || !occurredAt.min || !occurredAt.max) {
          return this.setState({
            error: new Error("No data found"),
            loading: false,
          });
        }
        const { min, max } = occurredAt;
        const interval = determineInterval(min, max);
        this.setState({
          data,
          error: null,
          loading: false,
          interval,
          min,
          max,
        });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  }

  setInterval(interval) {
    this.setState({ interval });
  }

  render() {
    const { loading, error, data, min, max, interval } = this.state;
    if (error) return <Message error content={error.message} />;
    if (loading || !data) return <p>Loading...</p>;

    return (
      <Dropdown item text={`Resolution: ${formatInterval(interval)}`} simple>
        <Dropdown.Menu>
          {validIntervals.map((validInterval) => {
            return (
              <Dropdown.Item
                key={validInterval}
                content={formatInterval(validInterval)}
                active={interval === validInterval}
                disabled={!intervalIsAllowed(min, max, validInterval)}
                onClick={() => this.setInterval(validInterval)}
              />
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

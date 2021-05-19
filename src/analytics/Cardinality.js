import React from "react";
import { request } from "../utils/request";
import { Message } from "../components/Message";
import { hasDifferentParams } from "../utils/visualization";

export default class Cardinality extends React.Component {
  state = {
    data: null,
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    if (hasDifferentParams(prevProps, this.props)) {
      this.fetch(this.props);
    }
  }

  fetch() {
    const { index, fields, filter } = this.props;
    const body = {
      index,
      fields,
      filter,
    };
    request({
      method: "POST",
      path: "/1/analytics/cardinality",
      body,
    })
      .then((data) => {
        this.setState({ data, error: null, loading: false });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  }

  render() {
    const { loading, error, data } = this.state;
    if (loading) return <p>loading</p>;
    if (error) return <Message error content={error.message} />;
    return this.props.children(data);
  }
}

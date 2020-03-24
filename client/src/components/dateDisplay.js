import React from "react";
import styled from "styled-components";
import Rectangle from "react-rectangle";

export default class DateDisplay extends React.Component {
  render() {
    return (
      <Rectangle>
        <div
          style={{ background: this.props.strengthVal, height: 12, width: 12 }}
        />
      </Rectangle>
    );
  }
}

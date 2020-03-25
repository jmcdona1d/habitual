import React from "react";
import DateDisplay from "./dateDisplay";

export default class customGraphDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      strengthVal: 0
    };
    this.selectColourval = this.selectColourval.bind(this);
  }

  selectColourval(num) {
    switch (num) {
      case 0:
        return "#ebedf0";
      case 1:
        return "#c6e48b";
      case 2:
        return "#7bc96f";
      case 3:
        return "#239a3b";
      case 4:
        return "#196127";
    }
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            <DateDisplay strengthVal={this.selectColourval(0)} />
          </li>
          <li>
            <DateDisplay strengthVal={this.selectColourval(1)} />
          </li>
          <li>
            <DateDisplay strengthVal={this.selectColourval(2)} />
          </li>
        </ul>
      </div>
    );
  }
}

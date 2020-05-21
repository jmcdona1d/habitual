import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

export default class GraphDisplay extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      result: []
    }
    this.getAPITest()
  }

  getStartDate() {
    var d = new Date();
    //probably will modify to smaller increments of like 4 - 6 months? or grow as we go
    d.setFullYear(d.getFullYear() - 1);
    return d;
  }

  getAPITest(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    fetch("/entry", requestOptions)
    .then(response => response.text())
    .then(response => 
      {
      console.log(response)
      this.setState({result: response})}
    )
    .catch(error => console.log('error', error));

  }
  getData() {
    var data = [
      { date: "2020-01-04", count: 4 },
      { date: "2020-01-22", count: 1 },
      { date: "2020-01-30", count: 2 }
    ];
    return data;
  }

  render() {
    return (
      <div>
        <CalendarHeatmap
          startDate={this.getStartDate()}
          endDate={Date.now()}
          values={this.getData()}
          classForValue={value => {
            if (!value) {
              return "color-empty";
            }
            return `color-scale-${value.count}`;
          }}
        />
        <h1>A{this.state.result}</h1>
      </div>
    );
  }
}

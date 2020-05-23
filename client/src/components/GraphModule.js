import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

export default class GraphDisplay extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      dates: [],
      counts: []
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
        var b = Array.from(JSON.parse(response).values()).map(a => a.date)
        var c = Array.from(JSON.parse(response).values()).map(a => a.count)
        console.log(c,b)

      this.setState({dates:b, counts:c})}
    )
    .catch(error => console.log('error', error));

  }
  getData() {
    var data = [];
    for( var i = 0; i < this.state.dates.length; i++){
      data[i] = {date: this.state.dates[i], count: this.state.counts[i]}
    }
    console.log(data)
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

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
        var dates = Array.from(JSON.parse(response).values()).map(a => a.date)
        var counts = [];
        var datesNew = [];
        var size = 0;
        var same = 1;

        for( var i = 0; i < dates.length; i++){
          if(i < dates.length && dates[i] == dates[i+1]){
            i++;
            same++;
          }

          else{
            counts[size] = same;
            datesNew[size] = dates[i];
            size++;
            same = 1;
          }
        }

        console.log(datesNew, counts);

      this.setState({dates:datesNew, counts:counts})}
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
      </div>
    );
  }
}

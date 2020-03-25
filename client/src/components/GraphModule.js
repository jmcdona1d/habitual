import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

export default class GraphDisplay extends React.Component {
  render() {
    return (
      <CalendarHeatmap
        startDate={new Date("2020-01-01")}
        endDate={new Date("2020-12-01")}
        values={[
          { date: "2020-01-04", count: 4 },
          { date: "2020-01-22", count: 1 },
          { date: "2020-01-30", count: 2 }
          // ...and so on
        ]}
      />
    );
  }
}

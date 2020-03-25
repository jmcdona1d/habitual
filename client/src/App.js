import React from "react";
import logo from "./logo.svg";
import "./App.css";
import GraphDisplay from "./components/graphDisplay";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

function App() {
  return (
    <CalendarHeatmap
      startDate={new Date("2020-01-01")}
      endDate={new Date("2020-12-01")}
      values={[
        { date: "2016-01-01" },
        { date: "2016-01-22" },
        { date: "2016-01-30" }
        // ...and so on
      ]}
    />
  );
}

export default App;

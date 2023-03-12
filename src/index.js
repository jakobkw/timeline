import React from "react";
import { render } from "react-dom";

import "./index.css";

import Timeline from "./timeline";
import timelineItems from "./timelineItems";

const App = () => {
  if (!timelineItems || timelineItems.length < 1) {
    return <div>Please enter some dates in the timeline items.</div>;
  }

  return (
    <div>
      <Timeline data={timelineItems} />
    </div>
  );
};

render(<App />, document.getElementById("root"));

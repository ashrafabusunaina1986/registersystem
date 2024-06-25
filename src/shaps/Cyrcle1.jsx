import React from "react";
import "./Cyrcle.css";

function Cyrcle1() {
  return (
    <div className="cyrcle1">
      <div className="loader1">
        <div className="l"></div>
        <div className="div" style={{ "--i": 1 }}></div>
        <div className="div" style={{ "--i": 2 }}></div>
        <div className="div" style={{ "--i": 3 }}></div>
        <div className="div" style={{ "--i": 4 }}></div>
      </div>
    </div>
  );
}

export default Cyrcle1;

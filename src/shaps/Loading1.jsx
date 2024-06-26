import React from "react";
import "./loading1.css";

function Loading1() {
  return (
    <section>
      <div class="loader2">
        <span style={{ "--i": 1 }}></span>
        <span style={{ "--i": 2 }}></span>
        <span style={{ "--i": 3 }}></span>
        <span style={{ "--i": 4 }}></span>
      </div>
    </section>
  );
}

export default Loading1;

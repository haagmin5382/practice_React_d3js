import React, { useEffect } from "react";
import * as d3 from "d3";
import "./D3_Chaining.css";
const D3_Chaining = () => {
  useEffect(() => {
    // d3.select("body").append("p").text("Third paragraph.");
    // d3.select("div").insert("p").text("Second paragraph.");
    // d3.select("p").remove(); // 첫번째 p태그의 element만 지운다.
    // d3.select("p").html("<span>This is new inner html.</span>");
    // d3.select("p").attr("class", "error");
    // d3.select("input").property("checked", true);
    // d3.select("p").style("color", "red");
    d3.select("p").classed("error", true);
  }, []);

  return (
    <div>
      {/* <p>
        <input type="checkbox" id="a" />
        <label for="a">D3</label>
      </p>
      <p>
        <input type="checkbox" id="b" />
        <label for="b">C3</label>
      </p> */}
      <p>Error: This is dummy error.</p>
    </div>
  );
};

export default D3_Chaining;

// Select svg first
const svg = d3.select("svg");

// Get data and plot
d3.json("planets.json").then(data => plotCircles(data));

// plot circles
function plotCircles(data) {
  // map data to circles
  const circs = svg.selectAll("circle").data(data);

  // Update existing circles first
  circs
    .attr("cy", 200)
    .attr("cx", data => data.distance)
    .attr("r", data => data.radius)
    .attr("fill", data => data.fill);

  // Update virtual circles
  circs
    .enter()
    .append("circle")
    .attr("cy", 200)
    .attr("cx", data => data.distance)
    .attr("r", data => data.radius)
    .attr("fill", data => data.fill);
}

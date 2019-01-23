// Select svg container

const svg = d3.select("svg");

// grab data
d3.json("planets.json").then(data => {
  // map data
  const circs = svg.selectAll("circle").data(data);

  // add attr to circles already in DOM
  circs
    .attr("cy", 200)
    .attr("cx", d => d.distance)
    .attr("r", d => d.radius)
    .attr("fill", d => d.fill);

  // update enter selection
  circs
    .enter()
    .append("circle")
    .attr("cy", 200)
    .attr("cx", d => d.distance)
    .attr("r", d => d.radius)
    .attr("fill", d => d.fill);
});

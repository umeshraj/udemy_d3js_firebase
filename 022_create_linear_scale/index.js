// Select svg
const svg = d3.select("svg");

// get the data
d3.json("menu.json").then(data => {
  // setting up scales
  const y = d3
    .scaleLinear()
    .domain([0, 1000])
    .range([0, 500]);

  // join the data to a rect
  const rects = svg.selectAll("rect").data(data);

  // handle the existing rect
  rects
    .attr("width", 50)
    .attr("height", d => y(d.orders))
    .attr("fill", "orange")
    .attr("x", (d, i) => i * 70);

  // append the enter selection to dom
  rects
    .enter()
    .append("rect")
    .attr("width", 50)
    .attr("height", d => y(d.orders))
    .attr("fill", "orange")
    .attr("x", (d, i) => i * 70);
});

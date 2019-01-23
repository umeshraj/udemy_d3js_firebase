const data = [
  { width: 200, height: 100, fill: "purple" },
  { width: 100, height: 60, fill: "pink" },
  { width: 50, height: 30, fill: "red" }
];

const svg = d3.select("svg");

// Join data to rect (and make enter selections)
const rect = svg.selectAll("rect").data(data);

// update existing data: add attr to rects already in DOM
rect
  .attr("width", (d, i, n) => d.width)
  .attr("height", d => d.height)
  .attr("fill", d => d.fill);

// Append the enter selection to DOM
rect
  .enter()
  .append("rect")
  .attr("height", d => d.height)
  .attr("width", d => d.width)
  .attr("fill", d => d.fill);
console.log(rect);

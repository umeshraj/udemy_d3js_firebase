const data = [
  { width: 200, height: 100, fill: "purple" },
  { width: 100, height: 60, fill: "pink" },
  { width: 50, height: 30, fill: "red" }
];

const svg = d3.select("svg");

// First update elements in the DOM
const rect = svg
  .selectAll("rect")
  .data(data)
  .attr("width", (d, i, n) => d.width)
  .attr("height", d => d.height)
  .attr("fill", d => d.fill);

// Update elements that are not yet in the dom
rect
  .enter()
  .append("rect")
  .attr("height", d => d.height)
  .attr("width", d => d.width)
  .attr("fill", d => d.fill);
console.log(rect);

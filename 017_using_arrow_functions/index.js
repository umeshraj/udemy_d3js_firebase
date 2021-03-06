const data = [{ width: 200, height: 100, fill: "purple" }];

const svg = d3.select("svg");

const rect = svg
  .select("rect")
  .data(data)
  .attr("width", (d, i, n) => d.width)
  .attr("height", d => d.height)
  .attr("fill", d => d.fill);

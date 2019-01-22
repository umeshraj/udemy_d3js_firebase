const data = [{ width: 200, height: 100, fill: "purple" }];

const svg = d3.select("svg");

const rect = svg
  .select("rect")
  .data(data)
  .attr("width", (d, i, n) => {
    console.log(n[i]);
    return d.width;
  })
  .attr("height", d => {
    return d.height;
  })
  .attr("fill", d => {
    return d.fill;
  });

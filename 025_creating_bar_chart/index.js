// Select svg
const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);

// get the data
d3.json("menu.json").then(data => {
  // setting up scales
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.orders)])
    .range([0, 500]);

  const x = d3
    .scaleBand()
    .domain(data.map(item => item.name))
    .range([0, 500])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  // const min = d3.min(data, d => d.orders);
  // const max = d3.max(data, d => d.orders);
  // const extent = d3.extent(data, d => d.orders);
  // console.log(min);
  // console.log(max);
  // console.log(extent);

  // join the data to a rect
  const rects = svg.selectAll("rect").data(data);

  // handle the existing rect
  rects
    .attr("width", x.bandwidth)
    .attr("height", d => y(d.orders))
    .attr("fill", "orange")
    .attr("x", d => x(d.name));

  // append the enter selection to dom
  rects
    .enter()
    .append("rect")
    .attr("width", x.bandwidth)
    .attr("height", d => y(d.orders))
    .attr("fill", "orange")
    .attr("x", d => x(d.name));
});

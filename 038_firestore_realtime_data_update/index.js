// Select svg
const svgWidth = 600;
const svgHeight = 600;

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// create margins and dimension
const margin = {
  top: 20,
  right: 20,
  bottom: 100,
  left: 100
};

const graphWidth = svgWidth - margin.left - margin.right;
const graphHeight = svgHeight - margin.top - margin.bottom;

// create graph container
const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const xAxisGroup = graph
  .append("g")
  .attr("transform", `translate(0, ${graphHeight})`);
const yAxisGroup = graph.append("g");

// Scales
const y = d3.scaleLinear().range([graphHeight, 0]);

const x = d3
  .scaleBand()
  .range([0, graphWidth])
  .paddingInner(0.2)
  .paddingOuter(0.2);

// create the axes
const xAxis = d3.axisBottom(x);
const yAxis = d3
  .axisLeft(y)
  .ticks(3)
  .tickFormat(d => `${d} orders`);

// rotate x ticks
xAxisGroup
  .selectAll("text")
  .attr("transform", "rotate(-40)")
  .attr("text-anchor", "end")
  .attr("fill", "orange");

// update function
const update = data => {
  // update scale domains
  y.domain([0, d3.max(data, d => d.orders)]);
  x.domain(data.map(item => item.name));

  // join the data to a rect
  const rects = graph.selectAll("rect").data(data);

  // remove exit selection
  rects.exit().remove();

  // update current shapes in dom
  rects
    .attr("width", x.bandwidth)
    .attr("height", d => graphHeight - y(d.orders))
    .attr("fill", "orange")
    .attr("x", d => x(d.name))
    .attr("y", d => y(d.orders));

  // append the enter selection to dom
  rects
    .enter()
    .append("rect")
    .attr("width", x.bandwidth)
    .attr("height", d => graphHeight - y(d.orders))
    .attr("fill", "orange")
    .attr("x", d => x(d.name))
    .attr("y", d => y(d.orders));

  // draw/call the axes
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
};

// get the data
let data = [];
async function loadAndPlot() {
  const config = await d3.json("apiKeyFirebase.json");
  firebase.initializeApp(config);
  const db = firebase.firestore();

  db.collection("dishes").onSnapshot(res => {
    const docChanges = res.docChanges();
    docChanges.forEach(change => {
      console.log(change.doc.data());
    });

    update(data);
  });
}

// load data and plot it
loadAndPlot();

// data and firestore
let data = [];

const margin = { top: 40, right: 20, bottom: 50, left: 100 };
const svgWidth = 560;
const svgHeight = 400;
const graphWidth = svgWidth - margin.left - margin.right;
const graphHeight = svgHeight - margin.top - margin.bottom;

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("heigh", graphHeight)
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// set up the scales
const xScale = d3.scaleTime().range([0, graphWidth]);
const yScale = d3.scaleLinear().range([graphHeight, 0]);
// axes groups
const xAxisGroup = graph
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0, ${graphHeight})`);
const yAxisGroup = graph.append("g").attr("class", "y-axis");

const update = data => {
  // console.log(data);
  // set scale domains
  xScale.domain(d3.extent(data, d => new Date(d.date)));
  yScale.domain([0, d3.max(data, d => d.distance)]);

  // create circles for objects
  const circles = graph.selectAll("circle").data(data);

  // add new circles
  console.log(circles);
  circles
    .enter()
    .append("circle")
    .attr("r", 4)
    .attr("cx", d => xScale(new Date(d.date)))
    .attr("cy", d => yScale(d.distance))
    .attr("fill", "#ccc");

  // create the axes
  const xAxis = d3
    .axisBottom(xScale)
    .ticks(4)
    .tickFormat(d3.timeFormat("%b %d"));
  const yAxis = d3
    .axisLeft(yScale)
    .ticks(4)
    .tickFormat(d => d + "m");

  // place inside the axis groups
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  // rotate axes text
  xAxisGroup
    .selectAll("text")
    .attr("transform", "rotate(-40)")
    .attr("text-anchor", "end");
};

// realtime data setup
db.collection("activities").onSnapshot(res => {
  res.docChanges().forEach(change => {
    // console.log(change);
    const doc = { ...change.doc.data(), id: change.doc.id };

    switch (change.type) {
      case "added":
        data.push(doc);
        break;

      case "modified":
        const index = data.findIndex(item => item.id === doc.id);
        data[index] = doc;
        break;

      case "removed":
        data = data.filter(item => item.id !== doc.id);
        break;

      default:
        break;
    }
  });

  update(data);
});

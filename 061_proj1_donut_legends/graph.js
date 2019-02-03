// chart size
const dims = { height: 300, width: 300, radius: 150 };
const cent = { x: dims.width / 2 + 5, y: dims.height / 2 + 5 };

// svg with 150px for legend
const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", dims.width + 150)
  .attr("height", dims.height + 150);

// container for graph
const graph = svg
  .append("g")
  .attr("transform", `translate(${cent.x}, ${cent.y})`);

// pie generator
const pie = d3
  .pie()
  .sort(null)
  .value(d => d.cost);

// create arcs
const arcPath = d3
  .arc()
  .outerRadius(dims.radius)
  .innerRadius(dims.radius / 2);

// ordinal scale
const colorScale = d3.scaleOrdinal().range(d3["schemeSet3"]);

// legend setup
const legendGroup = svg
  .append("g")
  .attr("transform", `translate(${dims.width + 40}, 10)`);
const legend = d3
  .legendColor()
  .shape("circle")
  .shapePadding(10)
  .scale(colorScale);

// update function
const update = data => {
  // update colorScale domain
  colorScale.domain(data.map(item => item.name));

  // update legend
  legendGroup.call(legend);
  legendGroup.selectAll("text").attr("fill", "white");

  // console.log(data);
  // join enhanced (pie) data to path elements
  const paths = graph.selectAll("path").data(pie(data));

  // exit select: remove paths
  paths
    .exit()
    .transition()
    .duration(750)
    .attrTween("d", arcTweenExit)
    .remove();

  // update existing
  paths
    .attr("d", arcPath)
    .transition()
    .duration(750)
    .attrTween("d", arcTweenUpdate);

  paths
    .enter()
    .append("path")
    .attr("class", "arc")
    .attr("stroke", "white")
    .attr("stroke-width", 3)
    .attr("fill", d => colorScale([d.data.name]))
    .each(function(d) {
      this._current = d;
    })
    .transition()
    .duration(750)
    .attrTween("d", arcTweenEnter);
};

// data array and firestore
let data = [];
db.collection("expenses").onSnapshot(res => {
  res.docChanges().forEach(change => {
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
        console.log("removed");
        console.log(data);
        break;

      default:
        break;
    }
  });

  update(data);
});

const arcTweenEnter = d => {
  var i = d3.interpolate(d.endAngle, d.startAngle);

  return function(t) {
    d.startAngle = i(t);
    return arcPath(d);
  };
};

const arcTweenExit = d => {
  var i = d3.interpolate(d.startAngle, d.endAngle);

  return function(t) {
    d.startAngle = i(t);
    return arcPath(d);
  };
};

// using function key word to allow use of 'this'

function arcTweenUpdate(d) {
  // console.log(this._current, d);

  // interpolate between two objects
  const interpFn = d3.interpolate(this._current, d);

  // update the current property with new data after transition
  this._current = interpFn(1); // or 'd'

  return function(t) {
    return arcPath(interpFn(t));
  };
}

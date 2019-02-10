// graph setup
const dims = { height: 500, width: 1100 };

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", dims.width + 100)
  .attr("height", dims.height + 100);

const graph = svg.append("g").attr("transform", "translate(50, 50)");

// data stratification
const stratify = d3
  .stratify()
  .id(d => d.name)
  .parentId(d => d.parent);

const tree = d3.tree().size([dims.width, dims.height]);

// update function
const update = data => {
  // get updated rootnode data
  const rootNode = stratify(data);
  // console.log(rootNode);

  // creating tree
  const treeData = tree(rootNode);
  // console.log(treeData);

  // get node selection and join to elements/data
  const nodes = graph.selectAll(".node").data(treeData.descendants());

  // create enter node groups
  const enterNodes = nodes
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", d => {
      return `translate(${d.x}, ${d.y})`;
    });
};

// data and firebase hook-up
let data = [];

// realtime listener
db.collection("employees").onSnapshot(res => {
  res.docChanges().forEach(change => {
    const doc = { ...change.doc.data(), id: change.doc.id };

    switch (change.type) {
      case "added":
        data.push(doc);
        break;

      case "modified":
        const index = data.findIdex(item => item.id === doc.id);
        data[index] = doc;
        break;

      case "removed":
        data = data.filter(item => item.id !== doc.id);
        break;

      default:
        break;
    }
  });

  // console.log(data);
  update(data);
});

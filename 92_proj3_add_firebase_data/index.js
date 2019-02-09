const modal = document.querySelector(".modal");
M.Modal.init(modal);

// database initialize (config comes from import)
firebase.initializeApp(config);
const db = firebase.firestore();

// various elements
const form = document.querySelector("form");
const name = document.querySelector("#name");
const parent = document.querySelector("#parent");
const department = document.querySelector("#department");

form.addEventListener("submit", e => {
  e.preventDefault();

  // add item to database
  db.collection("employees").add({
    name: name.value,
    parent: parent.value,
    department: department.value
  });
});

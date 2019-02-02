// let db;
// // Initialize Firebase
// fetch("apiKeyFirebase.json")
//   .then(res => res.json())
//   .then(config => {
//     firebase.initializeApp(config);
//     db = firebase.firestore();
//     // console.log(db);
//   });

// note config comes from import
firebase.initializeApp(config);
const db = firebase.firestore();

// various handles
const form = document.querySelector("form");
const name = document.querySelector("#name");
const cost = document.querySelector("#cost");
const error = document.querySelector("#error");

// Add event listener for form submission
form.addEventListener("submit", e => {
  e.preventDefault();
  // validate inputs
  if (name.value && cost.value) {
    // create object to store in firestore
    const item = {
      name: name.value,
      cost: parseInt(cost.value)
    };

    // add to firestore
    db.collection("expenses")
      .add(item)
      .then(res => {
        // clear error message
        error.textContent = "";

        // clear input fields
        name.value = "";
        cost.value = "";
      });
  } else {
    // one of the fields is invalid
    error.textContent = "Please enter values before submitting";
  }
});

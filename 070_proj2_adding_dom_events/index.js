// DOM elements
const btns = document.querySelectorAll("button");
const form = document.querySelector("form");
const formAct = document.querySelector("form span");
const input = document.querySelector("input");
const error = document.querySelector(".error");

console.log(btns);
// event listeners for buttons
let activity = "cycling";
btns.forEach(btn => {
  btn.addEventListener("click", e => {
    // get activity
    activity = e.target.dataset.activity;

    // remove and add active class
    btns.forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");

    // set id of input field
    input.setAttribute("id", activity);

    // set text of form span
    formAct.textContent = activity;
  });
});

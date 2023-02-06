let popUp = () => {
  newPostFormEl.classList.remove("hidden");
};

let postBtnHandler = () => {
  newPostFormEl.classList.add("hidden");
  console.log(titleEl.value);
  console.log(descEl.value);
};

let createBtnEl = document.querySelector("#create-btn").addEventListener("click", popUp);
let postBtnEl = document.querySelector("#post-btn").addEventListener("click", postBtnHandler);
let newPostFormEl = document.querySelector("#new-post-form");
let titleEl = document.querySelector("#title");
let descEl = document.querySelector("#desc");

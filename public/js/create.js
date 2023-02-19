let popUp = () => {
  newPostFormEl.classList.remove("hidden");
};

let postBtnHandler = async () => {
  newPostFormEl.classList.add("hidden");
  const response = await fetch(`/dashboard/:id`, {
    method: "POST",
    body: JSON.stringify({ title: "whatever", body: "whatever" }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    console.log("It worked");
  } else {
    alert("It failed");
  }
};

let createBtnEl = document.querySelector("#create-btn").addEventListener("click", popUp);
let postBtnEl = document.querySelector("#post-btn").addEventListener("click", postBtnHandler);
let newPostFormEl = document.querySelector("#new-post-form");
let titleEl = document.querySelector("#title");
let descEl = document.querySelector("#desc");

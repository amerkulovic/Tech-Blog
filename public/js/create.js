let popUp = () => {
  newPostFormEl.classList.remove("hidden");
};

let postBtnHandler = async (event) => {
  newPostFormEl.classList.add("hidden");
  event.preventDefault();

  const title = document.querySelector("#title").value;
  const body = document.querySelector("#desc").value;

  newPostFormEl.classList.add("hidden");
  const response = await fetch(`/dashboard/`, {
    method: "POST",
    body: JSON.stringify({ title, body }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.reload();
  } else {
    alert("It failed");
  }
};

let createBtnEl = document.querySelector("#create-btn").addEventListener("click", popUp);
let postBtnEl = document.querySelector("#post-btn").addEventListener("click", postBtnHandler);
let newPostFormEl = document.querySelector("#new-post-form");

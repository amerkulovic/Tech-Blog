let revealCommentForm = async () => {
  commentFormEl.classList.remove("hidden");
  updateFormEl.classList.add("hidden");
};

let revealUpdateForm = () => {
  updateFormEl.classList.remove("hidden");
  commentFormEl.classList.add("hidden");
};

const newCommentHandler = async (event) => {
  event.preventDefault();

  let description = document.querySelector("#description").value.trim();
  console.log(description);

  if (description) {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/post/${id}`, {
      method: "POST",
      body: JSON.stringify({ description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert("Failed to create comment");
    }
  }
};

const updateFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#update-title").value.trim();
  const body = document.querySelector("#update-desc").value.trim();

  if (title && body) {
    const id = event.target.getAttribute("data-id");
    console.log(id);
    const response = await fetch(`/api/post/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, body }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to update post");
    }
  }
};

const delPostHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete job");
    }
  }
};

let deleteBtnEl = document.querySelector("#delete-btn").addEventListener("click", delPostHandler);
let updateBtnEl = document.querySelector("#update-btn").addEventListener("click", revealUpdateForm);
let updateFormEl = document.querySelector("#update-form");
let updateBtnPostEl = document.querySelector("#update-post-btn").addEventListener("click", updateFormHandler);
let commentFormEl = document.querySelector("#new-comment-form");
let commentBtnEl = document.querySelector("#comment-btn").addEventListener("click", revealCommentForm);
let postCommentEl = document.querySelector("#post-comment-btn").addEventListener("click", newCommentHandler);

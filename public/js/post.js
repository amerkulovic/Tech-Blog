let revealCommentForm = async () => {
  commentFormEl.classList.remove("hidden");
};

const newCommentHandler = async (event) => {
  event.preventDefault();

  let description = document.querySelector("#description").value.trim();

  if (description) {
    const response = await fetch(`/dashboard`, {
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
let commentFormEl = document.querySelector("#new-comment-form");
let commentBtnEl = document.querySelector("#comment-btn").addEventListener("click", revealCommentForm);
let postCommentEl = document.querySelector("#post-comment-btn").addEventListener("click", newCommentHandler);

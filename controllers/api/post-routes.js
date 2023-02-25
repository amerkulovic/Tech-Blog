const router = require("express").Router();
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const withAuth = require("../../utils/auth");
const { route } = require("../home-routes");

router.post("/", withAuth, async (req, res) => {
  console.log(req);
  try {
    const postData = await Post.create({
      title: req.body.title,
      body: req.body.body,
      user_id: req.session.userId,
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      description: req.body.description,
      user_id: req.session.userId,
      post_id: req.params.id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const newPost = await Post.update(
      {
        title: req.body.title,
        body: req.body.body,
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

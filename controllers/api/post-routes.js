const router = require("express").Router();
const Post = require("../../models/Post");
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

module.exports = router;

const router = require("express").Router();
const { User } = require("../models");
const Post = require("../models/Post");
const withAuth = require("./../utils/auth");

router.get("/", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    const postData = await Post.findAll({ include: [User] }).catch((err) => {
      res.json(err);
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("all", { posts, userId: req.session.userId, loggedIn: req.session.loggedIn });
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/logout", (req, res) => {
  req.session.loggedIn = false;

  res.render("login");
});

router.get("/dashboard/:id", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    const postData = await Post.findAll({ where: { user_id: req.params.id } }).catch((err) => {
      res.json(err);
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
  }
});

router.post("/dashboard", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
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
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  console.log(req);
  const postData = await Post.findAll({
    where: {
      user_id: req.session.userId,
    },
  });
  const posts = postData.map((post) => post.get({ plain: true }));
  res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
});

module.exports = router;

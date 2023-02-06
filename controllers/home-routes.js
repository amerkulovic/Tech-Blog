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
    console.log(posts);
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
  // if (!req.session.loggedIn) {
  //   res.redirect("/login");
  //   return;
  // }

  res.render("login");
});

router.get("/dashboard/:id", async (req, res) => {
  const postData = await Post.findAll({ where: { user_id: req.params.id } }).catch((err) => {
    res.json(err);
  });
  const posts = postData.map((post) => post.get({ plain: true }));
  res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
});

module.exports = router;

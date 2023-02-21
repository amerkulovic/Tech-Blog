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

router.get("/posts", withAuth, async (req, res) => {
  const postData = await Post.findAll({
    where: {
      user_id: req.session.userId,
    },
  });
  const posts = postData.map((post) => post.get({ plain: true }));
  res.render("post", { posts, loggedIn: req.session.loggedIn });
});

router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const post = postData.get({ plain: true });
    res.render("post", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.put("post/:id", async (req, res) => {
//   try {
//     const newPost = await Post.update(req.body, {
//       where: { user_id: req.params.id },
//     });
//     res.status(200).json(newPost);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.delete("post/:id", async (req, res) => {
//   try {
//     const postData = await Post.destroy({
//       where: {
//         user_id: req.params.id,
//       },
//     });

//     if (!postData) {
//       res.status(404).json({ message: "No post found with this id!" });
//       return;
//     }

//     res.status(200).json(postData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;

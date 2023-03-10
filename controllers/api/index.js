const router = require("express").Router();
const postRoutes = require("./post-routes.js");
const userRoutes = require("./user-routes");

router.use("/post", postRoutes);

router.use("/users", userRoutes);

module.exports = router;

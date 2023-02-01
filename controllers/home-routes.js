const router = require("express").Router();
// const Dish = require("../models/Dish");

router.get("/", async (req, res) => {
  res.render("all");
});

module.exports = router;

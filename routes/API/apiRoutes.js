const express = require("express");
const { getHatchwayPosts } = require("./hatchways");
const router = express.Router();
const cacheIt = require("../../middleware/cache");

router.get("/ping", (req, res) => {
  res.status(200).json({
    success: true,
  });
});

router.get("/posts", cacheIt(10), async (req, res) => {
  // Await result from Hatchway Blog Posts API
  try {
    let result = await getHatchwayPosts(req.query);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

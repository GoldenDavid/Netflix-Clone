const router = require("express").Router();
const List = require("../models/List");
const verifyToken = require("../middlewares/verifyToken");
const list = require("../routes/list");

//CREATE
router.post("/", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed");
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedList = await List.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed");
  }
});

//GET
router.get("/", verifyToken, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list;
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $match: { type: typeQuery, genre: genreQuery } },
          { $sample: { size: 2 } },
        ]);
      } else {
        list = await List.aggregate([
          { $match: { type: typeQuery } },
          { $sample: { size: 2 } },
        ]);
      }
    } else {
      list = await List.aggregate([
        {
          $sample: { size: 10 },
        },
      ]);
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(201).json("List has bee deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();

const Fighter = require("../models/fighters");

const getFighter = async (req, res, next) => {
  let fighter;
  try {
    fighter = await Fighter.findById(req.params.id);
    if (fighter === null) {
      return res.status(404).json({ message: "Fighter not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.fighter = fighter;
  next();
};

//GET ALL
router.get("/", async (req, res) => {
  try {
    const fighters = await Fighter.find();
    res.json(fighters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//GET ONE
router.get("/:id", getFighter, async (req, res) => {
  res.json(res.fighter);
});

//POST CREATE
router.post("/", async (req, res) => {
  const fighter = new Fighter({
    name: req.body.name,
    age: req.body.age,
    record: req.body.record,
    region: req.body.region,
    league: req.body.league,
  });
  try {
    const newFighter = await fighter.save();
    res.status(201).json(newFighter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// PATCH UPDATE
router.patch("/:id", getFighter, async (req, res) => {
  if (req.body.name != null) {
    res.fighter.name = req.body.name;
  }
  if (req.body.age != null) {
    res.fighter.age = req.body.age;
  }
  if (req.body.record != null) {
    res.fighter.record = req.body.record;
  }
  if (req.body.region != null) {
    res.fighter.region = req.body.region;
  }
  if (req.body.league != null) {
    res.fighter.league = req.body.league;
  }

  try {
    const updatedFighter = await res.fighter.save();
    res.json({
      message: "Fighter updated successfully",
      fighter: updatedFighter,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//DELETE
router.delete("/:id", getFighter, async (req, res) => {
  try {
    await res.fighter.deleteOne();
    res.json({ message: "Fighter Removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;

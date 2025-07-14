const Bug = require('../models/Bug');
const validateBug = require('../utils/validateBug');

exports.getBugs = async (req, res, next) => {
  try {
    const bugs = await Bug.find();
    res.json(bugs);
  } catch (error) {
    next(error);
  }
};

exports.createBug = async (req, res, next) => {
  try {
    validateBug(req.body);
    const bug = new Bug(req.body);
    const savedBug = await bug.save();
    res.status(201).json(savedBug);
  } catch (error) {
    next(error);
  }
};

exports.updateBug = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!bug) throw new Error('Bug not found');
    res.json(bug);
  } catch (error) {
    next(error);
  }
};

exports.deleteBug = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if (!bug) throw new Error('Bug not found');
    res.json({ message: 'Bug deleted' });
  } catch (error) {
    next(error);
  }
};
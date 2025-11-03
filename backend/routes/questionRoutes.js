import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

// Get all topics (must be before /:id route)
router.get('/topics/all', async (req, res) => {
  try {
    const topics = await Question.distinct('topics');
    res.status(200).json({
      success: true,
      data: topics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all questions with filters
router.get('/', async (req, res) => {
  try {
    const { difficulty, topic, search } = req.query;
    let filter = {};

    if (difficulty) {
      filter.difficulty = difficulty;
    }

    if (topic) {
      filter.topics = { $in: [topic] };
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const questions = await Question.find(filter).select('-solutionCode -testCases');
    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get question by ID
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    res.status(200).json({
      success: true,
      data: question
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Create a new question (admin only)
router.post('/', async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json({
      success: true,
      data: question
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

export default router;

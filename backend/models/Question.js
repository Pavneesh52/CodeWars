import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  topics: {
    type: [String],
    required: true
  },
  examples: [{
    input: String,
    output: String,
    explanation: String
  }],
  constraints: {
    type: String,
    required: true
  },
  starterCode: {
    type: String,
    required: true
  },
  solutionCode: {
    type: String,
    required: true
  },
  testCases: [{
    input: String,
    output: String
  }],
  acceptanceRate: {
    type: Number,
    default: 0
  },
  submissions: {
    type: Number,
    default: 0
  },
  // LeetCode integration fields (optional)
  leetcodeId: {
    type: Number,
    sparse: true
  },
  leetcodeSlug: {
    type: String,
    sparse: true
  },
  leetcodeUrl: {
    type: String,
    sparse: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Question', questionSchema);

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Question from '../models/Question.js';

// Topic mapping based on actual LeetCode question IDs from the API
// These are the real IDs returned by the LeetCode API for the first 50 problems
const topicMapping = {
  4109: ['Array', 'Greedy', 'Dynamic Programming'],
  4108: ['Array', 'Greedy'],
  4107: ['Array', 'Hash Table'],
  4106: ['String', 'Sorting'],
  4103: ['Database', 'SQL'],
  4101: ['Array', 'Math'],
  4091: ['Database', 'SQL'],
  4084: ['Math', 'Greedy'],
  4083: ['Array', 'Prefix Sum'],
  4081: ['Array', 'Simulation'],
  4080: ['Math', 'Number Theory'],
  4078: ['Array', 'Dynamic Programming'],
  4073: ['String', 'Sorting'],
  4070: ['Array', 'Hash Table'],
  4069: ['Math', 'Combinatorics'],
  4068: ['Array', 'Hash Table'],
  4066: ['Array', 'Hash Table'],
  4063: ['Array', 'Hash Table', 'Prefix Sum'],
  4060: ['Simulation'],
  4059: ['Design', 'Heap'],
  4058: ['Array', 'Math'],
  4056: ['String', 'Dynamic Programming'],
  4055: ['String', 'Dynamic Programming'],
  4053: ['String', 'Hash Table'],
  4052: ['String', 'Hash Table'],
  4051: ['String', 'Math'],
  4050: ['Array', 'Hash Table'],
  4049: ['Array', 'Hash Table'],
  4048: ['Array', 'Greedy'],
  4047: ['Array', 'Dynamic Programming'],
  4045: ['Array', 'Dynamic Programming'],
  4043: ['Array', 'Hash Table'],
  4042: ['Array', 'Greedy'],
  4041: ['Array', 'Dynamic Programming'],
  4039: ['Math', 'String'],
  4037: ['String', 'Greedy'],
  4036: ['Array', 'Prefix Sum'],
  4035: ['Array', 'Greedy'],
  4033: ['Array', 'Bit Manipulation'],
  4029: ['Array', 'Sorting'],
  4027: ['Array', 'Dynamic Programming'],
  4025: ['Database', 'SQL'],
  4023: ['Math', 'Bit Manipulation'],
  4021: ['String', 'Simulation'],
  4020: ['Array', 'Sorting'],
  4019: ['String', 'Stack'],
  4017: ['String', 'Hash Table'],
  4015: ['Array', 'Greedy'],
  4012: ['Array', 'Simulation'],
  4011: ['Array', 'Math'],
};

const getTopicsForQuestion = (questionId) => {
  return topicMapping[questionId] || ['Algorithm'];
};

const seedQuestions = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/codehub';
    console.log(`📡 Connecting to MongoDB: ${mongoUri}`);
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Fetch from LeetCode API
    console.log('🌐 Fetching questions from LeetCode API...');
    const response = await fetch('https://leetcode.com/api/problems/all/');
    
    if (!response.ok) {
      throw new Error(`LeetCode API error: ${response.status}`);
    }

    const leetcodeData = await response.json();
    console.log(`✅ Fetched ${leetcodeData.num_total} total problems from LeetCode`);

    // Get first 50 problems
    const problemsToFetch = leetcodeData.stat_status_pairs
      .slice(0, 50);

    console.log(`\n📝 Processing ${problemsToFetch.length} problems...`);
    
    const questions = [];
    
    for (let i = 0; i < problemsToFetch.length; i++) {
      const item = problemsToFetch[i];
      const stat = item.stat;
      const difficulty = ['Easy', 'Medium', 'Hard'][item.difficulty.level - 1];
      const questionId = stat.question_id;
      const topics = getTopicsForQuestion(questionId);

      // Show progress
      if ((i + 1) % 10 === 0) {
        console.log(`   ⏳ Processing ${i + 1}/${problemsToFetch.length}...`);
      }

      questions.push({
        title: stat.question__title,
        description: `LeetCode Problem #${questionId}: ${stat.question__title}`,
        difficulty: difficulty,
        topics: topics,
        examples: [
          {
            input: 'Example input',
            output: 'Example output',
            explanation: 'See LeetCode for details'
          }
        ],
        constraints: 'See LeetCode problem page for constraints',
        starterCode: `function solution() {
  // Write your solution here
  // Problem: ${stat.question__title}
}`,
        solutionCode: `// Solution for ${stat.question__title}
// Visit: https://leetcode.com/problems/${stat.question__slug}/
function solution() {
  // Check LeetCode for accepted solutions
}`,
        testCases: [
          {
            input: 'Test case 1',
            output: 'Expected output 1'
          }
        ],
        acceptanceRate: stat.total_acs ? (stat.total_acs / stat.total_submitted * 100).toFixed(1) : 0,
        submissions: stat.total_submitted || 0,
        leetcodeId: questionId,
        leetcodeSlug: stat.question__slug,
        leetcodeUrl: `https://leetcode.com/problems/${stat.question__slug}/`
      });
    }

    console.log(`\n📝 Transformed ${questions.length} questions`);

    // Clear existing questions
    console.log('🗑️  Clearing existing questions...');
    const deleteResult = await Question.deleteMany({});
    console.log(`✅ Cleared ${deleteResult.deletedCount} existing questions`);

    // Insert questions
    console.log(`📝 Inserting ${questions.length} questions from LeetCode...`);
    const result = await Question.insertMany(questions);
    console.log(`✅ Successfully seeded ${result.length} questions`);
    
    // Verify insertion
    const count = await Question.countDocuments();
    console.log(`📊 Total questions in database: ${count}`);

    // Get all unique topics
    const topics = await Question.distinct('topics');
    console.log(`\n📊 Total unique topics: ${topics.length}`);
    console.log('📋 Topics found:');
    topics.sort().forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic}`);
    });

    // Show difficulty breakdown
    const easyCount = await Question.countDocuments({ difficulty: 'Easy' });
    const mediumCount = await Question.countDocuments({ difficulty: 'Medium' });
    const hardCount = await Question.countDocuments({ difficulty: 'Hard' });
    console.log(`\n📈 Difficulty Breakdown:`);
    console.log(`   Easy: ${easyCount}`);
    console.log(`   Medium: ${mediumCount}`);
    console.log(`   Hard: ${hardCount}`);

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    console.log('\n🎉 Seeding completed successfully!');
    console.log(`\n📚 Questions are now available at: http://localhost:3001/api/questions`);
  } catch (error) {
    console.error('❌ Error seeding:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
};

seedQuestions();

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Question from '../models/Question.js';

const checkTopics = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/codehub';
    console.log(`📡 Connecting to MongoDB: ${mongoUri}`);
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Get all unique topics
    const topics = await Question.distinct('topics');
    console.log(`\n📊 Total unique topics: ${topics.length}`);
    console.log('\n📋 Topics found:');
    topics.sort().forEach((topic, index) => {
      console.log(`   ${index + 1}. ${topic}`);
    });

    // Get count of questions
    const count = await Question.countDocuments();
    console.log(`\n📈 Total questions in database: ${count}`);

    // Show difficulty breakdown
    const easyCount = await Question.countDocuments({ difficulty: 'Easy' });
    const mediumCount = await Question.countDocuments({ difficulty: 'Medium' });
    const hardCount = await Question.countDocuments({ difficulty: 'Hard' });
    console.log(`\n📊 Difficulty Breakdown:`);
    console.log(`   Easy: ${easyCount}`);
    console.log(`   Medium: ${mediumCount}`);
    console.log(`   Hard: ${hardCount}`);

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkTopics();

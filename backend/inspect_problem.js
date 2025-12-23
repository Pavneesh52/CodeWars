import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from './models/Problem.js';

dotenv.config();

const inspect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const problem = await Problem.findOne();
    console.log('Title:', problem.title);
    console.log('TestCases:', problem.testCases);
    console.log('Examples:', problem.examples);
    await mongoose.disconnect();
};

inspect();

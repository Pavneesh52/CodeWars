import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from './models/Problem.js';

dotenv.config();

const listTitles = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const problems = await Problem.find({}, 'title');
    console.log('Problem Titles:');
    problems.forEach(p => console.log(p.title));
    await mongoose.disconnect();
};

listTitles();

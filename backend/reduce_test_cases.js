import mongoose from 'mongoose';
import Problem from './models/Problem.js';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    }
};

const reduceTestCases = async () => {
    await connectDB();

    try {
        const problem = await Problem.findOne({ title: { $regex: 'Move All Zeroes', $options: 'i' } });

        if (problem) {
            console.log(`Found Problem: ${problem.title}`);
            console.log(`Current Test Cases: ${problem.testCases.length}`);

            // Keep only first 10 test cases
            problem.testCases = problem.testCases.slice(0, 10);
            await problem.save();

            console.log(`Reduced to: ${problem.testCases.length} test cases`);
            console.log('✅ Problem updated successfully');
        } else {
            console.log('Problem not found');
        }
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
    }
};

reduceTestCases();

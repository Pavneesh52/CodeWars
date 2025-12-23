import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from './models/Problem.js';

dotenv.config();

const updateProblem = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const problem = await Problem.findOne({ title: 'Find the Largest Element in an Array' });

    if (problem) {
        console.log('Updating problem:', problem.title);

        // Define correct test cases with outputs
        const newTestCases = [
            { input: '5\n1 2 3 4 5', output: '5' },
            { input: '3\n9 9 9', output: '9' },
            { input: '4\n-1 -2 -3 -4', output: '-1' },
            { input: '6\n5 4 3 2 1 0', output: '5' },
            { input: '1\n7', output: '7' },
            { input: '7\n10 20 30 40 50 60 70', output: '70' },
            { input: '5\n100 50 25 75 90', output: '100' },
            { input: '3\n0 0 0', output: '0' },
            { input: '4\n8 6 7 5', output: '8' },
            { input: '6\n9 8 7 10 2 3', output: '10' }
        ];

        problem.testCases = newTestCases;
        await problem.save();
        console.log('✅ Problem updated with structured test cases.');
    } else {
        console.log('❌ Problem not found.');
    }

    await mongoose.disconnect();
};

updateProblem();

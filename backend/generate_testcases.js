import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from './models/Problem.js';

dotenv.config();

const generateCases = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const problem = await Problem.findOne({ title: 'Find the Largest Element in an Array' });

    if (problem) {
        console.log(`Generating cases for: ${problem.title}`);

        const newCases = [];

        // Helper to solve the problem (Max Element)
        const solve = (arr) => Math.max(...arr);

        // Generate 10 random test cases
        for (let i = 0; i < 10; i++) {
            const size = Math.floor(Math.random() * 20) + 5; // Size 5-25
            const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 200) - 100); // Values -100 to 100

            const input = `${size}\n${arr.join(' ')}`;
            const output = solve(arr).toString();

            newCases.push({ input, output });
        }

        // Add to existing cases (don't overwrite examples if we want to keep them)
        // Actually, let's just replace with a mix of examples + new cases
        // But for now, let's just append or replace. The user said "more cases".
        // Let's keep the original examples and append these.

        // Check if we already have cases to avoid duplicates if run multiple times
        // For simplicity, we'll just add them.

        problem.testCases = [...problem.testCases, ...newCases];

        await problem.save();
        console.log(`✅ Added ${newCases.length} new test cases.`);
        console.log(`Total cases: ${problem.testCases.length}`);
    } else {
        console.log('❌ Problem not found');
    }

    await mongoose.disconnect();
};

generateCases();

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Problem from './models/Problem.js';

dotenv.config();

const PROBLEMS_FILE = '/Users/adityasingh/Desktop/DSA-codewars/problems.json';

const updateAllProblems = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        if (!fs.existsSync(PROBLEMS_FILE)) {
            console.error('❌ Problems file not found:', PROBLEMS_FILE);
            process.exit(1);
        }

        const content = fs.readFileSync(PROBLEMS_FILE, 'utf8');
        const problemsData = JSON.parse(content);
        console.log(`📂 Loaded ${problemsData.length} problems from JSON.`);

        let updatedCount = 0;
        let notFoundCount = 0;

        for (const pData of problemsData) {
            // Find problem by title (assuming titles are unique and match)
            const problem = await Problem.findOne({ title: pData.title });

            if (problem) {
                // Use examples as test cases
                // Ensure they have input and output
                const newTestCases = pData.examples.map(ex => ({
                    input: ex.input,
                    output: ex.output
                }));

                if (newTestCases.length > 0) {
                    problem.testCases = newTestCases;
                    await problem.save();
                    console.log(`   ✅ Updated: "${problem.title}" with ${newTestCases.length} test cases.`);
                    updatedCount++;
                } else {
                    console.log(`   ⚠️ No examples found for: "${problem.title}". Skipping.`);
                }
            } else {
                console.log(`   ❌ Problem not found in DB: "${pData.title}"`);
                notFoundCount++;
            }
        }

        console.log('\nSummary:');
        console.log(`   Updated: ${updatedCount}`);
        console.log(`   Not Found: ${notFoundCount}`);
        console.log(`   Total Processed: ${problemsData.length}`);

    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected');
    }
};

updateAllProblems();

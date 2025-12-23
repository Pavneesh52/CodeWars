import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from './models/Problem.js';

dotenv.config();

const inspectAll = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const problems = await Problem.find({});

    console.log(`Found ${problems.length} problems.`);

    problems.forEach(p => {
        console.log(`\nProblem: ${p.title}`);
        if (p.testCases && p.testCases.length > 0) {
            const firstTC = p.testCases[0];
            console.log(`   Format: ${typeof firstTC}`);
            if (typeof firstTC === 'object') {
                console.log(`   Has Output? ${firstTC.output ? 'YES' : 'NO'}`);
                console.log(`   Sample: Input="${firstTC.input?.substring(0, 20)}...", Output="${firstTC.output}"`);
            } else {
                console.log(`   Sample: "${firstTC.substring(0, 20)}..."`);
            }
        } else {
            console.log('   No test cases found.');
        }
    });

    await mongoose.disconnect();
};

inspectAll();

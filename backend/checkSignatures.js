// Script to check what function signatures are in the database
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Problem from './models/Problem.js';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected\n');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

async function checkSignatures() {
    await connectDB();

    try {
        const problems = await Problem.find({}).limit(10);

        console.log('📋 First 10 problems in database:\n');

        problems.forEach((problem, index) => {
            console.log(`${index + 1}. "${problem.title}"`);
            console.log(`   Signature: ${problem.functionSignature?.methodName || 'NONE'}(${(problem.functionSignature?.parameters || []).map(p => p.name).join(', ')})`);
            console.log(`   Return: ${problem.functionSignature?.returnType || 'NONE'}`);
            console.log('');
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

checkSignatures();

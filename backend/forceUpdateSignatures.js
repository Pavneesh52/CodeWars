// Force update all problems with proper signatures
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Problem from './models/Problem.js';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

// Auto-generate signatures based on problem title
const generateSignatureFromTitle = (title) => {
    const titleLower = title.toLowerCase();

    // Convert title to method name (camelCase)
    const methodName = title
        .replace(/[^a-zA-Z0-9\s]/g, '')  // Remove special chars
        .split(' ')
        .filter(word => word.length > 0)
        .map((word, index) => {
            if (index === 0) return word.toLowerCase();
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join('');

    // Determine parameters based on problem type
    let parameters = [{ name: 'arr', type: 'array<int>' }]; // default
    let returnType = 'int';

    // Array problems
    if (titleLower.includes('array') || titleLower.includes('element')) {
        parameters = [{ name: 'arr', type: 'array<int>' }];
    }

    // Check/validation problems (return bool)
    if (titleLower.includes('check') || titleLower.includes('is ') || titleLower.includes('valid')) {
        returnType = 'bool';
    }

    // Count problems
    if (titleLower.includes('count') || titleLower.includes('frequency')) {
        returnType = 'int';
    }

    // Find problems
    if (titleLower.includes('find')) {
        if (titleLower.includes('all') || titleLower.includes('pairs')) {
            returnType = 'array<int>';
        } else {
            returnType = 'int';
        }
    }

    // Two Sum special case
    if (titleLower.includes('two sum')) {
        parameters = [
            { name: 'nums', type: 'array<int>' },
            { name: 'target', type: 'int' }
        ];
        returnType = 'bool';
    }

    return {
        methodName: methodName || 'solution',
        parameters,
        returnType
    };
};

async function forceUpdateSignatures() {
    await connectDB();

    try {
        console.log('🔄 Force updating all problem signatures...\n');

        const problems = await Problem.find({});
        let updated = 0;

        for (const problem of problems) {
            const newSignature = generateSignatureFromTitle(problem.title);

            problem.functionSignature = newSignature;
            await problem.save();

            console.log(`✅ "${problem.title}"`);
            console.log(`   → ${newSignature.methodName}(${newSignature.parameters.map(p => p.name).join(', ')}) : ${newSignature.returnType}\n`);

            updated++;
        }

        console.log(`\n📊 Update Complete:`);
        console.log(`   ✅ Updated: ${updated} problems`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

forceUpdateSignatures();

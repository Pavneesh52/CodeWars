// Migration script to add function signatures to existing problems
// Run this once to update all problems in your database

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

// Function signature templates for common problems
const problemSignatures = {
    'Two Sum': {
        methodName: 'twoSum',
        parameters: [
            { name: 'nums', type: 'array<int>' },
            { name: 'target', type: 'int' }
        ],
        returnType: 'array<int>'
    },
    'Palindrome Number': {
        methodName: 'isPalindrome',
        parameters: [
            { name: 'x', type: 'int' }
        ],
        returnType: 'bool'
    },
    'Reverse Integer': {
        methodName: 'reverse',
        parameters: [
            { name: 'x', type: 'int' }
        ],
        returnType: 'int'
    },
    'Roman to Integer': {
        methodName: 'romanToInt',
        parameters: [
            { name: 's', type: 'string' }
        ],
        returnType: 'int'
    },
    'Longest Common Prefix': {
        methodName: 'longestCommonPrefix',
        parameters: [
            { name: 'strs', type: 'array<string>' }
        ],
        returnType: 'string'
    },
    'Valid Parentheses': {
        methodName: 'isValid',
        parameters: [
            { name: 's', type: 'string' }
        ],
        returnType: 'bool'
    },
    'Merge Two Sorted Lists': {
        methodName: 'mergeTwoLists',
        parameters: [
            { name: 'list1', type: 'ListNode*' },
            { name: 'list2', type: 'ListNode*' }
        ],
        returnType: 'ListNode*'
    },
    'Remove Duplicates from Sorted Array': {
        methodName: 'removeDuplicates',
        parameters: [
            { name: 'nums', type: 'array<int>' }
        ],
        returnType: 'int'
    },
    'Search Insert Position': {
        methodName: 'searchInsert',
        parameters: [
            { name: 'nums', type: 'array<int>' },
            { name: 'target', type: 'int' }
        ],
        returnType: 'int'
    },
    'Maximum Subarray': {
        methodName: 'maxSubArray',
        parameters: [
            { name: 'nums', type: 'array<int>' }
        ],
        returnType: 'int'
    }
};

async function migrateProblems() {
    await connectDB();

    try {
        console.log('🔄 Starting migration...\n');

        const problems = await Problem.find({});
        console.log(`Found ${problems.length} problems in database\n`);

        let updated = 0;
        let skipped = 0;

        for (const problem of problems) {
            // Skip if already has function signature
            if (problem.functionSignature && problem.functionSignature.methodName) {
                console.log(`⏭️  Skipping "${problem.title}" - already has signature`);
                skipped++;
                continue;
            }

            // Try to find matching signature
            const signature = problemSignatures[problem.title];

            if (signature) {
                problem.functionSignature = signature;
                await problem.save();
                console.log(`✅ Updated "${problem.title}" with signature: ${signature.methodName}`);
                updated++;
            } else {
                // Set default signature for unknown problems
                problem.functionSignature = {
                    methodName: 'solution',
                    parameters: [{ name: 'arr', type: 'array<int>' }],
                    returnType: 'int'
                };
                await problem.save();
                console.log(`⚠️  "${problem.title}" - Added default signature (please update manually)`);
                updated++;
            }
        }

        console.log(`\n📊 Migration Complete:`);
        console.log(`   ✅ Updated: ${updated}`);
        console.log(`   ⏭️  Skipped: ${skipped}`);
        console.log(`   📝 Total: ${problems.length}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Migration error:', error);
        process.exit(1);
    }
}

migrateProblems();

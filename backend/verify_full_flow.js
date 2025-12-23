import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import BattleResult from './models/BattleResult.js';
import Problem from './models/Problem.js';
import UserSolved from './models/UserSolved.js';

dotenv.config();

const verifyFlow = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        const testEmail = 'flowtest_' + Date.now() + '@example.com';

        // 1. Create User
        console.log('\n1. Creating Test User...');
        const user = await User.create({
            name: 'Flow Test User',
            email: testEmail,
            password: 'password123',
            username: 'flowtest'
        });
        console.log(`   User created: ${user._id} (${user.email})`);

        // 2. Create/Find Problem
        console.log('\n2. Getting a Problem...');
        let problem = await Problem.findOne();
        if (!problem) {
            problem = await Problem.create({
                title: 'Test Problem',
                description: 'Test Desc',
                difficulty: 'Easy',
                testCases: []
            });
        }
        console.log(`   Problem ID: ${problem._id}`);

        // 3. Simulate Submission (Update User & UserSolved)
        console.log('\n3. Simulating Submission...');
        // Manually calling the method we use in codeRoutes/submissionRoutes
        await user.recordSubmission(
            problem._id,
            'Accepted',
            'Easy',
            'javascript',
            100,
            'console.log("hello")',
            problem.title,
            problem.topic || 'General'
        );
        console.log('   Submission recorded.');

        // Verify User Stats
        const updatedUser = await User.findById(user._id);
        console.log(`   User Stats: Total Solved = ${updatedUser.totalProblemsSolved} (Expected: 1)`);

        // Verify UserSolved
        const userSolved = await UserSolved.findOne({ userId: user._id, problemId: problem._id });
        console.log(`   UserSolved Entry: ${userSolved ? 'Found' : 'Missing'} (Expected: Found)`);

        // 4. Simulate Battle Result
        console.log('\n4. Simulating Battle Result...');
        const battle = await BattleResult.create({
            roomId: new mongoose.Types.ObjectId(), // Dummy room ID
            question: problem._id,
            winner: user._id,
            participants: [user._id],
            scores: [{ user: user._id, passedTests: 5, totalTests: 5 }],
            duration: 120,
            endedAt: new Date()
        });
        console.log(`   BattleResult created: ${battle._id}`);

        // 5. Fetch Stats (Simulating API)
        console.log('\n5. Verifying Data Retrieval...');

        // Check Battle History retrieval
        const battles = await BattleResult.find({ participants: user._id });
        console.log(`   Battles Found: ${battles.length} (Expected: 1)`);
        if (battles.length > 0) {
            console.log(`   Battle Score Saved: ${battles[0].scores[0].passedTests} (Expected: 5)`);
        }

        // Cleanup
        console.log('\nCleaning up test data...');
        await User.deleteOne({ _id: user._id });
        await UserSolved.deleteMany({ userId: user._id });
        await BattleResult.deleteOne({ _id: battle._id });
        if (problem.title === 'Test Problem') await Problem.deleteOne({ _id: problem._id });
        console.log('✅ Verification Complete.');

    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        mongoose.disconnect();
    }
};

verifyFlow();

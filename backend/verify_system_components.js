import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Room from './models/Room.js';
import Problem from './models/Problem.js';

dotenv.config();

const verifySystem = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        // 1. Verify Leaderboard Logic
        console.log('\n1. Verifying Leaderboard...');
        const topUsers = await User.find({})
            .sort({ totalProblemsSolved: -1 })
            .limit(5)
            .select('name totalProblemsSolved');

        console.log(`   Fetched ${topUsers.length} users for leaderboard.`);
        topUsers.forEach((u, i) => {
            console.log(`   #${i + 1}: ${u.name} - ${u.totalProblemsSolved} solved`);
        });
        if (topUsers.length > 0 && topUsers[0].totalProblemsSolved >= topUsers[topUsers.length - 1].totalProblemsSolved) {
            console.log('   ✅ Leaderboard sorting is correct.');
        } else if (topUsers.length > 1) {
            console.log('   ❌ Leaderboard sorting might be incorrect.');
        }

        // 2. Verify Problems
        console.log('\n2. Verifying Problems...');
        const problems = await Problem.find({}).limit(3);
        console.log(`   Fetched ${problems.length} problems.`);
        if (problems.length > 0) {
            console.log(`   Sample: ${problems[0].title} (${problems[0].difficulty})`);
            console.log('   ✅ Problems are accessible.');
        } else {
            console.log('   ⚠️ No problems found in DB.');
        }

        // 3. Verify Active Battles (Room Creation)
        console.log('\n3. Verifying Active Battles...');
        const testRoomCode = 'TEST_' + Math.floor(Math.random() * 1000);

        // Create a dummy room
        const room = await Room.create({
            roomId: testRoomCode,
            roomCode: testRoomCode,
            host: topUsers[0]?._id || new mongoose.Types.ObjectId(),
            participants: [],
            isActive: true,
            question: problems[0]?._id
        });
        console.log(`   Created Test Room: ${room.roomCode}`);

        // Fetch Active Rooms
        const activeRooms = await Room.find({ isActive: true });
        const foundRoom = activeRooms.find(r => r.roomCode === testRoomCode);

        if (foundRoom) {
            console.log(`   ✅ Newly created room found in Active Battles list.`);
        } else {
            console.log(`   ❌ Newly created room NOT found in Active Battles list.`);
        }

        // Cleanup
        console.log('\nCleaning up test data...');
        await Room.deleteOne({ _id: room._id });
        console.log('✅ System Verification Complete.');

    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        mongoose.disconnect();
    }
};

verifySystem();

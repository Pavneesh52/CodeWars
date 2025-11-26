import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Define Schemas (simplified)
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    totalProblemsSolved: Number,
    easySolved: Number,
    mediumSolved: Number,
    hardSolved: Number
});

const userSolvedSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    title: String,
    difficulty: String,
    solvedAt: Date
}, { collection: 'user-solved' });

const User = mongoose.model('User', userSchema);
const UserSolved = mongoose.model('UserSolved', userSolvedSchema);

const debug = async () => {
    await connectDB();

    console.log('\n--- USERS ---');
    const users = await User.find({});
    users.forEach(u => {
        console.log(`ID: ${u._id}, Name: ${u.name}, Email: ${u.email}`);
        console.log(`   Stats: Total=${u.totalProblemsSolved}, Easy=${u.easySolved}, Medium=${u.mediumSolved}, Hard=${u.hardSolved}`);
    });

    console.log('\n--- USER SOLVED ---');
    const solved = await UserSolved.find({});
    solved.forEach(s => {
        console.log(`User ID: ${s.userId}, Problem: ${s.title}, Diff: ${s.difficulty}`);
    });

    console.log('\n--- MATCH CHECK ---');
    for (const u of users) {
        const count = await UserSolved.countDocuments({ userId: u._id });
        console.log(`User ${u.name} (${u._id}) has ${count} entries in UserSolved collection.`);
    }

    process.exit();
};

debug();

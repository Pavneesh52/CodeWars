import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const migrateScores = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const users = await User.find({});
        console.log(`Found ${users.length} users to migrate.`);

        for (const user of users) {
            const easy = user.easySolved || 0;
            const medium = user.mediumSolved || 0;
            const hard = user.hardSolved || 0;

            const score = (easy * 10) + (medium * 30) + (hard * 50);

            user.score = score;
            await user.save();
            console.log(`Updated user ${user.name}: Score = ${score}`);
        }

        console.log('Migration completed successfully.');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await mongoose.disconnect();
    }
};

migrateScores();

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Submission from './models/Submission.js';
import Room from './models/Room.js';
import User from './models/User.js';

dotenv.config();

const verifyIndexes = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Force index creation (Mongoose usually does this on startup, but we want to be sure)
        await Submission.ensureIndexes();
        await Room.ensureIndexes();
        await User.ensureIndexes();

        const submissionIndexes = await Submission.collection.indexes();
        const roomIndexes = await Room.collection.indexes();
        const userIndexes = await User.collection.indexes();

        console.log('\n--- Submission Indexes ---');
        console.log(submissionIndexes);

        console.log('\n--- Room Indexes ---');
        console.log(roomIndexes);

        console.log('\n--- User Indexes ---');
        console.log(userIndexes);

    } catch (error) {
        console.error('Verification failed:', error);
    } finally {
        await mongoose.disconnect();
    }
};

verifyIndexes();

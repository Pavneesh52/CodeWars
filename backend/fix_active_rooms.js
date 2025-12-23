import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from './models/Room.js';

dotenv.config();

const fixRooms = async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    const rooms = await Room.find({ status: 'coding', startedAt: { $exists: false } });

    console.log(`Found ${rooms.length} broken rooms.`);

    for (const room of rooms) {
        console.log(`Fixing room: ${room.roomCode}`);
        // Set startedAt to updatedAt or createdAt
        room.startedAt = room.updatedAt || room.createdAt || new Date();
        await room.save();
        console.log(`   Set startedAt to: ${room.startedAt}`);
    }

    await mongoose.disconnect();
};

fixRooms();

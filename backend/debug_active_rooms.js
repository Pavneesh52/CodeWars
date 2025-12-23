import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from './models/Room.js';

dotenv.config();

const debugRooms = async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    const rooms = await Room.find({ isActive: true });

    console.log(`Found ${rooms.length} active rooms.`);

    rooms.forEach(room => {
        console.log('------------------------------------------------');
        console.log(`Room: ${room.roomCode}`);
        console.log(`Status: ${room.status}`);
        console.log(`StartedAt: ${room.startedAt}`);

        if (room.status === 'coding' && room.startedAt) {
            const startTime = new Date(room.startedAt).getTime();
            const now = Date.now();
            const elapsedMs = now - startTime;
            const durationMs = 45 * 60 * 1000;
            const remainingMs = Math.max(0, durationMs - elapsedMs);

            const minutes = Math.floor(remainingMs / 60000);
            const seconds = Math.floor((remainingMs % 60000) / 1000);
            const timeLeft = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            console.log(`Now: ${new Date().toISOString()}`);
            console.log(`Elapsed: ${elapsedMs / 1000}s`);
            console.log(`Calculated TimeLeft: ${timeLeft}`);
        } else {
            console.log('TimeLeft: Waiting... (or not started)');
        }
    });

    await mongoose.disconnect();
};

debugRooms();

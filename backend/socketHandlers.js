import { Server } from 'socket.io';

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join a room
    socket.on('join_room', (roomCode) => {
      socket.join(roomCode);
      console.log(`User ${socket.id} joined room: ${roomCode}`);
      // Notify others in the room
      socket.to(roomCode).emit('user_joined', { userId: socket.id });
    });

    // Leave a room
    socket.on('leave_room', (roomCode) => {
      socket.leave(roomCode);
      console.log(`User ${socket.id} left room: ${roomCode}`);
      socket.to(roomCode).emit('user_left', { userId: socket.id });
    });

    // Start battle (Host only)
    socket.on('start_battle', ({ roomCode, questionId }) => {
      console.log(`Battle started in room ${roomCode} for question ${questionId}`);
      io.to(roomCode).emit('battle_started', { questionId });
    });

    // Code submission result
    socket.on('submission_result', ({ roomCode, user, status, passedTests, totalTests }) => {
      console.log(`Submission in ${roomCode} by ${user.name}: ${status}`);
      io.to(roomCode).emit('opponent_progress', {
        user,
        status,
        passedTests,
        totalTests
      });

      if (status === 'SUCCESS') {
        io.to(roomCode).emit('game_over', { winner: user });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};

import express from 'express';
import Room from '../models/Room.js';
import Problem from '../models/Problem.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Create a new room
// @route   POST /api/rooms
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { questionId } = req.body;

    if (!questionId) {
      return res.status(400).json({ success: false, message: 'Question ID is required' });
    }

    // Verify the problem exists
    const problem = await Problem.findById(questionId);
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }

    // Create new room
    const roomCode = await Room.generateRoomCode();
    const room = new Room({
      roomCode,
      question: questionId,
      host: req.user._id,
      participants: [{
        user: req.user._id
      }]
    });

    await room.save();

    // Populate question and host details
    await room.populate('question');
    await room.populate('host', 'name email avatar');
    await room.populate('participants.user', 'name email avatar');

    res.status(201).json({
      success: true,
      data: room
    });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get all active public rooms
// @route   GET /api/rooms/active
// @access  Private
router.get('/active', protect, async (req, res) => {
  try {
    const rooms = await Room.find({
      isActive: true,
      status: { $in: ['waiting', 'coding'] } // Fetch both waiting and ongoing battles
    })
      .populate('question', 'title difficulty topic')
      .populate('host', 'name avatar')
      .populate('participants.user', 'name avatar')
      .sort({ createdAt: -1 });

    // Transform data for frontend
    const formattedRooms = rooms.map(room => ({
      id: room._id,
      roomCode: room.roomCode,
      title: room.question?.title || 'Unknown Problem',
      difficulty: room.question?.difficulty || 'Medium',
      language: room.language || 'JavaScript', // Assuming language is stored or defaulted
      participants: room.participants.length,
      maxParticipants: 10, // Hardcoded for now, or add to Room model
      timeLeft: '00:00', // TODO: Calculate based on start time
      status: room.status, // 'waiting' or 'coding'
      prize: '500 XP', // Placeholder
      participantsList: room.participants.map(p => ({
        id: p.user._id,
        name: p.user.name,
        avatar: p.user.avatar,
        score: 0, // Placeholder
        rank: 0, // Placeholder
        status: 'idle' // Placeholder
      }))
    }));

    res.status(200).json({
      success: true,
      data: formattedRooms
    });
  } catch (error) {
    console.error('Error fetching active rooms:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get user's active rooms
// @route   GET /api/rooms/user/active
// @access  Private
router.get('/user/active', protect, async (req, res) => {
  try {
    const rooms = await Room.find({
      $or: [
        { host: req.user._id },
        { 'participants.user': req.user._id }
      ],
      isActive: true
    })
      .populate('question')
      .populate('host', 'name email avatar')
      .populate('participants.user', 'name email avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: rooms
    });
  } catch (error) {
    console.error('Error fetching user rooms:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// IMPORTANT: All specific routes with suffixes MUST come before the generic /:code route
// Otherwise the generic route will match first and treat the suffix as a room code

// @desc    Start coding session (host only)
// @route   PUT /api/rooms/:code/start
// @access  Private
router.put('/:code/start', protect, async (req, res) => {
  try {
    const room = await Room.findOne({ roomCode: req.params.code });

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    // Check if user is the host
    if (room.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Only the host can start coding' });
    }

    // Update room status to coding
    room.status = 'coding';
    await room.save();

    // Populate and return updated room
    await room.populate('question');
    await room.populate('host', 'name email avatar');
    await room.populate('participants.user', 'name email avatar');

    res.status(200).json({
      success: true,
      data: room,
      message: 'Coding session started'
    });
  } catch (error) {
    console.error('Error starting coding session:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Leave a room
// @route   PUT /api/rooms/:code/leave
// @access  Private
router.put('/:code/leave', protect, async (req, res) => {
  try {
    const room = await Room.findOne({ roomCode: req.params.code });

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    // Remove user from participants
    room.participants = room.participants.filter(p => p.user.toString() !== req.user._id.toString());

    // If room is empty or only host remains, close the room
    if (room.participants.length === 0) {
      room.isActive = false;
    }

    await room.save();

    // Populate and return updated room
    await room.populate('question');
    await room.populate('host', 'name email avatar');
    await room.populate('participants.user', 'name email avatar');

    res.status(200).json({
      success: true,
      message: 'Left room successfully',
      data: room
    });
  } catch (error) {
    console.error('Error leaving room:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Close a room
// @route   PUT /api/rooms/:code/close
// @access  Private
router.put('/:code/close', protect, async (req, res) => {
  try {
    const room = await Room.findOne({ roomCode: req.params.code });

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    // Only host can close the room
    if (room.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Only host can close the room' });
    }

    room.isActive = false;
    await room.save();

    res.status(200).json({
      success: true,
      message: 'Room closed successfully'
    });
  } catch (error) {
    console.error('Error closing room:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Join a room
// @route   POST /api/rooms/:code/join
// @access  Private
router.post('/:code/join', protect, async (req, res) => {
  try {
    const room = await Room.findOne({ roomCode: req.params.code });

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    if (!room.isActive) {
      return res.status(400).json({ success: false, message: 'Room is no longer active' });
    }

    // Check if user is already in the room
    const isAlreadyParticipant = room.participants.some(p => p.user.toString() === req.user._id.toString());

    if (!isAlreadyParticipant) {
      room.participants.push({
        user: req.user._id
      });
      await room.save();
    }

    // Populate and return
    await room.populate('question');
    await room.populate('host', 'name email avatar');
    await room.populate('participants.user', 'name email avatar');

    res.status(200).json({
      success: true,
      data: room
    });
  } catch (error) {
    console.error('Error joining room:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get room details by code
// @route   GET /api/rooms/:code
// @access  Private
router.get('/:code', protect, async (req, res) => {
  try {
    const room = await Room.findOne({ roomCode: req.params.code })
      .populate('question')
      .populate('host', 'name email avatar')
      .populate('participants.user', 'name email avatar');

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    res.status(200).json({
      success: true,
      data: room
    });
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;

import User from '../models/User.js';
import Problem from '../models/Problem.js';
import mongoose from 'mongoose';

// @desc    Get user stats
// @route   GET /api/user/:userId/stats
// @access  Public
export const getUserStats = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`📊 API: Fetching stats for user: ${userId}`);

    const user = await User.findById(userId).select(
      'name avatar totalProblemsSolved easySolved mediumSolved hardSolved submissionHistory createdAt'
    );

    if (!user) {
      console.error(`❌ API: User not found: ${userId}`);
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    console.log(`✅ API: User found. Stats from DB:`);
    console.log(`   totalProblemsSolved: ${user.totalProblemsSolved}`);
    console.log(`   easySolved: ${user.easySolved}`);
    console.log(`   mediumSolved: ${user.mediumSolved}`);
    console.log(`   hardSolved: ${user.hardSolved}`);

    // Get recent submissions (last 10)
    const recentSubmissions = user.submissionHistory
      .slice(-10)
      .reverse()
      .map(sub => ({
        questionId: sub.questionId,
        verdict: sub.verdict,
        timestamp: sub.timestamp,
        languageUsed: sub.languageUsed,
        timeTaken: sub.timeTaken
      }));

    res.status(200).json({
      success: true,
      data: {
        user: {
          name: user.name,
          avatar: user.avatar,
          memberSince: user.createdAt
        },
        stats: {
          totalProblemsSolved: user.totalProblemsSolved,
          easySolved: user.easySolved,
          mediumSolved: user.mediumSolved,
          hardSolved: user.hardSolved
        },
        recentSubmissions
      }
    });
  } catch (error) {
    console.error('❌ Error fetching user stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get current user's stats
// @route   GET /api/user/me/stats
// @access  Private
export const getMyStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select(
      'name avatar totalProblemsSolved easySolved mediumSolved hardSolved submissionHistory createdAt'
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get recent submissions (last 10)
    const recentSubmissions = user.submissionHistory
      .slice(-10)
      .reverse()
      .map(sub => ({
        questionId: sub.questionId,
        verdict: sub.verdict,
        timestamp: sub.timestamp,
        languageUsed: sub.languageUsed,
        timeTaken: sub.timeTaken
      }));

    res.status(200).json({
      success: true,
      data: {
        user: {
          name: user.name,
          avatar: user.avatar,
          memberSince: user.createdAt
        },
        stats: {
          totalProblemsSolved: user.totalProblemsSolved,
          easySolved: user.easySolved,
          mediumSolved: user.mediumSolved,
          hardSolved: user.hardSolved
        },
        recentSubmissions
      }
    });
  } catch (error) {
    console.error('Error fetching my stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get all user submissions
// @route   GET /api/user/:userId/submissions
// @access  Public
export const getUserSubmissions = async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 50, sort = '-timestamp' } = req.query;

    const user = await User.findById(userId).select('submissionHistory');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Sort submissions
    let submissions = [...user.submissionHistory];

    if (sort === '-timestamp') {
      submissions.reverse();
    }

    // Apply limit
    submissions = submissions.slice(0, parseInt(limit));

    res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions
    });
  } catch (error) {
    console.error('Error fetching user submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get user's solved problems from user-solved collection
// @route   GET /api/user/:userId/solved
// @access  Public
export const getUserSolvedProblems = async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 10 } = req.query;

    console.log(`📚 API: Fetching solved problems for user: ${userId} `);

    const UserSolved = mongoose.model('UserSolved');
    console.log(`📚 API: Using collection: ${UserSolved.collection.name} `);
    console.log(`📚 API: Database: ${UserSolved.db.name} `);

    const solvedProblems = await UserSolved.find({ userId: new mongoose.Types.ObjectId(userId) })
      .sort({ solvedAt: -1 })
      .limit(parseInt(limit));

    console.log(`✅ API: Found ${solvedProblems.length} solved problems`);

    // Also try to find all documents in the collection
    const allDocs = await UserSolved.find({}).limit(5);
    console.log(`📚 API: Total documents in collection: ${allDocs.length} `);
    if (allDocs.length > 0) {
      console.log(`📚 API: Sample document: `, allDocs[0]);
    }

    res.status(200).json({
      success: true,
      count: solvedProblems.length,
      data: solvedProblems
    });
  } catch (error) {
    console.error('❌ Error fetching solved problems:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get global leaderboard
// @route   GET /api/users/leaderboard
// @access  Public
export const getLeaderboard = async (req, res) => {
  try {
    console.log('🏆 API: Fetching leaderboard data');

    const users = await User.find({})
      .select('name username avatar totalProblemsSolved easySolved mediumSolved hardSolved submissionHistory createdAt')
      .lean();

    console.log(`🏆 API: Found ${users.length} users`);

    // Calculate score for each user
    const leaderboardData = users.map(user => {
      // Ensure stats are numbers, default to 0
      const easy = user.easySolved || 0;
      const medium = user.mediumSolved || 0;
      const hard = user.hardSolved || 0;
      const total = user.totalProblemsSolved || 0;

      // Score calculation: Easy=10, Medium=30, Hard=50
      const score = (easy * 10) + (medium * 30) + (hard * 50);

      const winRate = 0;

      // Determine main language from submission history
      const languageCounts = {};
      if (user.submissionHistory && user.submissionHistory.length > 0) {
        user.submissionHistory.forEach(sub => {
          if (sub.languageUsed) {
            languageCounts[sub.languageUsed] = (languageCounts[sub.languageUsed] || 0) + 1;
          }
        });
      }

      // Find language with max usage
      let mainLanguage = 'JavaScript'; // Default
      let maxCount = 0;
      for (const [lang, count] of Object.entries(languageCounts)) {
        if (count > maxCount) {
          maxCount = count;
          mainLanguage = lang;
        }
      }

      return {
        _id: user._id,
        name: user.name,
        username: user.username || user.name.toLowerCase().replace(/\s+/g, ''),
        avatar: user.avatar,
        score,
        totalSolved: total,
        winRate,
        mainLanguage,
        easySolved: easy,
        mediumSolved: medium,
        hardSolved: hard
      };
    });

    // Sort by score (descending)
    leaderboardData.sort((a, b) => b.score - a.score);

    // Take top 50
    const top50 = leaderboardData.slice(0, 50);

    // Add rank
    const rankedData = top50.map((user, index) => ({
      ...user,
      rank: index + 1
    }));

    res.status(200).json({
      success: true,
      count: rankedData.length,
      data: rankedData
    });

  } catch (error) {
    console.error('❌ Error fetching leaderboard:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

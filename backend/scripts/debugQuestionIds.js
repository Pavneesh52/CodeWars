import dotenv from 'dotenv';
dotenv.config();

const debugIds = async () => {
  try {
    console.log('🌐 Fetching questions from LeetCode API...');
    const response = await fetch('https://leetcode.com/api/problems/all/');
    
    if (!response.ok) {
      throw new Error(`LeetCode API error: ${response.status}`);
    }

    const leetcodeData = await response.json();
    console.log(`✅ Fetched ${leetcodeData.num_total} total problems from LeetCode`);

    // Get first 50 problems
    const problemsToFetch = leetcodeData.stat_status_pairs.slice(0, 50);

    console.log('\n📋 First 50 Question IDs:');
    problemsToFetch.forEach((item, index) => {
      const stat = item.stat;
      const difficulty = ['Easy', 'Medium', 'Hard'][item.difficulty.level - 1];
      console.log(`${index + 1}. ID: ${stat.question_id}, Title: ${stat.question__title}, Difficulty: ${difficulty}`);
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

debugIds();

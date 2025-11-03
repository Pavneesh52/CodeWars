import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Question from '../models/Question.js';

// DSA Topic mapping based on LeetCode problem IDs
const topicMapping = {
  1: ['Array', 'Hash Table'],
  2: ['Linked List', 'Math'],
  3: ['Hash Table', 'String', 'Sliding Window'],
  4: ['Array', 'Binary Search', 'Divide and Conquer'],
  5: ['String', 'Dynamic Programming'],
  6: ['String'],
  7: ['Math'],
  8: ['String'],
  9: ['Math'],
  10: ['String', 'Dynamic Programming'],
  11: ['Array', 'Greedy', 'Two Pointers'],
  12: ['String', 'Dynamic Programming'],
  13: ['String', 'Dynamic Programming'],
  14: ['String', 'Dynamic Programming'],
  15: ['Array', 'Hash Table', 'Two Pointers'],
  16: ['String', 'Backtracking'],
  17: ['String', 'Backtracking'],
  18: ['Array', 'Hash Table', 'Sorting', 'Two Pointers'],
  19: ['String', 'Backtracking'],
  20: ['String', 'Backtracking'],
  21: ['Linked List', 'Recursion'],
  22: ['String', 'Backtracking'],
  23: ['Linked List', 'Divide and Conquer'],
  24: ['String', 'Backtracking'],
  25: ['Linked List', 'Recursion'],
  26: ['Array', 'Two Pointers'],
  27: ['Array', 'Two Pointers'],
  28: ['String', 'String Matching'],
  29: ['Math'],
  30: ['String', 'Backtracking'],
  31: ['Array', 'Backtracking'],
  32: ['Array', 'Stack', 'Greedy'],
  33: ['Array', 'Backtracking'],
  34: ['Array', 'Binary Search', 'Two Pointers'],
  35: ['String', 'Dynamic Programming'],
  36: ['String', 'Hash Table'],
  37: ['Array', 'Backtracking'],
  38: ['String', 'Backtracking'],
  39: ['Array', 'Backtracking'],
  40: ['Array', 'Backtracking'],
  41: ['Array', 'Hash Table'],
  42: ['Array', 'Dynamic Programming', 'Stack'],
  43: ['String', 'Dynamic Programming'],
  44: ['String', 'Backtracking', 'Dynamic Programming'],
  45: ['Array', 'Sorting'],
  46: ['String', 'Dynamic Programming'],
  47: ['String', 'Backtracking'],
  48: ['String', 'Stack'],
  49: ['String', 'Backtracking'],
  50: ['String', 'Hash Table'],
};

const getTopicsForQuestion = (questionId) => {
  return topicMapping[questionId] || ['Algorithm', 'DSA'];
};

// Fetch full problem details from LeetCode GraphQL API
const fetchProblemDetails = async (titleSlug) => {
  try {
    const query = `
      query getQuestionDetail($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          content
          exampleTestcases
          codeSnippets {
            lang
            code
          }
        }
      }
    `;

    const response = await fetch('https://leetcode.com/graphql/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      },
      body: JSON.stringify({
        query: query,
        variables: { titleSlug: titleSlug }
      })
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    if (data.errors || !data.data?.question) {
      return null;
    }

    return data.data.question;
  } catch (error) {
    console.warn(`⚠️  Could not fetch details for ${titleSlug}`);
    return null;
  }
};

// Clean HTML content
const cleanHtmlContent = (html) => {
  if (!html) return '';
  
  // Remove HTML tags but keep text
  let text = html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
  
  return text;
};

const seedFromLeetCode = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/codehub';
    console.log(`📡 Connecting to MongoDB: ${mongoUri}`);
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Fetch from LeetCode API
    console.log('🌐 Fetching questions from LeetCode API...');
    const response = await fetch('https://leetcode.com/api/problems/all/');
    
    if (!response.ok) {
      throw new Error(`LeetCode API error: ${response.status}`);
    }

    const leetcodeData = await response.json();
    console.log(`✅ Fetched ${leetcodeData.num_total} total problems from LeetCode`);

    // Get first 100 problems for detailed fetching (to keep it fast)
    const problemsToFetch = leetcodeData.stat_status_pairs
      .slice(0, 100)
      .filter(item => !item.paid_only);

    console.log(`\n📝 Fetching detailed information for ${problemsToFetch.length} problems...`);
    
    const questions = [];
    
    for (let i = 0; i < problemsToFetch.length; i++) {
      const item = problemsToFetch[i];
      const stat = item.stat;
      const difficulty = ['Easy', 'Medium', 'Hard'][item.difficulty.level - 1];
      const topics = getTopicsForQuestion(stat.question_id);

      // Show progress
      if ((i + 1) % 10 === 0) {
        console.log(`   ⏳ Processing ${i + 1}/${problemsToFetch.length}...`);
      }

      // Fetch full details
      const details = await fetchProblemDetails(stat.question__slug);
      
      // Extract content and examples
      let description = stat.question__title;
      let examples = [];
      let constraints = '';
      
      if (details && details.content) {
        const cleanedContent = cleanHtmlContent(details.content);
        description = cleanedContent.substring(0, 1000); // First 1000 chars
        
        // Try to extract constraints
        const constraintsMatch = cleanedContent.match(/Constraints?:([^.]+)/i);
        if (constraintsMatch) {
          constraints = constraintsMatch[1].trim();
        }
      }

      // Extract example test cases
      if (details && details.exampleTestcases) {
        examples = [
          {
            input: details.exampleTestcases.split('\n')[0] || 'Example input',
            output: 'See LeetCode for output',
            explanation: 'Check LeetCode for detailed explanation'
          }
        ];
      }

      // Get JavaScript starter code
      let starterCode = `function solution() {
  // Write your solution here
}`;

      if (details && details.codeSnippets) {
        const jsSnippet = details.codeSnippets.find(s => s.lang === 'JavaScript');
        if (jsSnippet) {
          starterCode = jsSnippet.code;
        }
      }

      questions.push({
        title: stat.question__title,
        description: description || `LeetCode Problem #${stat.question_id}`,
        difficulty: difficulty,
        topics: topics,
        examples: examples.length > 0 ? examples : [
          {
            input: 'Example input',
            output: 'Example output',
            explanation: 'See LeetCode for details'
          }
        ],
        constraints: constraints || 'See LeetCode problem page for constraints',
        starterCode: starterCode,
        solutionCode: `// Solution for ${stat.question__title}
// Visit: https://leetcode.com/problems/${stat.question__slug}/
function solution() {
  // Check LeetCode for accepted solutions
}`,
        testCases: [
          {
            input: 'Test case 1',
            output: 'Expected output 1'
          }
        ],
        acceptanceRate: stat.total_acs ? (stat.total_acs / stat.total_submitted * 100).toFixed(1) : 0,
        submissions: stat.total_submitted || 0,
        leetcodeId: stat.question_id,
        leetcodeSlug: stat.question__slug,
        leetcodeUrl: `https://leetcode.com/problems/${stat.question__slug}/`
      });

      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`\n📝 Transformed ${questions.length} questions with full details`);

    // Clear existing questions
    console.log('🗑️  Clearing existing questions...');
    const deleteResult = await Question.deleteMany({});
    console.log(`✅ Cleared ${deleteResult.deletedCount} existing questions`);

    // Insert questions
    console.log(`📝 Inserting ${questions.length} questions from LeetCode...`);
    const result = await Question.insertMany(questions);
    console.log(`✅ Successfully seeded ${result.length} questions`);
    
    // Verify insertion
    const count = await Question.countDocuments();
    console.log(`📊 Total questions in database: ${count}`);

    // Show difficulty breakdown
    const easyCount = await Question.countDocuments({ difficulty: 'Easy' });
    const mediumCount = await Question.countDocuments({ difficulty: 'Medium' });
    const hardCount = await Question.countDocuments({ difficulty: 'Hard' });
    console.log(`\n📈 Difficulty Breakdown:`);
    console.log(`   Easy: ${easyCount}`);
    console.log(`   Medium: ${mediumCount}`);
    console.log(`   Hard: ${hardCount}`);

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    console.log('\n🎉 LeetCode seeding completed successfully!');
    console.log(`\n📚 Questions are now available at: http://localhost:3001/api/questions`);
  } catch (error) {
    console.error('❌ Error seeding from LeetCode:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
};

seedFromLeetCode();

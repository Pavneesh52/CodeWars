import mongoose from 'mongoose';
import Problem from './models/Problem.js';
import { executeCode } from './services/codeExecutionService.js';
import dotenv from 'dotenv';

dotenv.config();

const verifySystem = async () => {
    console.log('🔍 Starting System Verification...');

    // 1. Verify Database State
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        const problem = await Problem.findOne({ title: { $regex: 'Move All Zeroes', $options: 'i' } });

        if (!problem) {
            console.error('❌ Problem "Move All Zeroes to End" NOT FOUND');
        } else {
            console.log('✅ Problem Found:', problem.title);

            // Check Return Type
            if (problem.functionSignature.returnType === 'void') {
                console.log('✅ Return Type is "void"');
            } else {
                console.error('❌ Return Type is:', problem.functionSignature.returnType, '(Expected: void)');
            }

            // Check Test Cases
            if (problem.testCases.length <= 10) {
                console.log(`✅ Test Cases Count: ${problem.testCases.length} (Safe for Rate Limits)`);
            } else {
                console.warn(`⚠️ Test Cases Count: ${problem.testCases.length} (Might hit rate limits > 10)`);
            }
        }
    } catch (err) {
        console.error('❌ Database Error:', err.message);
    }

    // 2. Verify Code Execution (Piston)
    console.log('\n🧪 Testing Code Execution (Piston)...');
    const cppCode = `
  #include <iostream>
  using namespace std;
  int main() {
      cout << "Hello from Piston!" << endl;
      return 0;
  }
  `;

    try {
        const results = await executeCode('cpp', cppCode, ['']);
        if (results && results.length > 0 && results[0].output.trim() === 'Hello from Piston!') {
            console.log('✅ Piston Execution Success:', results[0].output.trim());
        } else {
            console.error('❌ Piston Execution Failed:', results);
        }
    } catch (err) {
        console.error('❌ Piston Error:', err.message);
    }

    // 3. Verify C++ Vector Logic (Mock)
    // We can't easily test the full driver generation here without mocking the problem object, 
    // but we can test if Piston handles vector printing code.
    console.log('\n🧪 Testing C++ Vector Output...');
    const vectorCode = `
  #include <iostream>
  #include <vector>
  using namespace std;
  int main() {
      vector<int> v = {1, 2, 3};
      cout << "[";
      for(int i=0; i<v.size(); i++) cout << v[i] << (i<v.size()-1?",":"");
      cout << "]" << endl;
      return 0;
  }
  `;

    try {
        const results = await executeCode('cpp', vectorCode, ['']);
        if (results && results.length > 0 && results[0].output.trim() === '[1,2,3]') {
            console.log('✅ C++ Vector Output Success:', results[0].output.trim());
        } else {
            console.error('❌ C++ Vector Output Failed:', results);
        }
    } catch (err) {
        console.error('❌ Piston Error:', err.message);
    }

    console.log('\n🏁 Verification Complete');
    mongoose.disconnect();
};

verifySystem();

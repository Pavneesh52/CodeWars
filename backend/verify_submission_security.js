import fetch from 'node-fetch';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Problem from './models/Problem.js';

dotenv.config();

const API_URL = 'http://localhost:3001/api';
let token = '';
let problemId = '';

const register = async () => {
    const randomId = Math.floor(Math.random() * 10000);
    const email = `security_test_${randomId}@example.com`;
    const password = 'password123';

    console.log(`Registering user: ${email}`);

    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Security Tester',
            email,
            password,
            username: `tester_${randomId}`
        })
    });

    const data = await res.json();
    if (data.success || data.token) {
        token = data.token; // Some APIs return token directly on register
        if (!token) {
            // If no token on register, try login
            await login(email, password);
        } else {
            console.log('✅ Registered and logged in');
        }
    } else {
        console.error('❌ Registration failed:', data.message);
        process.exit(1);
    }
};

const login = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) {
        token = data.token;
        console.log('✅ Logged in');
    } else {
        console.error('❌ Login failed:', data.message);
        process.exit(1);
    }
};

const getProblem = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const problem = await Problem.findOne();
    if (problem) {
        problemId = problem._id;
        console.log(`✅ Found problem: ${problem.title} (${problemId})`);
    } else {
        console.error('❌ No problems found');
        process.exit(1);
    }
    await mongoose.disconnect();
};

const submitSolution = async (code, language, description) => {
    console.log(`\nTesting: ${description}`);
    const res = await fetch(`${API_URL}/submissions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            problemId,
            code,
            language,
            // Attempt to spoof status (should be ignored by backend)
            status: 'SUCCESS'
        })
    });
    const data = await res.json();
    console.log(`   Response: ${res.status} ${res.statusText}`);
    console.log(`   Result: ${data.message}`);
    if (data.data) {
        console.log(`   Status in DB: ${data.data.status}`);
        console.log(`   Tests Passed: ${data.data.passedTests}/${data.data.totalTests}`);
        if (data.data.error) {
            console.log(`   Error: ${data.data.error}`);
        }
        if (data.data.testResults && data.data.testResults.length > 0) {
            console.log(`   Sample Output: ${data.data.testResults[0].output}`);
            console.log(`   Sample Error: ${data.data.testResults[0].error}`);
        }
    }
    return data;
};

const runTests = async () => {
    await register();
    await getProblem();

    // 1. Valid Solution (C++)
    // Assuming "Find the Largest Element" is the problem
    const validCode = `
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;

    int findLargestElement(vector<int>& arr) {
        int maxVal = arr[0];
        for(int x : arr) {
            if(x > maxVal) maxVal = x;
        }
        return maxVal;
    }

    int main() {
        int n;
        while (cin >> n) {
            vector<int> arr(n);
            for (int i = 0; i < n; i++) cin >> arr[i];
            cout << findLargestElement(arr) << endl;
        }
        return 0;
    }
    `;
    // Note: The actual problem might have different input format. 
    // For verification, we just want to see the backend ATTEMPT execution.
    // Even if it fails due to logic, it proves backend is running it.

    await submitSolution(validCode, 'cpp', 'Valid Code Submission');

    // 2. Invalid Solution
    const invalidCode = `
    #include <iostream>
    using namespace std;
    int main() { cout << "Wrong Answer" << endl; return 0; }
    `;
    await submitSolution(invalidCode, 'cpp', 'Invalid Code Submission');

    console.log('\n✅ Verification Script Finished');
};

runTests();

import dotenv from 'dotenv';
dotenv.config();

const API_BASE = 'http://localhost:3001/api';

const tests = [
  {
    name: 'Health Check',
    url: `${API_BASE}/health`,
    method: 'GET'
  },
  {
    name: 'Get All Questions',
    url: `${API_BASE}/questions`,
    method: 'GET'
  },
  {
    name: 'Get All Topics',
    url: `${API_BASE}/questions/topics/all`,
    method: 'GET'
  },
  {
    name: 'Get Easy Questions',
    url: `${API_BASE}/questions?difficulty=Easy`,
    method: 'GET'
  },
  {
    name: 'Get Array Topic Questions',
    url: `${API_BASE}/questions?topic=Array`,
    method: 'GET'
  }
];

async function runTests() {
  console.log('🧪 Testing CodeWars API Endpoints\n');
  console.log(`📡 Base URL: ${API_BASE}\n`);

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      console.log(`⏳ Testing: ${test.name}`);
      console.log(`   URL: ${test.url}`);

      const response = await fetch(test.url, {
        method: test.method,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.log(`   ❌ FAILED - Status: ${response.status}`);
        failed++;
        continue;
      }

      const data = await response.json();

      if (data.success) {
        console.log(`   ✅ PASSED`);
        if (data.count !== undefined) {
          console.log(`   📊 Count: ${data.count}`);
        }
        if (data.data && Array.isArray(data.data)) {
          console.log(`   📋 Items: ${data.data.length}`);
        }
        passed++;
      } else {
        console.log(`   ❌ FAILED - API returned success: false`);
        console.log(`   Message: ${data.message}`);
        failed++;
      }
    } catch (error) {
      console.log(`   ❌ FAILED - ${error.message}`);
      failed++;
    }
    console.log();
  }

  console.log('═'.repeat(50));
  console.log(`\n📊 Test Results:`);
  console.log(`   ✅ Passed: ${passed}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📈 Total: ${tests.length}`);

  if (failed === 0) {
    console.log('\n🎉 All tests passed! API is working correctly.\n');
  } else {
    console.log('\n⚠️  Some tests failed. Check the errors above.\n');
  }
}

runTests();

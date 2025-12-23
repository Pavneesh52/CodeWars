import fetch from 'node-fetch';

const testApi = async () => {
    const userId = '690b36536b9130bfd180602b'; // ID for adityatest@gmail.com from debug_db.js
    const url = `http://localhost:3001/api/user/${userId}/stats`;

    try {
        console.log(`Fetching ${url}...`);
        const response = await fetch(url);
        const data = await response.json();

        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
    }
};

testApi();

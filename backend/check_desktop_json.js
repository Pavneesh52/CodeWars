import fs from 'fs';

const filePath = '/Users/adityasingh/Desktop/DSA-codewars/problems.json';

try {
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const problems = JSON.parse(content);
        console.log(`Found ${problems.length} problems in JSON.`);

        if (problems.length > 0) {
            const p = problems[0];
            console.log(`Sample Problem: ${p.title}`);
            console.log('TestCases (Type):', typeof p.testCases[0]);
            console.log('Examples:', JSON.stringify(p.examples, null, 2));
            console.log('Has Solution?', p.solution ? 'YES' : 'NO');
            if (p.solution) console.log('Solution Snippet:', p.solution.substring(0, 50));
        }
    } else {
        console.log('File not found at:', filePath);
    }
} catch (err) {
    console.error('Error reading file:', err.message);
}

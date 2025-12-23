import fs from 'fs';

const filePath = '/Users/adityasingh/Desktop/DSA-codewars/problems.json';

try {
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const problems = JSON.parse(content);

        const problemsWithSolution = problems.filter(p => p.solution);
        console.log(`Total Problems: ${problems.length}`);
        console.log(`Problems with 'solution' field: ${problemsWithSolution.length}`);

        if (problemsWithSolution.length > 0) {
            console.log(`Sample Solution for "${problemsWithSolution[0].title}":`);
            console.log(problemsWithSolution[0].solution.substring(0, 100) + '...');
        }
    } else {
        console.log('File not found.');
    }
} catch (err) {
    console.error('Error:', err.message);
}

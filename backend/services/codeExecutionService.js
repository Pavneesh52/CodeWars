import fetch from 'node-fetch';

const PISTON_API = 'https://emkc.org/api/v2/piston';

// Language mapping for Piston
const LANGUAGE_MAP = {
    cpp: { language: 'c++', version: '10.2.0' },
    java: { language: 'java', version: '15.0.2' },
    python: { language: 'python', version: '3.10.0' },
    javascript: { language: 'javascript', version: '18.15.0' }
};

/**
 * Execute code against multiple inputs
 * @param {string} language - The programming language (e.g., 'cpp', 'python')
 * @param {string} code - The source code
 * @param {string[]} inputs - Array of input strings
 * @returns {Promise<Array>} - Array of execution results
 */
export const executeCode = async (language, code, inputs) => {
    if (!language || !code) {
        throw new Error('Language and code are required');
    }

    const pistonConfig = LANGUAGE_MAP[language];
    if (!pistonConfig) {
        throw new Error('Unsupported language');
    }

    // Prepare inputs
    const inputsToRun = (inputs && Array.isArray(inputs) && inputs.length > 0) ? inputs : [''];

    const responses = [];

    for (const input of inputsToRun) {
        const response = await fetch(`${PISTON_API}/execute`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                language: pistonConfig.language,
                version: pistonConfig.version,
                files: [{ content: code }],
                stdin: input
            })
        }).then(res => res.json());

        responses.push(response);

        // Wait 250ms between requests to respect rate limit (5 req/sec)
        await new Promise(resolve => setTimeout(resolve, 250));
    }

    // Log first response for debugging
    if (responses.length > 0) {
        console.log('Piston Response:', JSON.stringify(responses[0], null, 2));
    }

    return responses.map((response, index) => {
        if (response.run) {
            return {
                input: inputsToRun[index],
                output: response.run.stdout.trim(),
                error: response.run.stderr,
                code: response.run.code
            };
        } else {
            return {
                input: inputsToRun[index],
                error: 'Execution failed',
                code: 1
            };
        }
    });
};

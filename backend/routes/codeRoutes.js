import express from 'express';
import fetch from 'node-fetch';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const PISTON_API = 'https://emkc.org/api/v2/piston';

// Language mapping for Piston
const LANGUAGE_MAP = {
    cpp: { language: 'c++', version: '10.2.0' },
    java: { language: 'java', version: '15.0.2' },
    python: { language: 'python', version: '3.10.0' },
    javascript: { language: 'javascript', version: '18.15.0' }
};

// @desc    Execute code
// @route   POST /api/code/execute
// @access  Private
router.post('/execute', protect, async (req, res) => {
    try {
        const { language, code, inputs } = req.body;

        if (!language || !code) {
            return res.status(400).json({ success: false, message: 'Language and code are required' });
        }

        const pistonConfig = LANGUAGE_MAP[language];
        if (!pistonConfig) {
            return res.status(400).json({ success: false, message: 'Unsupported language' });
        }

        // Prepare execution requests for each input
        // Note: Piston supports multiple files but for competitive programming 
        // we usually run the same code against multiple inputs.
        // We'll execute sequentially or in parallel depending on needs.
        // For now, let's handle the single execution case or test cases loop from frontend.

        // Actually, to support the frontend's "test cases" logic where we need to check output for each input:
        // The frontend sends one code block and expects to run it against multiple test cases.
        // Piston runs "stdin" for one execution.

        // If inputs are provided (array of strings), we run for each input.
        // If not, just run once (e.g. for custom input).

        const results = [];

        if (inputs && Array.isArray(inputs)) {
            // Run in parallel for all test cases
            const promises = inputs.map(input =>
                fetch(`${PISTON_API}/execute`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        language: pistonConfig.language,
                        version: pistonConfig.version,
                        files: [{ content: code }],
                        stdin: input
                    })
                }).then(res => res.json())
            );

            const responses = await Promise.all(promises);

            responses.forEach((response, index) => {
                if (response.run) {
                    results.push({
                        input: inputs[index],
                        output: response.run.stdout.trim(),
                        error: response.run.stderr,
                        code: response.run.code
                    });
                } else {
                    results.push({
                        input: inputs[index],
                        error: 'Execution failed',
                        code: 1
                    });
                }
            });
        } else {
            // Single run
            const response = await fetch(`${PISTON_API}/execute`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    language: pistonConfig.language,
                    version: pistonConfig.version,
                    files: [{ content: code }],
                    stdin: req.body.stdin || ''
                })
            });

            const data = await response.json();
            if (data.run) {
                results.push({
                    output: data.run.stdout.trim(),
                    error: data.run.stderr,
                    code: data.run.code
                });
            }
        }

        res.json({
            success: true,
            data: results
        });

    } catch (error) {
        console.error('Execution error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during execution'
        });
    }
});

export default router;

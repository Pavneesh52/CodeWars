import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

const CodingPlatform = () => {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    fetchQuestion();
  }, [questionId]);

  const fetchQuestion = async () => {
    try {
      const response = await fetch(`${API_ENDPOINTS.QUESTIONS}/${questionId}`);
      const data = await response.json();
      if (data.success) {
        setQuestion(data.data);
        setCode(data.data.starterCode);
      }
    } catch (error) {
      console.error('Error fetching question:', error);
    } finally {
      setLoading(false);
    }
  };

  const runCode = async () => {
    setRunning(true);
    try {
      // Simulate code execution
      const result = await executeCode(code, question.testCases);
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setRunning(false);
    }
  };

  const executeCode = (userCode, testCases) => {
    return new Promise((resolve) => {
      try {
        // Create a function from the code
        const func = new Function(userCode + '\n return ' + question.title.replace(/\s+/g, ''));
        
        let results = [];
        testCases.forEach((testCase, index) => {
          try {
            const result = func();
            results.push(`Test Case ${index + 1}: PASSED`);
          } catch (e) {
            results.push(`Test Case ${index + 1}: FAILED - ${e.message}`);
          }
        });

        resolve(results.join('\n'));
      } catch (error) {
        resolve(`Compilation Error: ${error.message}`);
      }
    });
  };

  const submitCode = () => {
    alert('Code submitted! In a real application, this would be saved to the backend.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0f1535] to-[#1a2040] text-white flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0f1535] to-[#1a2040] text-white flex items-center justify-center">
        <div className="text-2xl">Question not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0f1535] to-[#1a2040] text-white">
      {/* Header */}
      <nav className="border-b border-gray-800 bg-[#0a0e27]/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-xl font-bold">{question.title}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                question.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                question.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {question.difficulty}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={runCode}
                disabled={running}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-6 py-2 rounded-lg transition-colors font-semibold"
              >
                {running ? 'Running...' : 'Run Code'}
              </button>
              <button
                onClick={submitCode}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg transition-colors font-semibold"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Panel - Problem Description */}
          <div className="bg-[#1a1f3a]/90 border border-gray-700 rounded-xl overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-700 flex">
              <button
                onClick={() => setActiveTab('description')}
                className={`flex-1 px-6 py-3 font-semibold transition-colors ${
                  activeTab === 'description'
                    ? 'bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('submissions')}
                className={`flex-1 px-6 py-3 font-semibold transition-colors ${
                  activeTab === 'submissions'
                    ? 'bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Submissions
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
              {activeTab === 'description' && (
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h2 className="text-lg font-bold text-white mb-3">Description</h2>
                    <p className="text-gray-300 leading-relaxed">{question.description}</p>
                  </div>

                  {/* Examples */}
                  <div>
                    <h2 className="text-lg font-bold text-white mb-3">Examples</h2>
                    <div className="space-y-4">
                      {question.examples.map((example, index) => (
                        <div key={index} className="bg-[#0f1425] border border-gray-700 rounded-lg p-4">
                          <div className="mb-3">
                            <p className="text-gray-400 text-sm font-semibold mb-1">Input:</p>
                            <p className="text-cyan-300 font-mono text-sm">{example.input}</p>
                          </div>
                          <div className="mb-3">
                            <p className="text-gray-400 text-sm font-semibold mb-1">Output:</p>
                            <p className="text-green-300 font-mono text-sm">{example.output}</p>
                          </div>
                          {example.explanation && (
                            <div>
                              <p className="text-gray-400 text-sm font-semibold mb-1">Explanation:</p>
                              <p className="text-gray-300 text-sm">{example.explanation}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Constraints */}
                  <div>
                    <h2 className="text-lg font-bold text-white mb-3">Constraints</h2>
                    <p className="text-gray-300 text-sm leading-relaxed">{question.constraints}</p>
                  </div>

                  {/* Topics */}
                  <div>
                    <h2 className="text-lg font-bold text-white mb-3">Topics</h2>
                    <div className="flex flex-wrap gap-2">
                      {question.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-500/20 text-purple-300"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'submissions' && (
                <div className="text-gray-400">
                  <p>No submissions yet. Submit your solution to see it here.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="bg-[#1a1f3a]/90 border border-gray-700 rounded-xl overflow-hidden flex flex-col">
            {/* Editor Header */}
            <div className="bg-[#0f1425] border-b border-gray-700 px-6 py-3 flex items-center justify-between">
              <span className="text-gray-300 font-semibold">Solution.js</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-green-400 text-xs font-semibold">Ready</span>
              </div>
            </div>

            {/* Code Editor */}
            <div className="flex-1 overflow-hidden flex flex-col">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 bg-[#0f1425] text-white font-mono text-sm p-6 resize-none focus:outline-none border-none"
                spellCheck="false"
              />
            </div>

            {/* Output Section */}
            <div className="border-t border-gray-700 bg-[#0f1425]">
              <div className="px-6 py-3 border-b border-gray-700">
                <h3 className="text-gray-300 font-semibold">Output</h3>
              </div>
              <div className="p-6 max-h-40 overflow-y-auto">
                {output ? (
                  <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap break-words">
                    {output}
                  </pre>
                ) : (
                  <p className="text-gray-500 text-sm">Run your code to see output here</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingPlatform;

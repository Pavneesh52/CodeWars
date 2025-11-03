import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import MonacoEditor from './MonacoEditor';

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
          <div className="bg-[#1a1f3a]/90 border border-gray-700 rounded-xl overflow-hidden flex flex-col h-[calc(100vh-200px)]">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <select className="bg-[#0f1425] border border-gray-700 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50">
                  <option>JavaScript</option>
                  <option>Python</option>
                  <option>Java</option>
                  <option>C++</option>
                </select>
                <button className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-700/50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setCode(question.starterCode)}
                  className="text-gray-400 hover:text-white text-sm px-3 py-1 rounded hover:bg-gray-700/50 transition-colors"
                >
                  Reset Code
                </button>
                <button className="text-gray-400 hover:text-white p-1.5 rounded hover:bg-gray-700/50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Monaco Editor */}
            <div className="flex-1 min-h-0">
              <MonacoEditor
                code={code}
                language="javascript"
                onChange={setCode}
                readOnly={false}
              />
            </div>
            
            {/* Console/Output */}
            <div className="border-t border-gray-700 bg-[#0f1425] flex flex-col" style={{ height: '30%', minHeight: '150px' }}>
              <div className="border-b border-gray-700 px-4 py-2 flex justify-between items-center">
                <div className="flex space-x-4">
                  <button 
                    onClick={() => setActiveTab('console')} 
                    className={`px-3 py-1 text-sm font-medium rounded-t ${activeTab === 'console' ? 'bg-[#1a1f3a] text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    Console
                  </button>
                  <button 
                    onClick={() => setActiveTab('test-cases')} 
                    className={`px-3 py-1 text-sm font-medium rounded-t ${activeTab === 'test-cases' ? 'bg-[#1a1f3a] text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    Test Cases
                  </button>
                </div>
                <button className="text-gray-400 hover:text-white p-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-auto p-4 font-mono text-sm text-gray-300">
                {output && output.split('\n').map((line, i) => (
                  <div key={i} className={line.includes('PASSED') ? 'text-green-400' : line.includes('FAILED') ? 'text-red-400' : ''}>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingPlatform;

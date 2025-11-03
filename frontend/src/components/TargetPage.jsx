import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import QuestionSelectionModal from './QuestionSelectionModal';

const TargetPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState(null);
  const [difficulty, setDifficulty] = useState('Medium');
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      localStorage.setItem('token', tokenFromUrl);
      window.history.replaceState({}, document.title, '/dashboard');
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [searchParams, navigate]);

  const handleLogout = async () => {
    try {
      await fetch(API_ENDPOINTS.LOGOUT, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0f1535] via-[#1a2040] to-[#2a3f5f] text-white relative overflow-hidden">
      {/* Background gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-purple-500/10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-cyan-500/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-purple-500/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      {/* Navigation Bar */}
      <nav className="border-b border-gray-800 bg-[#0a0e27]/80 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-cyan-500 rounded-lg p-2 flex items-center justify-center">
                <svg 
                  className="w-5 h-5 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" 
                  />
                </svg>
              </div>
              <span className="text-white text-xl font-bold">CodeArena</span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Active Rooms 🔥
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Challenges 📋
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Leaderboard 🏆
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                About Us 📘
              </a>
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-16 relative z-10">
        <div className="grid grid-cols-[1fr_1.5fr] gap-20 items-start">
          {/* Left Section */}
          <div>
            {/* Hero Text */}
            <h1 className="text-6xl font-bold leading-tight mb-8">
              CODE & COMPETE<br />
              WITH YOUR<br />
              <span className="text-cyan-400">TEAM</span>
            </h1>

            {/* Difficulty and Create Room */}
            <div className="flex items-center gap-4 mb-6">
              <select 
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="bg-[#1a1f3a] border border-gray-700 text-white px-6 py-3 rounded-lg focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <button 
                onClick={() => setShowQuestionModal(true)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Create Room
              </button>
            </div>

            {/* Info Text */}
            <div className="flex items-start gap-3 mb-12 bg-[#1a1f3a] border border-gray-700 rounded-lg p-4">
              <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-300 text-sm">
                You will get <span className="text-cyan-400 font-semibold">45 minutes</span> to solve <span className="text-cyan-400 font-semibold">3 medium</span> difficulty problems.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-6">
              {/* Real-time Battles */}
              <div className="bg-[#1a1f3a] border border-gray-700 rounded-xl p-6 hover:border-cyan-500 transition-colors">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="text-xl font-bold mb-2">Real-time Battles</h3>
                <p className="text-gray-400 text-sm">
                  Compete live with developers
                </p>
              </div>

              {/* Global Rankings */}
              <div className="bg-[#1a1f3a] border border-gray-700 rounded-xl p-6 hover:border-cyan-500 transition-colors">
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="text-xl font-bold mb-2">Global Rankings</h3>
                <p className="text-gray-400 text-sm">
                  Climb the leaderboard
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Code Editor Preview */}
          <div className="bg-[#1a1f3a]/90 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden ml-12 shadow-2xl shadow-cyan-500/20 transform hover:scale-[1.02] transition-all duration-300">
            {/* Browser Header */}
            <div className="bg-[#0f1425] border-b border-gray-700 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center text-gray-400 text-sm">
                codearena.dev
              </div>
            </div>

            {/* Code Editor Tabs */}
            <div className="bg-[#0f1425] border-b border-gray-700 flex">
              <div className="px-4 py-2 bg-[#1a1f3a] text-white text-sm border-r border-gray-700">
                Solution.js
              </div>
              <div className="px-4 py-2 text-gray-400 text-sm">
                Test.js
              </div>
              <div className="ml-auto px-4 py-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-green-400 text-xs font-semibold">Live</span>
              </div>
            </div>

            {/* Code Content */}
            <div className="p-6 font-mono text-sm">
              <div className="mb-4">
                <span className="text-purple-400">function</span>{' '}
                <span className="text-yellow-300">twoSum</span>
                <span className="text-gray-300">(</span>
                <span className="text-orange-300">nums</span>
                <span className="text-gray-300">, </span>
                <span className="text-orange-300">target</span>
                <span className="text-gray-300">) {`{`}</span>
              </div>
              <div className="ml-4 mb-2">
                <span className="text-purple-400">const</span>{' '}
                <span className="text-cyan-300">map</span>{' '}
                <span className="text-gray-300">= </span>
                <span className="text-purple-400">new</span>{' '}
                <span className="text-yellow-300">Map</span>
                <span className="text-gray-300">();</span>
              </div>
              <div className="ml-4 mb-2">
                <span className="text-purple-400">for</span>{' '}
                <span className="text-gray-300">(</span>
                <span className="text-purple-400">let</span>{' '}
                <span className="text-cyan-300">i</span>{' '}
                <span className="text-gray-300">= </span>
                <span className="text-green-400">0</span>
                <span className="text-gray-300">; </span>
                <span className="text-cyan-300">i</span>{' '}
                <span className="text-gray-300">&lt; </span>
                <span className="text-cyan-300">nums</span>
                <span className="text-gray-300">.</span>
                <span className="text-cyan-300">length</span>
                <span className="text-gray-300">; </span>
                <span className="text-cyan-300">i</span>
                <span className="text-purple-400">++</span>
                <span className="text-gray-300">) {`{`}</span>
              </div>
              <div className="ml-8 mb-2">
                <span className="text-purple-400">const</span>{' '}
                <span className="text-cyan-300">complement</span>{' '}
                <span className="text-gray-300">= </span>
                <span className="text-cyan-300">target</span>{' '}
                <span className="text-gray-300">- </span>
                <span className="text-cyan-300">nums</span>
                <span className="text-gray-300">[</span>
                <span className="text-cyan-300">i</span>
                <span className="text-gray-300">];</span>
              </div>
              <div className="ml-8 mb-2 text-gray-500">
                // ...
              </div>
            </div>

            {/* Test Results */}
            <div className="bg-[#0f1425] border-t border-gray-700 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-300 font-semibold">Test Results</span>
                <span className="text-green-400 font-semibold">3/3 Passed</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Test Case 1</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Test Case 2</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Test Case 3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Selection Modal */}
      <QuestionSelectionModal
        isOpen={showQuestionModal}
        onClose={() => setShowQuestionModal(false)}
        onSelectQuestion={(question) => {
          setShowQuestionModal(false);
          navigate(`/coding/${question._id}`);
        }}
      />
    </div>
  );
};

export default TargetPage;

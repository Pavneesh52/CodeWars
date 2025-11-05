import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import TargetPage from './components/TargetPage'
import CodingPlatform from './components/CodingPlatform'
import ProblemsPage from './components/ProblemsPage'
import Profile from './components/Profile'
import ProfileTest from './components/ProfileTest'
import ActiveBattles from './components/ActiveBattles'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<TargetPage />} />
          <Route path="/active-battles" element={<ActiveBattles />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-test" element={<ProfileTest />} />
          <Route path="/coding/:questionId" element={<CodingPlatform />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

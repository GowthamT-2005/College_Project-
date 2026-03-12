import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import RecommendationPage from './pages/RecommendationPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/recommend" element={<RecommendationPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-slate-200 mt-auto py-6">
          <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} AI-Based Fruits and Vegetables Recommendation & Farm Resource Allocation System. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

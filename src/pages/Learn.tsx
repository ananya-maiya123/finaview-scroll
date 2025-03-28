
import React from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const Learn: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-finaura to-finaura-dark">
      <Header />
      <div className="px-5 py-10">
        <h1 className="text-2xl font-bold mb-4 text-white">Learning Path</h1>
        <p className="text-gray-200 mb-4">Explore financial concepts and investment strategies.</p>
        <div className="space-y-4">
          <div className="news-card">
            <h3 className="font-medium text-white">Introduction to Investing</h3>
            <p className="text-sm text-gray-300 mt-1">Learn the basics of investing and financial markets.</p>
          </div>
          <div className="news-card">
            <h3 className="font-medium text-white">Understanding Stock Markets</h3>
            <p className="text-sm text-gray-300 mt-1">Dive deep into how stock markets function.</p>
          </div>
          <div className="news-card">
            <h3 className="font-medium text-white">Investment Strategies for Beginners</h3>
            <p className="text-sm text-gray-300 mt-1">Simple strategies to start your investment journey.</p>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Learn;

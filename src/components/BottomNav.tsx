
import React from 'react';
import { Home, BookOpen, MessageSquare, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const BottomNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-lg border-t border-white/10">
      <div className="flex justify-around items-center py-3">
        <Link to="/" className="flex flex-col items-center">
          <Home className="h-6 w-6 text-white" />
        </Link>
        <Link to="/learn" className="flex flex-col items-center">
          <BookOpen className="h-6 w-6 text-white" />
        </Link>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 -mt-6">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
        <Link to="/chat" className="flex flex-col items-center">
          <MessageSquare className="h-6 w-6 text-white" />
        </Link>
        <Link to="/profile" className="flex flex-col items-center">
          <User className="h-6 w-6 text-white" />
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;


import React from 'react';
import { Bell, MessageSquare } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center py-4 px-5">
      <div className="flex items-center">
        <MessageSquare className="h-6 w-6 text-white" />
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">FinAI</h1>
      </div>
      <div className="flex items-center">
        <Bell className="h-6 w-6 text-white" />
      </div>
    </header>
  );
};

export default Header;

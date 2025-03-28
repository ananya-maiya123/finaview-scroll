
import React from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { Settings, LogOut, CreditCard, PieChart, Bell, HelpCircle } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-finaura to-finaura-dark">
      <Header />
      <div className="px-5 py-6">
        <div className="flex items-center mb-8">
          <div className="h-20 w-20 rounded-full bg-finaura-accent flex items-center justify-center text-2xl font-bold">
            R
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-white">Raj Kumar</h2>
            <p className="text-finaura-light">raj.kumar@example.com</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="news-card flex items-center">
            <PieChart className="h-5 w-5 mr-3 text-finaura-accent" />
            <span>Portfolio Overview</span>
          </div>
          
          <div className="news-card flex items-center">
            <CreditCard className="h-5 w-5 mr-3 text-finaura-accent" />
            <span>Payment Methods</span>
          </div>
          
          <div className="news-card flex items-center">
            <Bell className="h-5 w-5 mr-3 text-finaura-accent" />
            <span>Notification Settings</span>
          </div>
          
          <div className="news-card flex items-center">
            <Settings className="h-5 w-5 mr-3 text-finaura-accent" />
            <span>Account Settings</span>
          </div>
          
          <div className="news-card flex items-center">
            <HelpCircle className="h-5 w-5 mr-3 text-finaura-accent" />
            <span>Help & Support</span>
          </div>
          
          <div className="news-card flex items-center text-red-400">
            <LogOut className="h-5 w-5 mr-3" />
            <span>Log Out</span>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Profile;

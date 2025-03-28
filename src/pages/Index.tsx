
import React, { useState } from 'react';
import Header from '../components/Header';
import Greeting from '../components/Greeting';
import SearchBar from '../components/SearchBar';
import NewsFeed from '../components/NewsFeed';
import BottomNav from '../components/BottomNav';

const Index: React.FC = () => {
  const [username, setUsername] = useState('Raj');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-finaura to-finaura-dark">
      <Header />
      <Greeting name={username} />
      <SearchBar />
      <NewsFeed />
      <BottomNav />
    </div>
  );
};

export default Index;

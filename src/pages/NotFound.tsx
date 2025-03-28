
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-finaura to-finaura-dark flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page not found</p>
      <Link to="/" className="px-4 py-2 bg-finaura-accent rounded-md hover:opacity-90 transition-opacity">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;

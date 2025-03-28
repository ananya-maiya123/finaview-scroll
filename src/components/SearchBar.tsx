
import React from 'react';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  return (
    <div className="relative mx-5 mb-6">
      <input
        type="text"
        placeholder="Search a stock"
        className="w-full py-2 pl-4 pr-12 rounded-full bg-white text-gray-800 focus:outline-none"
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <Search className="h-5 w-5 text-gray-600" />
      </div>
    </div>
  );
};

export default SearchBar;

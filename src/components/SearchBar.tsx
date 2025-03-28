
import React, { useState } from 'react';
import { Search } from 'lucide-react';

// Define stock data structures
const usStocksData = {
  "Technology": {
    "AAPL": "Apple Inc.",
    "MSFT": "Microsoft Corporation",
    "GOOGL": "Alphabet Inc. (Google)",
    "AMZN": "Amazon.com Inc.",
    "META": "Meta Platforms Inc. (Facebook)",
    "TSLA": "Tesla Inc.",
    "NVDA": "NVIDIA Corporation",
    "INTC": "Intel Corporation"
  },
  "Finance": {
    "JPM": "JPMorgan Chase & Co.",
    "GS": "The Goldman Sachs Group Inc.",
    "MS": "Morgan Stanley",
    "C": "Citigroup Inc.",
    "BAC": "Bank of America Corporation"
  },
  "Healthcare": {
    "JNJ": "Johnson & Johnson",
    "PFE": "Pfizer Inc.",
    "MRK": "Merck & Co. Inc.",
    "UNH": "UnitedHealth Group Incorporated",
    "ABT": "Abbott Laboratories"
  }
};

const indianStocks = {
  "RELIANCE.NS": "Reliance Industries Ltd",
  "TCS.NS": "Tata Consultancy Services Ltd",
  "HDFCBANK.NS": "HDFC Bank Ltd",
  "INFY.NS": "Infosys Ltd",
  "HINDUNILVR.NS": "Hindustan Unilever Ltd",
  "ICICIBANK.NS": "ICICI Bank Ltd",
  "BHARTIARTL.NS": "Bharti Airtel Ltd",
  "ITC.NS": "ITC Ltd",
  "KOTAKBANK.NS": "Kotak Mahindra Bank Ltd",
  "LT.NS": "Larsen & Toubro Ltd"
};

// Combine all stocks for search
const allStocks = () => {
  const stocks: Record<string, string> = {};
  
  // Add US stocks
  Object.values(usStocksData).forEach(sectorStocks => {
    Object.entries(sectorStocks).forEach(([symbol, name]) => {
      stocks[symbol] = name;
    });
  });
  
  // Add Indian stocks
  Object.entries(indianStocks).forEach(([symbol, name]) => {
    stocks[symbol] = name;
  });
  
  return stocks;
};

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowResults(e.target.value.length > 0);
  };
  
  // Filter stocks based on search query
  const filteredStocks = () => {
    if (!query) return [];
    
    const stocks = allStocks();
    const lowercaseQuery = query.toLowerCase();
    
    return Object.entries(stocks)
      .filter(([symbol, name]) => 
        symbol.toLowerCase().includes(lowercaseQuery) || 
        name.toLowerCase().includes(lowercaseQuery)
      )
      .slice(0, 5); // Limit to 5 results for better UX
  };
  
  return (
    <div className="relative mx-5 mb-6">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search a stock"
        className="w-full py-2 pl-4 pr-12 rounded-full bg-white text-gray-800 focus:outline-none"
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <Search className="h-5 w-5 text-gray-600" />
      </div>
      
      {/* Search results dropdown */}
      {showResults && filteredStocks().length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredStocks().map(([symbol, name]) => (
            <div 
              key={symbol}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"
              onClick={() => {
                // Handle stock selection
                console.log(`Selected stock: ${symbol} - ${name}`);
                // Clear the search field and hide results
                setQuery('');
                setShowResults(false);
              }}
            >
              <span className="font-medium">{symbol}</span>
              <span className="text-gray-600">{name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

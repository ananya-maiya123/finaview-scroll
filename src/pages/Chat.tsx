
import React, { useState } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { Send, Info, ChartBar, TrendingUp, TrendingDown } from 'lucide-react';

// Define types for investment profile
interface InvestmentProfile {
  region: 'US' | 'India';
  goal: string;
  riskTolerance: string;
  investmentAmount: number;
  timeHorizon: number;
}

// Define types for chat messages
interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

// Example stock data for context
const getStockInfo = (symbol: string) => {
  // This would typically come from an API, but we'll mock it for now
  const mockData: Record<string, any> = {
    'AAPL': {
      name: 'Apple Inc.',
      price: 188.32,
      change: 1.23,
      percentChange: 0.66,
      marketCap: '2.94T',
      peRatio: 31.25,
      dividendYield: '0.48%',
      yearlyPerformance: '+22.5%',
      sector: 'Technology',
      industry: 'Consumer Electronics'
    },
    'RELIANCE.NS': {
      name: 'Reliance Industries Ltd',
      price: 2421.55,
      change: 15.40,
      percentChange: 0.64,
      marketCap: '16.39T',
      peRatio: 28.4,
      dividendYield: '0.35%',
      yearlyPerformance: '+18.2%',
      sector: 'Energy',
      industry: 'Oil & Gas'
    }
  };

  return mockData[symbol] || {
    name: symbol,
    price: 'Unknown',
    change: 'Unknown',
    percentChange: 'Unknown',
    marketCap: 'Unknown',
    peRatio: 'Unknown',
    dividendYield: 'Unknown',
    yearlyPerformance: 'Unknown',
    sector: 'Unknown',
    industry: 'Unknown'
  };
};

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: 'bot', content: 'Hello! How can I help you with your investments today?' }
  ]);
  const [showStockInfo, setShowStockInfo] = useState(false);
  const [selectedStock, setSelectedStock] = useState('AAPL');
  
  // Default investment profile
  const [investmentProfile, setInvestmentProfile] = useState<InvestmentProfile>({
    region: 'India',
    goal: 'Wealth Growth',
    riskTolerance: 'Moderate',
    investmentAmount: 50000,
    timeHorizon: 5
  });

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Add user message
    setChatHistory(prev => [...prev, { role: 'user', content: message }]);
    
    // Check for stock symbol in message to set context
    const stockRegex = /\b[A-Z]+(?:\.NS)?\b/g;
    const matches = message.match(stockRegex);
    
    if (matches && matches.length > 0) {
      // Take the first stock symbol match
      const potentialSymbol = matches[0];
      // Check if it's in our data (would be better with a real API)
      if (potentialSymbol.includes('.NS') || ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META'].includes(potentialSymbol)) {
        setSelectedStock(potentialSymbol);
      }
    }
    
    // Simulate AI response
    setTimeout(() => {
      let botResponse = '';
      
      // Generate response based on message content
      if (message.toLowerCase().includes('stock') || message.toLowerCase().includes('invest')) {
        const stockInfo = getStockInfo(selectedStock);
        botResponse = `Based on your investment profile and the current market conditions, ${stockInfo.name} (${selectedStock}) looks ${stockInfo.percentChange > 0 ? 'promising' : 'challenging'}. 
        
        Some key metrics:
        - Current Price: ${typeof stockInfo.price === 'number' ? `$${stockInfo.price.toFixed(2)}` : stockInfo.price}
        - Market Cap: ${stockInfo.marketCap}
        - P/E Ratio: ${stockInfo.peRatio}
        - Yearly Performance: ${stockInfo.yearlyPerformance}
        
        Given your ${investmentProfile.riskTolerance} risk tolerance and ${investmentProfile.timeHorizon}-year investment horizon, I would recommend allocating about ${investmentProfile.riskTolerance === 'Aggressive' ? '15-20%' : '5-10%'} of your portfolio to this stock.
        
        Would you like to see more detailed information about ${stockInfo.name}?`;
      } else if (message.toLowerCase().includes('learn') || message.toLowerCase().includes('how to')) {
        botResponse = `I'd be happy to help you learn! Our Learning Path feature has modules on:
        
        1. Introduction to Investing
        2. Understanding Stock Markets
        3. Investment Strategies for Beginners
        4. Technical Analysis Fundamentals
        5. Fundamental Analysis Techniques
        
        Which topic would you like to explore first?`;
      } else {
        botResponse = `Thank you for your message. As your AI financial assistant, I can help with stock analysis, investment strategies, and market insights. For more personalized advice, please share details about your investment goals, risk tolerance, and preferred markets.`;
      }
      
      setChatHistory(prev => [...prev, { role: 'bot', content: botResponse }]);
    }, 1000);
    
    setMessage('');
  };

  // Handle showing stock information
  const handleShowStockInfo = () => {
    setShowStockInfo(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-finaura to-finaura-dark">
      <Header />
      <div className="px-5 py-4">
        <h1 className="text-2xl font-bold mb-4 text-white">Personalized Chatbot</h1>
        
        {/* Chat history */}
        <div className="h-[calc(100vh-220px)] overflow-y-auto mb-4 flex flex-col">
          {chatHistory.map((chat, index) => (
            <div 
              key={index} 
              className={`mb-3 max-w-[80%] ${chat.role === 'user' ? 'ml-auto bg-finaura-accent/70' : 'bg-white/10'} rounded-lg p-3 text-white`}
            >
              {chat.content}
            </div>
          ))}
        </div>
        
        {/* Input area */}
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about investments..."
            className="flex-1 py-2 px-4 rounded-full bg-white/20 text-white placeholder-white/60 focus:outline-none border border-white/30"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            className="p-2 bg-finaura-accent rounded-full"
          >
            <Send className="h-5 w-5 text-white" />
          </button>
        </div>
        
        {/* Stock information panel (conditionally shown) */}
        {showStockInfo && (
          <div className="mt-4 bg-white/10 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-white">Stock Information</h2>
              <button 
                onClick={() => setShowStockInfo(false)}
                className="text-white/70 hover:text-white"
              >
                Close
              </button>
            </div>
            
            <div className="bg-white/5 rounded-lg p-3 mb-3">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-white">{getStockInfo(selectedStock).name}</h3>
                  <p className="text-sm text-white/70">{selectedStock}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">${typeof getStockInfo(selectedStock).price === 'number' ? getStockInfo(selectedStock).price.toFixed(2) : getStockInfo(selectedStock).price}</p>
                  <p className={`text-sm ${parseFloat(getStockInfo(selectedStock).change) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {parseFloat(getStockInfo(selectedStock).change) >= 0 ? '+' : ''}{getStockInfo(selectedStock).change} ({getStockInfo(selectedStock).percentChange}%)
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs text-white/70">Market Cap</p>
                <p className="text-sm font-medium text-white">{getStockInfo(selectedStock).marketCap}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs text-white/70">P/E Ratio</p>
                <p className="text-sm font-medium text-white">{getStockInfo(selectedStock).peRatio}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs text-white/70">Dividend Yield</p>
                <p className="text-sm font-medium text-white">{getStockInfo(selectedStock).dividendYield}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs text-white/70">1-Year Performance</p>
                <p className={`text-sm font-medium ${getStockInfo(selectedStock).yearlyPerformance.includes('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {getStockInfo(selectedStock).yearlyPerformance}
                </p>
              </div>
            </div>
            
            <button className="w-full mt-3 py-2 bg-finaura-accent rounded-lg text-white font-medium">
              View Detailed Analysis
            </button>
          </div>
        )}
        
        {/* Show stock info button (when stock info is hidden) */}
        {!showStockInfo && chatHistory.length > 1 && (
          <button 
            onClick={handleShowStockInfo}
            className="w-full mt-3 py-2 flex items-center justify-center gap-2 bg-white/10 rounded-lg text-white font-medium hover:bg-white/20 transition-colors"
          >
            <ChartBar className="h-5 w-5" />
            View Stock Information
          </button>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default Chat;

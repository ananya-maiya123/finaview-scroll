
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import StockChart from '../components/StockChart';
import { Send, Info, ChartBar, TrendingUp, TrendingDown, History } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sidebar, 
  SidebarContent, 
  SidebarProvider, 
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import InvestmentSidebar from '../components/InvestmentSidebar';

// Define types for investment profile
interface InvestmentProfile {
  region: 'US' | 'India';
  goal: string;
  riskTolerance: string;
  investmentAmount: number;
  timeHorizon: number;
  income: string;
  experience: string;
}

// Define types for chat messages
interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
  timestamp: string;
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
    { 
      role: 'bot', 
      content: 'Hello! How can I help you with your investments today?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [showStockInfo, setShowStockInfo] = useState(false);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [selectedStock, setSelectedStock] = useState('AAPL');
  
  // Investment profile with expanded properties from Streamlit
  const [investmentProfile, setInvestmentProfile] = useState<InvestmentProfile>({
    region: 'India',
    goal: 'Wealth Growth',
    riskTolerance: 'Moderate',
    investmentAmount: 50000,
    timeHorizon: 5,
    income: '10L-25L',
    experience: 'Intermediate'
  });

  // Store messages in localStorage
  useEffect(() => {
    const storedMessages = localStorage.getItem('chatHistory');
    if (storedMessages) {
      setChatHistory(JSON.parse(storedMessages));
    }
  }, []);

  const saveMessageToHistory = (newHistory: ChatMessage[]) => {
    setChatHistory(newHistory);
    localStorage.setItem('chatHistory', JSON.stringify(newHistory));
  };

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Add user message
    const updatedHistory: ChatMessage[] = [
      ...chatHistory, 
      { 
        role: 'user', 
        content: message,
        timestamp: new Date().toISOString()
      }
    ];
    saveMessageToHistory(updatedHistory);
    
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
      
      // Generate response based on message content and investment profile
      if (message.toLowerCase().includes('stock') || message.toLowerCase().includes('invest')) {
        const stockInfo = getStockInfo(selectedStock);
        botResponse = `Based on your ${investmentProfile.riskTolerance} risk tolerance and ${investmentProfile.timeHorizon}-year investment horizon, ${stockInfo.name} (${selectedStock}) looks ${stockInfo.percentChange > 0 ? 'promising' : 'challenging'}. 
        
        Some key metrics:
        - Current Price: ${typeof stockInfo.price === 'number' ? `$${stockInfo.price.toFixed(2)}` : stockInfo.price}
        - Market Cap: ${stockInfo.marketCap}
        - P/E Ratio: ${stockInfo.peRatio}
        - Yearly Performance: ${stockInfo.yearlyPerformance}
        
        Given your ${investmentProfile.riskTolerance} risk tolerance and ${investmentProfile.timeHorizon}-year investment horizon with a ${investmentProfile.investmentAmount} ${investmentProfile.region === 'India' ? '₹' : '$'} investment amount, I would recommend allocating about ${investmentProfile.riskTolerance === 'Aggressive' ? '15-20%' : '5-10%'} of your portfolio to this stock.
        
        For someone with ${investmentProfile.experience} experience and ${investmentProfile.income} income level, this fits within your typical risk profile.
        
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
        botResponse = `Thank you for your message. As your AI financial assistant, I can help with stock analysis, investment strategies, and market insights. For more personalized advice, please share details about your investment goals, risk tolerance, and preferred markets.
        
        Based on your current profile (${investmentProfile.region} region, ${investmentProfile.goal} goal, ${investmentProfile.riskTolerance} risk, ${investmentProfile.timeHorizon} year horizon), I can tailor my recommendations accordingly.`;
      }
      
      const newHistory: ChatMessage[] = [
        ...updatedHistory,
        { 
          role: 'bot', 
          content: botResponse,
          timestamp: new Date().toISOString()
        }
      ];
      saveMessageToHistory(newHistory);
    }, 1000);
    
    setMessage('');
  };

  // Handle showing stock information
  const handleShowStockInfo = () => {
    setShowStockInfo(true);
  };

  // Format timestamp
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="flex w-full">
      <SidebarProvider>
        <InvestmentSidebar 
          investmentProfile={investmentProfile} 
          setInvestmentProfile={setInvestmentProfile}
          selectedStock={selectedStock}
          setSelectedStock={setSelectedStock}
        />
        
        <SidebarInset className="min-h-screen bg-gradient-to-b from-finaura to-finaura-dark">
          <Header />
          <div className="px-5 py-4">
            {/* Chat history drawer button */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-white">Personalized Chatbot</h1>
              <Drawer>
                <DrawerTrigger asChild>
                  <button 
                    className="p-2 bg-white/10 rounded-full" 
                    onClick={() => setShowChatHistory(true)}
                  >
                    <History className="h-5 w-5 text-white" />
                  </button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Chat History</DrawerTitle>
                    <DrawerDescription>Your previous conversations</DrawerDescription>
                  </DrawerHeader>
                  <div className="px-4 py-2 max-h-[60vh] overflow-y-auto">
                    {chatHistory.map((chat, index) => (
                      <div key={index} className="mb-4 p-3 rounded-lg bg-white/10">
                        <div className="flex justify-between text-sm text-white/60 mb-1">
                          <span>{chat.role === 'user' ? 'You' : 'Finaura AI'}</span>
                          <span>{formatTimestamp(chat.timestamp)}</span>
                        </div>
                        <p className="text-white whitespace-pre-line">{chat.content}</p>
                      </div>
                    ))}
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <button className="w-full py-2 bg-finaura-accent rounded-lg text-white font-medium">
                        Close
                      </button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
            
            {/* Chat history */}
            <div className="h-[calc(100vh-220px)] overflow-y-auto mb-4 flex flex-col">
              {chatHistory.map((chat, index) => (
                <div 
                  key={index} 
                  className={`mb-3 max-w-[80%] ${chat.role === 'user' ? 'ml-auto bg-finaura-accent/70' : 'bg-white/10'} rounded-lg p-3 text-white`}
                >
                  <div className="whitespace-pre-line">{chat.content}</div>
                  <div className="text-xs text-white/60 mt-2 text-right">
                    {formatTimestamp(chat.timestamp)}
                  </div>
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
            
            {/* Stock Chart when stock info is shown */}
            {showStockInfo && (
              <div className="mt-4">
                <StockChart symbol={selectedStock} />
                
                <button 
                  onClick={() => setShowStockInfo(false)}
                  className="w-full mt-3 py-2 bg-finaura-accent rounded-lg text-white font-medium"
                >
                  Hide Stock Information
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
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Chat;

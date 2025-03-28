
import React, { useState } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { Send } from 'lucide-react';

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'bot', content: 'Hello! How can I help you with your investments today?' }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Add user message
    setChatHistory([...chatHistory, { role: 'user', content: message }]);
    
    // Simulate bot response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: 'bot', 
        content: 'Thank you for your message. Our AI assistant is analyzing your query and will provide personalized investment advice shortly.'
      }]);
    }, 1000);
    
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-finaura to-finaura-dark">
      <Header />
      <div className="px-5 py-4">
        <h1 className="text-2xl font-bold mb-4 text-white">Personalized Chatbot</h1>
        <div className="h-[calc(100vh-220px)] overflow-y-auto mb-4">
          {chatHistory.map((chat, index) => (
            <div 
              key={index} 
              className={`mb-3 max-w-[80%] ${chat.role === 'user' ? 'ml-auto bg-finaura-accent/70' : 'bg-white/10'} rounded-lg p-3`}
            >
              {chat.content}
            </div>
          ))}
        </div>
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
      </div>
      <BottomNav />
    </div>
  );
};

export default Chat;


import React from 'react';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  source: string;
  time: string;
}

const NewsFeed: React.FC = () => {
  // Mock data for the news feed
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Tesla Reports Strong Q1 Earnings",
      summary: "Tesla exceeded analyst expectations with a 23% growth in revenue.",
      source: "Financial Times",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "Federal Reserve Signals Interest Rate Cuts",
      summary: "The Fed chair indicated potential interest rate cuts in the coming months.",
      source: "Wall Street Journal",
      time: "3 hours ago"
    },
    {
      id: 3,
      title: "Apple Unveils New AI Features",
      summary: "Apple announced new AI capabilities for its upcoming iOS release.",
      source: "TechCrunch",
      time: "5 hours ago"
    },
    {
      id: 4,
      title: "Oil Prices Stabilize After Recent Volatility",
      summary: "Crude oil prices have stabilized following weeks of fluctuation due to geopolitical tensions.",
      source: "Bloomberg",
      time: "6 hours ago"
    },
    {
      id: 5,
      title: "Retail Sales Up 0.7% in April",
      summary: "Consumer spending shows resilience despite inflation concerns.",
      source: "CNBC",
      time: "8 hours ago"
    }
  ];

  return (
    <div className="px-5 pb-20">
      <h2 className="text-xl font-semibold mb-4 text-white">Personalized News Feed</h2>
      <div className="space-y-4">
        {newsItems.map((item) => (
          <div key={item.id} className="news-card">
            <div className="flex justify-between">
              <h3 className="font-medium text-white">{item.title}</h3>
            </div>
            <p className="text-sm text-gray-300 mt-1">{item.summary}</p>
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <span>{item.source}</span>
              <span>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;

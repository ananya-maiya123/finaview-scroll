
import React, { useState } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { ChartBar, TrendingUp, Info, CircleDollarSign, PieChart, FileChartLine, CheckCircle, LockIcon } from 'lucide-react';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  locked: boolean;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  locked: boolean;
}

const Learn: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  
  const modules: LearningModule[] = [
    {
      id: 'basics',
      title: 'Investment Basics',
      description: 'Learn the fundamentals of investing and financial markets',
      icon: <CircleDollarSign className="h-8 w-8 text-blue-400" />,
      progress: 75,
      locked: false,
      lessons: [
        { id: 'basics-1', title: 'What is Investing?', completed: true, locked: false },
        { id: 'basics-2', title: 'Risk vs. Return', completed: true, locked: false },
        { id: 'basics-3', title: 'Asset Classes', completed: true, locked: false },
        { id: 'basics-4', title: 'Building a Portfolio', completed: false, locked: false }
      ]
    },
    {
      id: 'stocks',
      title: 'Stock Market Fundamentals',
      description: 'Understand how stock markets function',
      icon: <TrendingUp className="h-8 w-8 text-green-400" />,
      progress: 25,
      locked: false,
      lessons: [
        { id: 'stocks-1', title: 'What are Stocks?', completed: true, locked: false },
        { id: 'stocks-2', title: 'Stock Exchanges', completed: false, locked: false },
        { id: 'stocks-3', title: 'Stock Prices & Market Cap', completed: false, locked: false },
        { id: 'stocks-4', title: 'Bull vs. Bear Markets', completed: false, locked: false }
      ]
    },
    {
      id: 'analysis',
      title: 'Technical Analysis',
      description: 'Learn how to analyze stock charts and patterns',
      icon: <ChartBar className="h-8 w-8 text-yellow-400" />,
      progress: 0,
      locked: false,
      lessons: [
        { id: 'analysis-1', title: 'Chart Types', completed: false, locked: false },
        { id: 'analysis-2', title: 'Support & Resistance', completed: false, locked: false },
        { id: 'analysis-3', title: 'Moving Averages', completed: false, locked: false },
        { id: 'analysis-4', title: 'Chart Patterns', completed: false, locked: false }
      ]
    },
    {
      id: 'fundamental',
      title: 'Fundamental Analysis',
      description: 'Evaluate companies using financial statements',
      icon: <FileChartLine className="h-8 w-8 text-purple-400" />,
      progress: 0,
      locked: true,
      lessons: [
        { id: 'fundamental-1', title: 'Financial Statements', completed: false, locked: true },
        { id: 'fundamental-2', title: 'Financial Ratios', completed: false, locked: true },
        { id: 'fundamental-3', title: 'Valuation Methods', completed: false, locked: true },
        { id: 'fundamental-4', title: 'Growth Metrics', completed: false, locked: true }
      ]
    },
    {
      id: 'strategies',
      title: 'Investment Strategies',
      description: 'Different approaches to building wealth',
      icon: <PieChart className="h-8 w-8 text-red-400" />,
      progress: 0,
      locked: true,
      lessons: [
        { id: 'strategies-1', title: 'Value Investing', completed: false, locked: true },
        { id: 'strategies-2', title: 'Growth Investing', completed: false, locked: true },
        { id: 'strategies-3', title: 'Dividend Strategy', completed: false, locked: true },
        { id: 'strategies-4', title: 'Index Investing', completed: false, locked: true }
      ]
    }
  ];
  
  // Handle module click
  const handleModuleClick = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    if (module && !module.locked) {
      setActiveModule(moduleId === activeModule ? null : moduleId);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-finaura to-finaura-dark">
      <Header />
      <div className="px-5 py-4 pb-24">
        <h1 className="text-2xl font-bold mb-4 text-white">Learning Path</h1>
        <p className="text-gray-200 mb-6">Master investing with step-by-step learning modules</p>
        
        <div className="space-y-4">
          {modules.map(module => (
            <div key={module.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden">
              <div 
                className={`p-4 cursor-pointer ${module.locked ? 'opacity-70' : ''}`} 
                onClick={() => handleModuleClick(module.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-white/10">
                    {module.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-white flex items-center gap-2">
                        {module.title}
                        {module.locked && <LockIcon className="h-4 w-4 text-gray-400" />}
                      </h3>
                      <span className="text-sm text-gray-300">{module.progress}%</span>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">{module.description}</p>
                    
                    {/* Progress bar */}
                    <div className="w-full h-1.5 bg-white/10 rounded-full mt-3">
                      <div 
                        className="h-full bg-finaura-accent rounded-full" 
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Expanded lessons */}
              {activeModule === module.id && (
                <div className="border-t border-white/10 divide-y divide-white/10">
                  {module.lessons.map(lesson => (
                    <div 
                      key={lesson.id}
                      className={`p-3 pl-14 flex items-center justify-between ${lesson.locked ? 'opacity-60' : 'cursor-pointer hover:bg-white/5'}`}
                    >
                      <div className="flex items-center gap-3">
                        {lesson.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        ) : lesson.locked ? (
                          <LockIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-white/40"></div>
                        )}
                        <span className="text-white">{lesson.title}</span>
                      </div>
                      {!lesson.completed && !lesson.locked && (
                        <span className="text-xs px-2 py-1 rounded bg-finaura-accent/40 text-white">Start</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Daily Challenge */}
        <div className="mt-8 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-lg p-4">
          <h3 className="font-bold text-white flex items-center gap-2 mb-2">
            <Info className="h-5 w-5" />
            Daily Challenge
          </h3>
          <p className="text-white/90 text-sm">Learn about P/E ratios and how they impact stock valuations</p>
          <button className="mt-3 w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white font-medium transition-colors">
            Start Challenge
          </button>
        </div>
        
        {/* Your progress stats */}
        <div className="mt-6 bg-white/5 rounded-lg p-4">
          <h3 className="font-medium text-white mb-3">Your Learning Progress</h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-2xl font-bold text-white">2</p>
              <p className="text-xs text-gray-300">Modules Started</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-2xl font-bold text-white">5</p>
              <p className="text-xs text-gray-300">Lessons Completed</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-2xl font-bold text-white">20%</p>
              <p className="text-xs text-gray-300">Total Progress</p>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Learn;

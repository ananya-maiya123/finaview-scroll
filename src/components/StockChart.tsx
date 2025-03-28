
import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, RefreshCcw, AlertCircle } from 'lucide-react';

interface StockChartProps {
  symbol: string;
}

interface StockData {
  date: string;
  price: number;
}

const StockChart: React.FC<StockChartProps> = ({ symbol }) => {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [stockInfo, setStockInfo] = useState({
    price: 'Unknown',
    change: 'Unknown',
    percentChange: 'Unknown',
    marketCap: 'Unknown',
    peRatio: 'Unknown',
    dividendYield: 'Unknown',
    yearlyPerformance: 'Unknown',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In a real app, this would be a call to a stock API
        // For now, we'll generate mock data based on the symbol
        const mockHistoricalData = generateMockData(symbol);
        const mockStockInfo = generateMockStockInfo(symbol);
        
        setStockData(mockHistoricalData);
        setStockInfo(mockStockInfo);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setError("Failed to load stock data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchStockData();
    // Set up a refresh interval (every 60 seconds)
    const intervalId = setInterval(() => {
      fetchStockData();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [symbol]);

  // Generate mock data based on the symbol to simulate different stocks
  const generateMockData = (symbol: string): StockData[] => {
    const data: StockData[] = [];
    const basePrice = getBasePrice(symbol);
    const volatility = getVolatility(symbol);
    
    const now = new Date();
    for (let i = 30; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      
      // Generate price with some randomness based on symbol
      const randomFactor = Math.sin(i * 0.5) * volatility + (Math.random() - 0.5) * volatility;
      const price = parseFloat((basePrice + randomFactor).toFixed(2));
      
      data.push({
        date: date.toISOString().split('T')[0],
        price: price
      });
    }
    
    return data;
  };
  
  // Get base price for mock data generation
  const getBasePrice = (symbol: string): number => {
    const priceMap: Record<string, number> = {
      'AAPL': 180,
      'MSFT': 380,
      'GOOGL': 140,
      'AMZN': 180,
      'META': 480,
      'TSLA': 240,
      'NVDA': 850,
      'RELIANCE.NS': 2400,
      'HDFCBANK.NS': 1600,
      'TCS.NS': 3800,
      'INFY.NS': 1500
    };
    
    return priceMap[symbol] || 100 + (symbol.charCodeAt(0) % 10) * 20;
  };
  
  // Get volatility for mock data generation
  const getVolatility = (symbol: string): number => {
    const volatilityMap: Record<string, number> = {
      'AAPL': 3,
      'MSFT': 5,
      'GOOGL': 6,
      'AMZN': 8,
      'META': 10,
      'TSLA': 15,
      'NVDA': 20,
      'RELIANCE.NS': 30,
      'HDFCBANK.NS': 20,
      'TCS.NS': 25,
      'INFY.NS': 15
    };
    
    return volatilityMap[symbol] || 5;
  };
  
  // Generate mock stock info
  const generateMockStockInfo = (symbol: string) => {
    const basePrice = getBasePrice(symbol);
    const lastPrice = basePrice - (Math.random() * 5);
    const change = parseFloat((basePrice - lastPrice).toFixed(2));
    const percentChange = parseFloat(((change / lastPrice) * 100).toFixed(2));
    
    let marketCap, peRatio, dividendYield, yearlyPerformance;
    
    // For some symbols, show "Unknown" data to match the screenshot
    if (['RELIANCE.NS', 'TCS.NS'].includes(symbol)) {
      marketCap = 'Unknown';
      peRatio = 'Unknown';
      dividendYield = 'Unknown';
      yearlyPerformance = 'Unknown';
    } else {
      // Generate realistic looking data
      const mcMultiplier = Math.floor(Math.random() * 100) + 10;
      marketCap = basePrice > 500 ? `${(basePrice * mcMultiplier / 1000).toFixed(2)}T` : `${(basePrice * mcMultiplier).toFixed(2)}B`;
      peRatio = `${(Math.random() * 35 + 10).toFixed(2)}`;
      dividendYield = `${(Math.random() * 3).toFixed(2)}%`;
      yearlyPerformance = Math.random() > 0.5 ? `+${(Math.random() * 50).toFixed(2)}%` : `-${(Math.random() * 20).toFixed(2)}%`;
    }
    
    return {
      price: basePrice.toFixed(2),
      change: change.toString(),
      percentChange: percentChange.toString(),
      marketCap,
      peRatio,
      dividendYield,
      yearlyPerformance
    };
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{symbol} Stock Chart</span>
            <RefreshCcw className="h-5 w-5 animate-spin" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-destructive" />
            <span>Error Loading Chart</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    );
  }

  const priceChange = parseFloat(stockInfo.change);
  const PriceIndicator = priceChange >= 0 ? TrendingUp : TrendingDown;
  const priceColor = priceChange >= 0 ? "text-green-500" : "text-red-500";

  // Configuration for the chart
  const chartConfig = {
    price: { label: "Price" },
    trend: {
      label: "Trend",
      theme: {
        light: "#10b981",
        dark: "#10b981"
      }
    },
    negative: {
      theme: {
        light: "#ef4444",
        dark: "#ef4444"
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PriceIndicator className={`h-5 w-5 ${priceColor}`} />
            <span>{symbol} Live Chart</span>
          </div>
          <div className={`flex items-center gap-2 text-lg ${priceColor}`}>
            ${stockInfo.price} 
            <span className="text-sm">
              {priceChange >= 0 ? "+" : ""}{stockInfo.change} ({priceChange >= 0 ? "+" : ""}{stockInfo.percentChange}%)
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px]" config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={stockData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => {
                  const d = new Date(date);
                  return `${d.getMonth() + 1}/${d.getDate()}`;
                }}
                fontSize={12}
                stroke="#888888"
              />
              <YAxis 
                domain={['dataMin - 5', 'dataMax + 5']} 
                fontSize={12}
                stroke="#888888"
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                animationDuration={200}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#10b981"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                dot={false}
                name="price"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="p-3 rounded-md bg-background/5">
            <p className="text-xs text-muted-foreground">Market Cap</p>
            <p className="text-sm font-medium">{stockInfo.marketCap}</p>
          </div>
          <div className="p-3 rounded-md bg-background/5">
            <p className="text-xs text-muted-foreground">P/E Ratio</p>
            <p className="text-sm font-medium">{stockInfo.peRatio}</p>
          </div>
          <div className="p-3 rounded-md bg-background/5">
            <p className="text-xs text-muted-foreground">Dividend Yield</p>
            <p className="text-sm font-medium">{stockInfo.dividendYield}</p>
          </div>
          <div className="p-3 rounded-md bg-background/5">
            <p className="text-xs text-muted-foreground">1-Year Performance</p>
            <p className={`text-sm font-medium ${stockInfo.yearlyPerformance?.includes('+') ? 'text-green-400' : 'text-red-400'}`}>
              {stockInfo.yearlyPerformance}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockChart;

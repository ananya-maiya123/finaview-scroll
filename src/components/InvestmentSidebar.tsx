
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from 'lucide-react';

interface InvestmentProfile {
  region: 'US' | 'India';
  goal: string;
  riskTolerance: string;
  investmentAmount: number;
  timeHorizon: number;
  income: string;
  experience: string;
}

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

interface InvestmentSidebarProps {
  investmentProfile: InvestmentProfile;
  setInvestmentProfile: React.Dispatch<React.SetStateAction<InvestmentProfile>>;
  selectedStock: string;
  setSelectedStock: React.Dispatch<React.SetStateAction<string>>;
}

const InvestmentSidebar: React.FC<InvestmentSidebarProps> = ({
  investmentProfile,
  setInvestmentProfile,
  selectedStock,
  setSelectedStock
}) => {
  const handleProfileChange = (key: keyof InvestmentProfile, value: any) => {
    setInvestmentProfile(prev => ({ ...prev, [key]: value }));
  };

  const [selectedSector, setSelectedSector] = React.useState<string>("Technology");

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-white/10">
        <h2 className="px-2 py-4 text-lg font-semibold text-white">Investment Preferences</h2>
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto">
        <div className="space-y-5 p-4">
          {/* Market Selection */}
          <div>
            <Label className="text-white mb-2 block font-medium">Select Market</Label>
            <RadioGroup 
              defaultValue={investmentProfile.region}
              className="flex gap-4"
              onValueChange={(value) => handleProfileChange('region', value as 'US' | 'India')}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="US" id="us" />
                <Label htmlFor="us" className="text-white">🇺🇸 US</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="India" id="india" />
                <Label htmlFor="india" className="text-white">🇮🇳 India</Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Stock Selection */}
          <div>
            <Label className="text-white mb-2 block font-medium">Select Stock</Label>
            {investmentProfile.region === 'US' ? (
              <>
                <Select 
                  value={selectedSector}
                  onValueChange={setSelectedSector}
                >
                  <SelectTrigger className="w-full bg-white/10 text-white border-white/20">
                    <SelectValue placeholder="Select Sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(usStocksData).map(sector => (
                      <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="mt-2">
                  <Select 
                    value={selectedStock}
                    onValueChange={setSelectedStock}
                  >
                    <SelectTrigger className="w-full bg-white/10 text-white border-white/20">
                      <SelectValue placeholder="Select Stock" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(usStocksData[selectedSector as keyof typeof usStocksData]).map(([symbol, name]) => (
                        <SelectItem key={symbol} value={symbol}>{symbol} - {name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <Select 
                value={selectedStock}
                onValueChange={setSelectedStock}
              >
                <SelectTrigger className="w-full bg-white/10 text-white border-white/20">
                  <SelectValue placeholder="Select Stock" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(indianStocks).map(([symbol, name]) => (
                    <SelectItem key={symbol} value={symbol}>{symbol} - {name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Investment Goal */}
          <div>
            <Label className="text-white mb-2 block font-medium">Investment Goal</Label>
            <Select 
              value={investmentProfile.goal}
              onValueChange={(value) => handleProfileChange('goal', value)}
            >
              <SelectTrigger className="w-full bg-white/10 text-white border-white/20">
                <SelectValue placeholder="Choose Goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Wealth Growth">💰 Wealth Growth</SelectItem>
                <SelectItem value="Retirement">🏖️ Retirement</SelectItem>
                <SelectItem value="Education">🎓 Education</SelectItem>
                <SelectItem value="Emergency Fund">🚑 Emergency Fund</SelectItem>
                <SelectItem value="Home Purchase">🏠 Home Purchase</SelectItem>
                <SelectItem value="Tax Savings">💸 Tax Savings</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Risk Tolerance */}
          <div>
            <Label className="text-white mb-2 block font-medium">Risk Tolerance</Label>
            <Select 
              value={investmentProfile.riskTolerance}
              onValueChange={(value) => handleProfileChange('riskTolerance', value)}
            >
              <SelectTrigger className="w-full bg-white/10 text-white border-white/20">
                <SelectValue placeholder="Select Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Conservative">🛡️ Conservative</SelectItem>
                <SelectItem value="Moderate">⚖️ Moderate</SelectItem>
                <SelectItem value="Aggressive">🚀 Aggressive</SelectItem>
                <SelectItem value="Very Aggressive">🔥 Very Aggressive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Investment Amount */}
          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-white font-medium">Investment Amount</Label>
              <span className="text-white">
                {investmentProfile.region === 'India' ? '₹' : '$'}{investmentProfile.investmentAmount.toLocaleString()}
              </span>
            </div>
            <Slider 
              value={[investmentProfile.investmentAmount]} 
              min={1000} 
              max={1000000} 
              step={1000}
              onValueChange={(values) => handleProfileChange('investmentAmount', values[0])}
              className="my-4"
            />
          </div>

          {/* Investment Time Horizon */}
          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-white font-medium">Investment Time (Years)</Label>
              <span className="text-white">{investmentProfile.timeHorizon}</span>
            </div>
            <Slider 
              value={[investmentProfile.timeHorizon]} 
              min={1} 
              max={30} 
              step={1}
              onValueChange={(values) => handleProfileChange('timeHorizon', values[0])}
              className="my-4"
            />
          </div>

          {/* Income Level */}
          <div>
            <Label className="text-white mb-2 block font-medium">Annual Income</Label>
            <Select 
              value={investmentProfile.income}
              onValueChange={(value) => handleProfileChange('income', value)}
            >
              <SelectTrigger className="w-full bg-white/10 text-white border-white/20">
                <SelectValue placeholder="Select Income" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Below 10L">Below 10L per year</SelectItem>
                <SelectItem value="10L-25L">10L - 25L per year</SelectItem>
                <SelectItem value="25L-50L">25L - 50L per year</SelectItem>
                <SelectItem value="50L-1Cr">50L - 1Cr per year</SelectItem>
                <SelectItem value="Above 1Cr">Above 1Cr per year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Experience Level */}
          <div>
            <Label className="text-white mb-2 block font-medium">Investment Experience</Label>
            <Select 
              value={investmentProfile.experience}
              onValueChange={(value) => handleProfileChange('experience', value)}
            >
              <SelectTrigger className="w-full bg-white/10 text-white border-white/20">
                <SelectValue placeholder="Select Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="Expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-white text-sm">
          <Info size={16} />
          <p>Your preferences help tailor investment advice</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default InvestmentSidebar;

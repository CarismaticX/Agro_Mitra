import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Search, MapPin, Calendar, DollarSign, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

// YOUR UNIQUE API KEY
// ⚠️ If you continue to get a 403 error after running this code, the issue is with the key itself.
const API_KEY = "579b464db66ec23bdd000001f9ab6ff06b384ae079119a700e4227b0";
const API_URL = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

export function MarketPrices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  
  // This useEffect fetches all states by using a high limit
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const url = new URL(API_URL);
        url.searchParams.append("api-key", API_KEY);
        url.searchParams.append("format", "json");
        url.searchParams.append("group_by", "state");
        url.searchParams.append("limit", "10000"); // This is key to getting all states
        
        const response = await fetch(url);
        const data = await response.json();
        
        const stateList = data.records.map(record => record.state);
        setStates(stateList);

      } catch (err) {
        console.error("Error fetching states:", err);
      }
    };
    fetchStates();
  }, [API_KEY]);

  // This useEffect fetches districts based on the selected state
  useEffect(() => {
    if (selectedState) {
      const fetchDistricts = async () => {
        try {
          const url = new URL(API_URL);
          url.searchParams.append("api-key", API_KEY);
          url.searchParams.append("format", "json");
          url.searchParams.append("group_by", "district");
          url.searchParams.append("filters[state.keyword]", selectedState);
          url.searchParams.append("limit", "10000"); // This is key to getting all districts
          
          const response = await fetch(url);
          const data = await response.json();
          const districtList = data.records.map(record => record.district);
          setDistricts(districtList);
        } catch (err) {
          console.error("Error fetching districts:", err);
        }
      };
      fetchDistricts();
    }
  }, [selectedState, API_KEY]);

  // Main useEffect to fetch prices with all filters
  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const url = new URL(API_URL);
        url.searchParams.append("api-key", API_KEY);
        url.searchParams.append("format", "json");
        url.searchParams.append("limit", "50");
        
        if (searchTerm) {
          url.searchParams.append("filters[commodity]", searchTerm);
        }
        if (selectedState) {
          url.searchParams.append("filters[state.keyword]", selectedState);
        }
        if (selectedDistrict) {
          url.searchParams.append("filters[district]", selectedDistrict);
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data from API");
        }

        const data = await response.json();
        
        const formattedPrices = data.records.map(record => ({
          crop: record.commodity,
          variety: record.variety || "N/A",
          currentPrice: record.modal_price ? parseInt(record.modal_price) : 0,
          previousPrice: record.min_price ? parseInt(record.min_price) : 0,
          unit: "quintal",
          market: record.market || "N/A",
          lastUpdated: new Date(record.arrival_date).toLocaleDateString(),
          trend: (record.modal_price > record.min_price) ? "up" : "down"
        }));

        setPrices(formattedPrices);

      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Could not fetch market data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchPrices();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedState, selectedDistrict, API_KEY]);

  const calculateChange = (current: number, previous: number) => {
    const change = current - previous;
    const percentage = ((change / previous) * 100).toFixed(1);
    return { change, percentage };
  };

  const marketTrends = [
    { category: "Cereals", trend: "up", change: "+5.2%", description: "Steady demand with favorable weather conditions" },
    { category: "Vegetables", trend: "mixed", change: "±2.1%", description: "Seasonal variations affecting different crops" },
    { category: "Cash Crops", trend: "up", change: "+3.8%", description: "Export demand driving price increases" },
    { category: "Pulses", trend: "down", change: "-1.5%", description: "Good monsoon leading to increased supply" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Market Prices & Trends
          </CardTitle>
          <CardDescription>
            Real-time crop prices from major markets across India
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search crops or varieties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <Select onValueChange={(value) => setSelectedState(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state, index) => (
                    <SelectItem key={index} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setSelectedDistrict(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district, index) => (
                    <SelectItem key={index} value={district}>{district}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Market Trends Overview</CardTitle>
          <CardDescription>Category-wise market performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketTrends.map((trend, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{trend.category}</h4>
                  {trend.trend === 'up' ? (
                    <TrendingUp className="h-5 w-5 text-success" />
                  ) : trend.trend === 'down' ? (
                    <TrendingDown className="h-5 w-5 text-destructive" />
                  ) : (
                    <div className="w-5 h-5 bg-muted rounded-full" />
                  )}
                </div>
                <div className={`text-lg font-bold mb-1 ${
                  trend.trend === 'up' ? 'text-success' : 
                  trend.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                }`}>
                  {trend.change}
                </div>
                <p className="text-xs text-muted-foreground">{trend.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Market Prices</CardTitle>
          <CardDescription>Latest prices from major agricultural markets</CardDescription>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-lg">Loading prices...</span>
            </div>
          )}

          {error && (
            <div className="text-center text-destructive p-4 border rounded-lg">
              {error}
            </div>
          )}

          {!loading && prices.length === 0 && !error && (
            <div className="text-center text-muted-foreground p-4">
              No prices found. Try a different search or location.
            </div>
          )}

          <div className="space-y-4">
            {prices.map((item, index) => {
              const { change, percentage } = calculateChange(item.currentPrice, item.previousPrice);
              return (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-lg">{item.crop}</h4>
                      <Badge variant="outline">{item.variety}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.market}
                      </span>
                      <span>Updated {item.lastUpdated}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold flex items-center gap-1">
                      <DollarSign className="h-5 w-5" />
                      ₹{item.currentPrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">per {item.unit}</div>
                    
                    <div className={`flex items-center gap-1 mt-1 ${
                      item.trend === 'up' ? 'text-success' : 'text-destructive'
                    }`}>
                      {item.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span className="text-xs font-medium">
                        {change > 0 ? '+' : ''}₹{Math.abs(change)} ({percentage}%)
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Price Alerts</CardTitle>
          <CardDescription>Set up alerts for your crops when prices reach target levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Rice Alert Active</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Alert when price goes above ₹4,800/quintal
              </p>
              <Badge variant="default">Active</Badge>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Wheat Alert Triggered</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Price dropped below ₹2,900/quintal
              </p>
              <Badge variant="destructive">Triggered</Badge>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Set New Alert</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Create alerts for your crops
              </p>
              <Button variant="outline" size="sm" className="w-full">
                + Add Alert
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Market Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Weekly Insights</h4>
              <p className="text-sm text-muted-foreground">
                Rice prices have shown an upward trend due to increased export demand and favorable weather conditions. 
                Wheat prices are expected to stabilize as new harvest arrives in markets. 
                Vegetable prices remain volatile due to seasonal factors.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-16 flex-col gap-2">
                <TrendingUp className="h-5 w-5" />
                Historical Trends
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <Calendar className="h-5 w-5" />
                Price Forecast
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, TrendingDown, Search, MapPin, Calendar, DollarSign } from "lucide-react";
import { useState } from "react";

export function MarketPrices() {
  const [searchTerm, setSearchTerm] = useState("");

  const priceData = [
    {
      crop: "Rice",
      variety: "Basmati 1121",
      currentPrice: 4500,
      previousPrice: 4200,
      unit: "quintal",
      market: "Delhi Mandi",
      lastUpdated: "2 hours ago",
      trend: "up"
    },
    {
      crop: "Wheat",
      variety: "HD-2967",
      currentPrice: 2800,
      previousPrice: 2850,
      unit: "quintal",
      market: "Punjab Mandi",
      lastUpdated: "1 hour ago",
      trend: "down"
    },
    {
      crop: "Tomato",
      variety: "Hybrid",
      currentPrice: 3200,
      previousPrice: 2800,
      unit: "quintal",
      market: "Maharashtra Mandi",
      lastUpdated: "30 min ago",
      trend: "up"
    },
    {
      crop: "Onion",
      variety: "Red Onion",
      currentPrice: 1800,
      previousPrice: 1900,
      unit: "quintal",
      market: "Karnataka Mandi",
      lastUpdated: "45 min ago",
      trend: "down"
    },
    {
      crop: "Cotton",
      variety: "Shankar-6",
      currentPrice: 6800,
      previousPrice: 6500,
      unit: "quintal",
      market: "Gujarat Mandi",
      lastUpdated: "1 hour ago",
      trend: "up"
    },
    {
      crop: "Sugarcane",
      variety: "Co-238",
      currentPrice: 380,
      previousPrice: 375,
      unit: "quintal",
      market: "Uttar Pradesh",
      lastUpdated: "3 hours ago",
      trend: "up"
    }
  ];

  const marketTrends = [
    {
      category: "Cereals",
      trend: "up",
      change: "+5.2%",
      description: "Steady demand with favorable weather conditions"
    },
    {
      category: "Vegetables",
      trend: "mixed",
      change: "±2.1%",
      description: "Seasonal variations affecting different crops"
    },
    {
      category: "Cash Crops",
      trend: "up",
      change: "+3.8%",
      description: "Export demand driving price increases"
    },
    {
      category: "Pulses",
      trend: "down",
      change: "-1.5%",
      description: "Good monsoon leading to increased supply"
    }
  ];

  const filteredPrices = priceData.filter(item =>
    item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.variety.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateChange = (current: number, previous: number) => {
    const change = current - previous;
    const percentage = ((change / previous) * 100).toFixed(1);
    return { change, percentage };
  };

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

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search crops or varieties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Trends Overview */}
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

      {/* Price Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Market Prices</CardTitle>
          <CardDescription>Latest prices from major agricultural markets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPrices.map((item, index) => {
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

      {/* Price Alerts */}
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

      {/* Market Analysis */}
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
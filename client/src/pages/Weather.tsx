import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CloudSun, Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, Eye, AlertTriangle } from "lucide-react";

export function Weather() {
  const currentWeather = {
    location: "Your Farm Location",
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    uvIndex: 6,
    icon: CloudSun
  };

  const forecast = [
    { day: "Today", high: 30, low: 22, condition: "Sunny", icon: Sun, rain: 10 },
    { day: "Tomorrow", high: 28, low: 20, condition: "Partly Cloudy", icon: CloudSun, rain: 20 },
    { day: "Wed", high: 25, low: 18, condition: "Cloudy", icon: Cloud, rain: 60 },
    { day: "Thu", high: 23, low: 16, condition: "Rainy", icon: CloudRain, rain: 80 },
    { day: "Fri", high: 26, low: 19, condition: "Partly Cloudy", icon: CloudSun, rain: 30 },
    { day: "Sat", high: 29, low: 21, condition: "Sunny", icon: Sun, rain: 5 },
    { day: "Sun", high: 31, low: 23, condition: "Sunny", icon: Sun, rain: 5 },
  ];

  const alerts = [
    {
      type: "warning",
      title: "Heavy Rain Expected",
      message: "Expect 40-60mm rainfall on Thursday. Consider postponing spraying activities.",
      time: "2 hours ago"
    },
    {
      type: "info",
      title: "Optimal Irrigation Window",
      message: "Low humidity and moderate temperatures ideal for watering tomorrow morning.",
      time: "6 hours ago"
    }
  ];

  const farmingAdvice = [
    {
      icon: Droplets,
      title: "Irrigation Recommendation",
      advice: "Current soil moisture is adequate. Next watering recommended in 2-3 days.",
      status: "good"
    },
    {
      icon: Wind,
      title: "Spraying Conditions",
      advice: "Wind speed too high for pesticide application. Wait for calmer conditions.",
      status: "warning"
    },
    {
      icon: Sun,
      title: "Field Work Window",
      advice: "Excellent conditions for harvesting and field operations until Thursday.",
      status: "good"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudSun className="h-6 w-6 text-primary" />
            Weather & Farm Alerts
          </CardTitle>
          <CardDescription>
            Real-time weather data and farming recommendations
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Current Weather */}
      <Card>
        <CardHeader>
          <CardTitle>Current Conditions</CardTitle>
          <CardDescription>{currentWeather.location}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <currentWeather.icon className="h-16 w-16 text-primary" />
              <div>
                <div className="text-4xl font-bold">{currentWeather.temperature}°C</div>
                <div className="text-muted-foreground">{currentWeather.condition}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-1" />
              <div className="text-2xl font-bold">{currentWeather.humidity}%</div>
              <div className="text-sm text-muted-foreground">Humidity</div>
            </div>
            
            <div className="text-center p-3 bg-muted rounded-lg">
              <Wind className="h-6 w-6 text-green-500 mx-auto mb-1" />
              <div className="text-2xl font-bold">{currentWeather.windSpeed}</div>
              <div className="text-sm text-muted-foreground">km/h Wind</div>
            </div>
            
            <div className="text-center p-3 bg-muted rounded-lg">
              <Eye className="h-6 w-6 text-purple-500 mx-auto mb-1" />
              <div className="text-2xl font-bold">{currentWeather.visibility}</div>
              <div className="text-sm text-muted-foreground">km Visibility</div>
            </div>
            
            <div className="text-center p-3 bg-muted rounded-lg">
              <Sun className="h-6 w-6 text-orange-500 mx-auto mb-1" />
              <div className="text-2xl font-bold">{currentWeather.uvIndex}</div>
              <div className="text-sm text-muted-foreground">UV Index</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Alerts */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Weather Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border ${
                alert.type === 'warning' ? 'bg-warning/10 border-warning' : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{alert.title}</h4>
                  <Badge variant={alert.type === 'warning' ? 'destructive' : 'secondary'}>
                    {alert.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                <span className="text-xs text-muted-foreground">{alert.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* 7-Day Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>7-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {forecast.map((day, index) => {
              const Icon = day.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 text-sm font-medium">{day.day}</div>
                    <Icon className="h-6 w-6 text-primary" />
                    <div className="flex-1">
                      <div className="font-medium">{day.condition}</div>
                      <div className="text-sm text-muted-foreground">{day.rain}% rain</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{day.high}°</div>
                    <div className="text-sm text-muted-foreground">{day.low}°</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Farming Advice */}
      <Card>
        <CardHeader>
          <CardTitle>Farming Recommendations</CardTitle>
          <CardDescription>Weather-based advice for your farming activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {farmingAdvice.map((advice, index) => {
            const Icon = advice.icon;
            return (
              <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                <Icon className={`h-6 w-6 mt-0.5 ${
                  advice.status === 'good' ? 'text-success' : 'text-warning'
                }`} />
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{advice.title}</h4>
                  <p className="text-sm text-muted-foreground">{advice.advice}</p>
                </div>
                <Badge variant={advice.status === 'good' ? 'default' : 'secondary'}>
                  {advice.status === 'good' ? 'Optimal' : 'Caution'}
                </Badge>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Weather Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-3">
            <Button variant="outline" className="h-16 flex-col gap-2">
              <AlertTriangle className="h-5 w-5" />
              Set Weather Alert
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Thermometer className="h-5 w-5" />
              Soil Temperature
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <CloudRain className="h-5 w-5" />
              Rainfall History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
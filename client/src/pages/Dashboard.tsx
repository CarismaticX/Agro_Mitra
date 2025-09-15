import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Camera, CloudSun, TrendingUp, Leaf, Users, AlertTriangle, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-farmer.jpg";

interface DashboardProps {
  onPageChange: (page: string) => void;
}

export function Dashboard({ onPageChange }: DashboardProps) {
  const services = [
    {
      id: 'advisory',
      title: 'AI Crop Advisory',
      description: 'Get personalized farming advice using AI',
      icon: MessageSquare,
      color: 'bg-primary',
    },
    {
      id: 'pest-detection',
      title: 'Pest & Disease Detection',
      description: 'Upload crop images for instant diagnosis',
      icon: Camera,
      color: 'bg-warning',
    },
    {
      id: 'weather',
      title: 'Weather Alerts',
      description: 'Stay updated with weather forecasts',
      icon: CloudSun,
      color: 'bg-blue-500',
    },
    {
      id: 'market',
      title: 'Market Prices',
      description: 'Check latest crop prices and trends',
      icon: TrendingUp,
      color: 'bg-success',
    },
  ];

  const stats = [
    { label: 'Farmers Helped', value: '10,000+', icon: Users },
    { label: 'Crops Monitored', value: '50+', icon: Leaf },
    { label: 'Issues Resolved', value: '5,000+', icon: CheckCircle },
    { label: 'Alerts Sent', value: '15,000+', icon: AlertTriangle },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Modern farmer in agricultural field" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <CardContent className="relative p-8 md:p-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Smart Farming
              <span className="text-primary block">Made Simple</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              AI-powered agricultural advisory system to help farmers make informed decisions, 
              detect crop issues early, and maximize yields.
            </p>
            <Button 
              size="lg" 
              className="h-12 px-8"
              onClick={() => onPageChange('advisory')}
            >
              Start Advisory Chat
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Card 
              key={service.id} 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => onPageChange(service.id)}
            >
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Open Service
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Stats Section */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Impact</CardTitle>
          <CardDescription>Our reach and success in supporting farmers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center mb-2">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common farming tasks and information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Leaf className="h-5 w-5" />
              Crop Calendar
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <AlertTriangle className="h-5 w-5" />
              Emergency Help
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Users className="h-5 w-5" />
              Farmer Network
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
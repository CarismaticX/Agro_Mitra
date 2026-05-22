import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  CloudSun,
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  AlertTriangle
} from "lucide-react";

export function Weather() {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [location, setLocation] = useState("Jabalpur");

  const fetchWeather = async (city: string) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://agro-mitra-backend.onrender.com/api/weather?city=${city}`
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const current = data.current;
      const forecastRaw = data.forecast;

      let IconNow = Sun;

      if (current.weather[0].main.includes("Cloud"))
        IconNow = CloudSun;

      if (current.weather[0].main.includes("Rain"))
        IconNow = CloudRain;

      setCurrentWeather({
        location: current.name,

        temperature: Math.round(
          current.main.temp
        ),

        condition:
          current.weather[0].description,

        humidity:
          current.main.humidity,

        windSpeed:
          current.wind.speed,

        visibility:
          (
            current.visibility / 1000
          ).toFixed(1),

        uvIndex: 6,

        icon: IconNow
      });

      const dailyForecast =
        forecastRaw.list
          .filter(
            (_: any, i: number) =>
              i % 8 === 0
          )

          .slice(0, 7)

          .map(
            (
              item: any,
              idx: number
            ) => {
              let Icon = Sun;

              if (
                item.weather[0].main.includes(
                  "Cloud"
                )
              )
                Icon = Cloud;

              if (
                item.weather[0].main.includes(
                  "Rain"
                )
              )
                Icon = CloudRain;

              return {
                day:
                  idx === 0
                    ? "Today"
                    : new Date(
                        item.dt * 1000
                      ).toLocaleDateString(
                        "en-US",
                        {
                          weekday:
                            "short"
                        }
                      ),

                high: Math.round(
                  item.main.temp_max
                ),

                low: Math.round(
                  item.main.temp_min
                ),

                condition:
                  item.weather[0]
                    .description,

                icon: Icon,

                rain: Math.round(
                  item.pop * 100
                )
              };
            }
          );

      setForecast(
        dailyForecast
      );

    } catch (err: any) {
      setError(
        err.message
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(location);
  }, []);

  if (loading)
    return (
      <div className="p-4">
        Loading weather...
      </div>
    );

  if (error)
    return (
      <div className="p-4 text-red-500">
        {error}
      </div>
    );

  if (!currentWeather)
    return (
      <div>
        No weather
      </div>
    );

  return (
    <div className="space-y-6">

      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2">

            <CloudSun className="h-6 w-6" />

            Weather &
            Farming Alerts

          </CardTitle>

          <CardDescription>

            Live weather +
            farm advice

          </CardDescription>

        </CardHeader>

        <CardContent>

          <div className="flex gap-2">

            <input
              value={location}

              onChange={(e)=>
                setLocation(
                  e.target.value
                )
              }

              className="border p-2 rounded w-full"

              placeholder="Enter city"
            />

            <Button
              onClick={() =>
                fetchWeather(
                  location
                )
              }
            >
              Fetch
            </Button>

          </div>

        </CardContent>

      </Card>

      <Card>

        <CardHeader>

          <CardTitle>
            Current Weather
          </CardTitle>

          <CardDescription>
            {
              currentWeather.location
            }
          </CardDescription>

        </CardHeader>

        <CardContent>

          <div className="flex items-center gap-4">

            <currentWeather.icon className="h-16 w-16" />

            <div>

              <div className="text-4xl font-bold">

                {
                  currentWeather.temperature
                }°C

              </div>

              <div>

                {
                  currentWeather.condition
                }

              </div>

            </div>

          </div>

        </CardContent>

      </Card>

      <Card>

        <CardHeader>

          <CardTitle>
            7 Day Forecast
          </CardTitle>

        </CardHeader>

        <CardContent>

          <div className="space-y-3">

            {forecast.map(
              (
                day,
                index
              ) => {

                const Icon =
                  day.icon;

                return (

                  <div
                    key={index}

                    className="border rounded p-3 flex justify-between"
                  >

                    <div className="flex gap-4">

                      <div>
                        {day.day}
                      </div>

                      <Icon className="h-5 w-5" />

                      <div>
                        {
                          day.condition
                        }
                      </div>

                    </div>

                    <div>

                      {
                        day.high
                      }°

                      /

                      {
                        day.low
                      }°

                    </div>

                  </div>

                );
              }
            )}

          </div>

        </CardContent>

      </Card>

    </div>
  );
}
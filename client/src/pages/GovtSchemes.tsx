"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import schemeDetails from "../data/schemeDetails";

interface Scheme {
  name_of_mission___scheme: string;
  description?: string;
  benefit?: string;
  eligibility?: string;
}

export default function GovernmentSchemes() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSchemes() {
      try {
        const res = await fetch(
          "https://api.data.gov.in/resource/9afdf346-16d7-4f17-a2e3-684540c59a77?api-key=579b464db66ec23bdd000001e079c93c9aad4ab956c6f5da9f2521ec&format=json&limit=14"
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        // Merge API data with local details
        const enriched: Scheme[] = (data.records || []).map((item: Scheme) => ({
          ...item,
          ...schemeDetails[item.name_of_mission___scheme], // enrich from local file
        }));

        setSchemes(enriched);
      } catch (error) {
        console.error("Error fetching schemes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSchemes();
  }, []);

  if (loading) {
    return <p className="text-muted-foreground">Loading schemes...</p>;
  }

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Government Schemes</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Explore the latest agricultural schemes and benefits available for farmers.
        </p>

        {schemes.length === 0 ? (
          <p className="text-muted-foreground">No schemes available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schemes.map((scheme, i) => (
              <Card
                key={i}
                className="border border-border bg-card shadow-sm rounded-lg hover:shadow-md transition"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {scheme.name_of_mission___scheme}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {scheme.description || "No description available"}
                  </p>
                  <div className="mb-2">
                    <span className="px-3 py-1 text-sm rounded-full bg-accent text-accent-foreground">
                      Benefit: {scheme.benefit || "Not specified"}
                    </span>
                  </div>
                  <p className="text-sm font-medium">
                    <span className="font-semibold">Eligibility: </span>
                    {scheme.eligibility || "Not specified"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

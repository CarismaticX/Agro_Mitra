import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/pages/Dashboard";
import { AIAdvisory } from "@/pages/AIAdvisory";
import { PestDetection } from "@/pages/PestDetection";
import { Weather } from "@/pages/Weather";
import { MarketPrices } from "@/pages/MarketPrices";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "advisory":
        return <AIAdvisory />;
      case "pest-detection":
        return <PestDetection />;
      case "weather":
        return <Weather />;
      case "market":
        return <MarketPrices />;
      default:
        return <Dashboard onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      
      {/* Main Content */}
      <div className="md:ml-72 p-4 md:p-6 pt-20 md:pt-6">
        {renderPage()}
      </div>
    </div>
  );
};

export default Index;

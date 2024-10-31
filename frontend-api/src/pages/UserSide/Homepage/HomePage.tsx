import React, { useEffect, useState } from "react";
import BannerSection from "../../../components/BannerSection";
import FeaturesSection from "../../../components/FeaturesSection";
import AdventureSection from "../../../components/AdventureSection";
import FooterSection from "../../../components/FooterSection";
import Features from "../../../components/Features";

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 2000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div className="overflow-hidden">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="loader">Loading...</div>
          <div className="loader animate-spin rounded-full border-t-4 border-b-4 border-blue-500 h-16 w-16"></div>
        </div>
      ) : (
        <>
          <BannerSection />
          <FeaturesSection />
          <AdventureSection />
          <Features />
          <FooterSection />
        </>
      )}
    </div>
  );
};

export default HomePage;

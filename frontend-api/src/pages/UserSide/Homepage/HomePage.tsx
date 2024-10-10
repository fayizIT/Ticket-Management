import React from 'react';
import BannerSection from '../../../components/BannerSection'; 
import FeaturesSection from '../../../components/FeaturesSection';
import AdventureSection from '../../../components/AdventureSection'; 
import FooterSection from '../../../components/FooterSection'; 
import Features from '../../../components/Features';

const HomePage: React.FC = () => {
  return (
    <div className="overflow-hidden">
      <BannerSection />
      <FeaturesSection />
      <AdventureSection />
      <Features />
      <FooterSection />
    </div>
  );
};

export default HomePage;

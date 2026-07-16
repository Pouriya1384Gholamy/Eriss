import React, { useState } from 'react';
import HeroSection from './Components/HeroSection'; // یا Orpgage اگر نام رو عوض نکردید
import CategoryCards from './Components/CategoryCards';
import FAQAccordion from './Components/FAQAccordion';
import SupportCTA from './Components/SupportCTA';
import FeaturesSection from './Components/FeaturesSection';
import Header from '../../Components/layout/Header'
import Footer from '../../Components/layout/Footer'
import UnderHeader from '../../Components/layout/UnderHeader'
import { faqsData, categoriesData, featuresData } from '../../data/faqsData';

const FaqPage = () => {
  const [openId, setOpenId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFaqs = faqsData.filter(faq => {
    const matchesSearch = faq.question.includes(searchQuery) || faq.answer.includes(searchQuery);
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return faqsData.length;
    return faqsData.filter(faq => faq.category === categoryId).length;
  };

  return (
    <div className="bg-gradient-to-br from-[#F8F5F0] via-white to-[#F0EDE8] min-h-screen font-sans" dir="rtl">
      <Header />
      <UnderHeader />
      <HeroSection 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <CategoryCards 
        categories={categoriesData}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        getCategoryCount={getCategoryCount}
      />
      
      <FAQAccordion 
        faqs={filteredFaqs}
        openId={openId}
        setOpenId={setOpenId}
        activeCategory={activeCategory}
        categories={categoriesData}
      />
      
      <SupportCTA />
      
      <FeaturesSection features={featuresData} />
      <Footer />
    </div>
  );
};

export default FaqPage;
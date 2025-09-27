import React, { useState, useRef, useEffect } from 'react';
import geminiService from '../services/geminiService';

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Restaurants');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const categoryItems = {
    'Restaurants': Array.from({ length: 8 }, (_, index) => ({
      title: `Restaurant ${index + 1}`,
      image: `https://placehold.co/400x300/4F46E5/ffffff?text=Restaurant+${index + 1}`,
    })),
    'Cafes': Array.from({ length: 8 }, (_, index) => ({
      title: `Cafe ${index + 1}`,
      image: `https://placehold.co/400x300/F59E0B/ffffff?text=Cafe+${index + 1}`,
    })),
    'Tourist Sites': Array.from({ length: 8 }, (_, index) => ({
      title: `Tourist Site ${index + 1}`,
      image: `https://placehold.co/400x300/10B981/ffffff?text=Site+${index + 1}`,
    })),
    'Hotel Booking': Array.from({ length: 8 }, (_, index) => ({
      title: `Hotel Booking ${index + 1}`,
      image: `https://placehold.co/400x300/10B971/ffffff?text=Site+${index + 1}`,
    })),
    'Cab Booking': Array.from({ length: 5 }, (_, index) => ({
      title: `Cab Booking ${index + 1}`,
      image: `https://placehold.co/400x300/12B981/ffffff?text=Site+${index + 1}`,
    })),
  };

  const handleItemClick = (title) => {
    console.log(`${title} tapped!`);
  };

  // AI-powered search suggestions
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 2 && geminiService.isConfigured()) {
      setIsLoadingSuggestions(true);
      try {
        const suggestions = await geminiService.getSearchSuggestions(value, activeTab);
        setAiSuggestions(suggestions);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error getting AI suggestions:', error);
        setAiSuggestions([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    } else {
      setAiSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const filteredItems = categoryItems[activeTab]?.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Ref and state for rotation
  const imgRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [isImgInView, setIsImgInView] = useState(true);

  useEffect(() => {
    // Intersection Observer to check if img is in viewport
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsImgInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (imgRef.current) observer.observe(imgRef.current);
    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isImgInView) return;
    // Faster and smoother rotation
    const interval = setInterval(() => {
      const randomDeg = Math.floor(Math.random() * 361) - 180; // -180 to 180 deg
      setRotation((prev) => {
        // Smoothly interpolate to new angle
        const diff = randomDeg - prev;
        return prev + diff * 0.5;
      });
    }, 400); // Even faster interval for more dynamic effect
    return () => clearInterval(interval);
  }, [isImgInView]);

  return (
    <div className="min-h-screen text-white font-sans">
      {/* 
      
      bg-gradient-to-br from-blue-900 via-gray-900 to-indigo-900 transition-colors duration-1000

      App Bar */}
      <header className="p-4 shadow-md top-0 z-10">
        <div className="flex flex-col items-center">
          <h1
            className="text-6xl mb-4 text-center flex flex-row items-center animate-fade-in-down"
            style={{
              fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
              letterSpacing: '0.04em',
              fontWeight: 800,
            }}
          >
            <img
              ref={imgRef}
              src="https://tse4.mm.bing.net/th/id/OIP.4ucBuphssC5hEgJf-G6y6QHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
              className="h-20 w-20 mr-8 rounded-full transition-transform duration-500 drop-shadow-xl hover:scale-110"
              style={{ transform: `rotate(${rotation}deg)` }}
              alt=""
            />
            <span className=" text-white">
              Explore
            </span>
          </h1>
          {/* Search Bar */}
          <div className="relative w-full max-w-xl mb-6 animate-fade-in-up">
            <input
              type="text"
              placeholder="Search with AI suggestions..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(searchQuery.length > 2 && aiSuggestions.length > 0)}
              className="w-full pl-12 pr-4 py-4 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg shadow-lg transition-all duration-300 focus:scale-105"
              style={{ fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif" }}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-blue-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            
            {/* AI Suggestions Dropdown */}
            {showSuggestions && (aiSuggestions.length > 0 || isLoadingSuggestions) && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50 max-h-60 overflow-y-auto">
                {isLoadingSuggestions ? (
                  <div className="p-3 text-center text-gray-400">
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Getting AI suggestions...
                    </div>
                  </div>
                ) : (
                  aiSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-700 text-white text-sm transition-colors border-b border-gray-700 last:border-b-0"
                    >
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {suggestion}
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
          {/* Tab Bar */}
          <div className="flex justify-center w-full py-2 overflow-x-auto animate-fade-in-up">
            {Object.keys(categoryItems).map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveTab(category);
                  setSearchQuery('');
                }}
                className={`flex-shrink-0 px-6 py-2 mx-1 rounded-full font-semibold transition-all duration-300
                  ${activeTab === category
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'
                  }`}
                style={{ fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif" }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>
      {/* Content */}
      <main className="p-9 pt-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-blue-500/30 group animate-pop-in"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <button
                onClick={() => handleItemClick(item.title)}
                className="w-full text-left focus:outline-none"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-52 object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1 group-hover:shadow-2xl"
                  />
                  <span className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-xs px-3 py-1 rounded-full shadow-lg opacity-80 group-hover:opacity-100 transition-all duration-300">
                    {activeTab}
                  </span>
                </div>
                <div className="p-4 text-center">
                  <p className="font-semibold text-lg tracking-wide" style={{ fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif" }}>
                    {item.title}
                  </p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </main>
      {/* Animations */}
      <style>
        {`
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-30px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.9);}
          100% { opacity: 1; transform: scale(1);}
        }
        .animate-fade-in-down { animation: fade-in-down 0.7s both; }
        .animate-fade-in-up { animation: fade-in-up 0.7s both; }
        .animate-pop-in { animation: pop-in 0.5s both; }
        `}
      </style>
    </div>
  );
};

export default ExplorePage;

import React, { useState } from 'react';
// import SellerSignUpModal from './signup';
import ExplorePage from './explore/explore';
import MedicalPage from './medical/medical';
// import profileSection from './profile';
// import sellerInfo from './sellerinfo';
import LoginPage from './login';
import ThreeAnimation from './animation';
import AIChat from './components/AIChat';
import TravelPlanner from './components/TravelPlanner';
 


const TravelWebsite = () => {
    const [isPriceListModalOpen, setIsPriceListModalOpen] = useState(false);
    const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isExploreOpen , setIsExploreOpen] = useState(false);
    const [isMedicalOpen , setIsMedicalOpen] = useState(false);
    // const [isProfileSectionOpen, setIsProfileSectionOpen] = useState(false);
    // const [isSellerInfoOpen, setIsSellerInfoOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isAIChatOpen, setIsAIChatOpen] = useState(false);
    const [isTravelPlannerOpen, setIsTravelPlannerOpen] = useState(false);
    const [activePage, setActivePage] = useState("home"); // 'main', 'explore', 'medical'

    const verifiedVendors = [
        
        {
            id: 1,
            name: 'Rajesh Guide Services',
            type: 'Tour Guide',
            rating: 4.9,
            image: 'https://placehold.co/100x100/FEE2E2/EF4444?text=RG'
        },
        {
            id: 2,
            name: 'Shyam Auto Rentals',
            type: 'Auto Driver',
            rating: 4.7,
            image: 'https://placehold.co/100x100/FEE2E2/EF4444?text=SA'
        },
        {
            id: 3,
            name: 'Riya Handloom',
            type: 'Souvenir Shop',
            rating: 4.8,
            image: 'https://placehold.co/100x100/FEE2E2/EF4444?text=RH'
        },
    ];

    const priceList = [
        { service: 'Auto-Rickshaw Ride', details: 'Approximate price per km', price: '₹15' },
        { service: 'Local Tour Guide', details: 'Half-day (4 hours)', price: '₹800' },
        { service: 'Local Food Meal', details: 'Standard Thali', price: '₹150' },
        { service: 'Souvenir', details: 'Small Handicraft', price: '₹50 - ₹200' },
     ];

    const handleRegistration = (formData) => {
        console.log("User registered with data:", formData);
        alert(`Sign-up successful, ${formData.name}! Welcome to TripPal.`);
        setIsSignUpModalOpen(false);
    };

    const CompassIcon = (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19.5L12 4.5M12 19.5L16.5 15M12 19.5L7.5 15M12 4.5L16.5 9M12 4.5L7.5 9"></path>
        </svg>
    );

    const StarIcon = (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
    );

    const HelpCircleIcon = (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <path d="M12 17h.01"></path>
        </svg>
    );

    const DollarSignIcon = (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
    );

    const MenuIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
        </svg>
    );

    const XIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    );

    // Main render logic

    if (activePage === 'explore') {
        return (
            <div className="animate-slide-down min-h-screen bg-gray-900 text-white font-sans antialiased">
                <div className='p-4 flex justify-end'>
                    <button className="m-2 px-4 py-2 bg-blue-600 rounded text-white"
                    onClick={() => setActivePage('home')}>Back</button>
                </div>
                <ExplorePage />
            </div>
        );
    }

    if (activePage === 'medical') {
        return (
            <div className="animate-slide-down  min-h-screen bg-gray-900 text-white font-sans antialiased">
                <div className='p-4 flex justify-end'>
                    <button className="m-4 px-4 py-2 bg-blue-600 rounded text-white"
                    onClick={() => setActivePage('home')}>Back</button>
                </div>
                <MedicalPage />
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white font-sans antialiased">
             
              <ThreeAnimation/>

            <header className=" top-0 z-50">

                {/* bg-[#102C57]  shadow-sm border-b border-[#102C57]*/}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex justify-between items-center h-16">

                        <div className="flex items-center">
                            <CompassIcon className="h-14 w-14 text-blue-400" />
                            <span className="ml-2  text-4xl font-bold text-[#EADBC8]">TripPal</span>
                        </div>

                        {/* Desktop Navbar */}
                        <nav className="hidden md:flex items-center space-x-8">

                            <button onClick={() => setActivePage('home')}
                                className={`text-white hover:text-gray-300 transition-colors px-2 py-1 rounded 
                                    ${activePage === 'home' ? 'border-b-2 border-[#1b9986] text-[#EADBC8]' : ''}`}>Home</button>

                            <button onClick={() => setActivePage('explore')}
                                className={`text-white hover:text-gray-300 transition-colors px-2 py-1 rounded 
                                    ${activePage === 'explore' ? 'border-b-2 border-[#1b9986] text-[#EADBC8]' : ''}`}>Explore</button>

                            <button onClick={() => setActivePage('medical')}
                                className={`text-white hover:text-gray-300 transition-colors px-2 py-1 rounded 
                                    ${activePage === 'medical' ? 'border-b-2 border-[#1b9986] text-[#EADBC8]' : ''}`}>Medical Services</button>

                            <button onClick={() => setIsLoginOpen(true)}
                                className=" border-1 border-[#1b9986] bg-gradient-to-br from-[#11676a] via-gray-900 to-[#1b9986] transition-colors duration-100 text-[#EADBC8] px-4 py-2 rounded-md">Login</button>
{/* 
                            <button onClick={() => setIsSellerInfoOpen(true)}
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">Seller Info</button> */}
                        
                        </nav>

                        {/* Mobile Navbar */}
                        <div className="flex items-center md:hidden space-x-4">

                            <button onClick={() => setIsSOSModalOpen(true)}
                                className="bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-red-700 transition-colors transform hover:scale-105 animate-pulse">SOS</button>

                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md">
                                {isMenuOpen ? <XIcon /> : <MenuIcon />}</button>

                        </div>

                    </div>

                </div>

                        {isMenuOpen && (
                            <div className="md:hidden z-1 bg-gray-900 absolute w-full left-0 py-4 shadow-lg animate-fade-in-down">

                                <div className="flex flex-col items-center space-y-4">

                                    <button onClick={() => { setActivePage('home'); setIsMenuOpen(false); }}
                                        className={`block text-gray-300 hover:text-white transition-colors px-2 py-1 rounded w-full text-left
                                            ${activePage === 'home' ? 'bg-blue-700 text-white' : ''}`}>Home</button>

                                    <button onClick={() => { setActivePage('explore'); setIsMenuOpen(false); }}
                                        className={`block text-gray-300 hover:text-white transition-colors px-2 py-1 rounded w-full text-left
                                            ${activePage === 'explore' ? 'bg-blue-700 text-white' : ''}`}>Explore</button>

                                    <button onClick={() => { setActivePage('medical'); setIsMenuOpen(false); }}
                                        className={`block text-gray-300 hover:text-white transition-colors px-2 py-1 rounded w-full text-left
                                            ${activePage === 'medical' ? 'bg-blue-700 text-white' : ''}`}>Medical Services</button>

                                    <button onClick={() => { setIsLoginOpen(true); setIsMenuOpen(false); }}
                                        className="w-4/5 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Login</button>
        {/* 
                                    <button onClick={() => { setIsSellerInfoOpen(true); setIsMenuOpen(false); }}
                                        className="w-4/5 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">Seller Info</button> */}
                                </div>

                            </div>
                )}
            </header>

            <main className="py-12">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <section className="text-center mb-16">

                        <h1 className="text-4xl md:text-5xl font-bold text-[#EADBC8] mb-4 animate-fade-in-down">Explore Tourist Places, Safely</h1>
                        
                        <p className="text-lg md:text-xl text-[#EADBC8] animate-fade-in-up">Your trusted guide to authentic experiences, fair prices, and instant help.</p>
                    
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

                        <button onClick={() => setIsPriceListModalOpen(true)} className="bg-gradient-to-br from-white via-[#1b9986] to-white transition-colors rounded-xl shadow-lg p-6 text-center transform duration-1000 hover:scale-105 hover:shadow-2xl">
                            <DollarSignIcon className="h-12 w-12 text-green-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white">Check Fair Prices</h3>
                            <p className="text-gray-400 mt-2">View transparent rates for local services.</p>
                        </button>

                        <button onClick={() => setIsAIChatOpen(true)} className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <svg className="h-12 w-12 text-white mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-white">AI Assistant</h3>
                            <p className="text-gray-200 mt-2">Get personalized travel advice.</p>
                        </button>

                        <button onClick={() => setIsTravelPlannerOpen(true)} className="bg-gradient-to-br from-green-600 to-teal-600 rounded-xl shadow-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <svg className="h-12 w-12 text-white mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.553-.894L9 8m11.953 2.5a1 1 0 01-.893.5H14m-1.5-1.5l1.5-1.5M4 11l5-3m11 8l-5 3m0-11a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-white">AI Travel Planner</h3>
                            <p className="text-gray-200 mt-2">Create custom itineraries.</p>
                        </button>

                        <button className="bg-[#EADBC8] rounded-xl shadow-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <StarIcon className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white">Community Ratings</h3>
                            <p className="text-gray-400 mt-2">See what other travelers say.</p>
                        </button>

                    </section>

                    <section className="mb-12">

                        <div className="flex justify-between items-center mb-6">

                            <h2 className="text-2xl font-bold text-white">Verified Vendors</h2>

                            <a href="#" className="text-blue-400 hover:underline">View All &gt;</a>

                        </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {verifiedVendors.map(vendor => (
                                <div key={vendor.id} className="bg-gray-800 rounded-xl shadow-lg p-4 flex items-center space-x-4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                    <img src={vendor.image} alt={vendor.name} className="h-16 w-16 rounded-full object-cover border-2 border-red-500" />
                                    <div>
                                        <h4 className="text-lg font-semibold">{vendor.name}</h4>
                                        <p className="text-sm text-gray-400">{vendor.type}</p>
                                        <div className="flex items-center text-yellow-400">
                                            <StarIcon className="h-4 w-4 fill-current" />
                                            <span className="ml-1 text-sm text-gray-300">{vendor.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </section>
                </div>
                
            </main>


                   <LoginPage
                    isOpen={isLoginOpen}
                    onClose={() => setIsLoginOpen(false)}
                    />

                   {/* <SellerSignUpModal
                        isOpen={isSignUpModalOpen}kfhrijgo45jogp5
                        onClose={() => setIsSignUpModalOpen(false)}
                        onRegister={handleRegistration}
                    /> */}
                    
                    <ExplorePage
                        isOpen={isExploreOpen}
                        onClose={() => setIsExploreOpen(false)}
                    />

                    <MedicalPage
                        isOpen={isMedicalOpen}
                        onClose={() => setIsMedicalOpen(false)}
                    />

                    <AIChat
                        isOpen={isAIChatOpen}
                        onClose={() => setIsAIChatOpen(false)}
                        context={{ currentPage: activePage }}
                    />

                    <TravelPlanner
                        isOpen={isTravelPlannerOpen}
                        onClose={() => setIsTravelPlannerOpen(false)}
                    />

                    {/* <sellerInfo
                        isOpen={isSellerInfoOpen}
                        onClose={() => setIsSellerInfoOpen(false)}
                    /> */}
                </div>
            );
};

export default TravelWebsite;
 
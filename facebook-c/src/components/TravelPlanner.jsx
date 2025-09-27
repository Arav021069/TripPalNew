import React, { useState } from 'react';
import geminiService from '../services/geminiService';

const TravelPlanner = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    destination: '',
    days: '3',
    interests: '',
    budget: 'moderate',
    travelStyle: 'leisure'
  });
  const [itinerary, setItinerary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerateItinerary = async () => {
    if (!formData.destination.trim()) {
      setError('Please enter a destination');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const response = await geminiService.generateTravelItinerary(
        formData.destination,
        formData.days,
        formData.interests,
        formData.budget
      );
      setItinerary(response);
    } catch (err) {
      setError('Failed to generate itinerary. Please check your API key configuration.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setFormData({
      destination: '',
      days: '3',
      interests: '',
      budget: 'moderate',
      travelStyle: 'leisure'
    });
    setItinerary('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.553-.894L9 8m11.953 2.5a1 1 0 01-.893.5H14m-1.5-1.5l1.5-1.5M4 11l5-3m11 8l-5 3m0-11a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">AI Travel Planner</h3>
              <p className="text-gray-400">Create your perfect itinerary</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Form Section */}
          <div className="w-1/2 p-6 border-r border-gray-700 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Destination *
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  placeholder="e.g., Paris, Tokyo, New York"
                  className="w-full bg-gray-800 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Duration (days)
                </label>
                <select
                  name="days"
                  value={formData.days}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">1 day</option>
                  <option value="2">2 days</option>
                  <option value="3">3 days</option>
                  <option value="5">5 days</option>
                  <option value="7">1 week</option>
                  <option value="10">10 days</option>
                  <option value="14">2 weeks</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Interests
                </label>
                <input
                  type="text"
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  placeholder="e.g., museums, food, nature, history"
                  className="w-full bg-gray-800 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Budget Level
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="budget">Budget</option>
                  <option value="moderate">Moderate</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Travel Style
                </label>
                <select
                  name="travelStyle"
                  value={formData.travelStyle}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="leisure">Leisure</option>
                  <option value="adventure">Adventure</option>
                  <option value="cultural">Cultural</option>
                  <option value="business">Business</option>
                  <option value="family">Family</option>
                </select>
              </div>

              {error && (
                <div className="bg-red-600 text-white p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={handleGenerateItinerary}
                  disabled={isGenerating || !formData.destination.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Generating...
                    </div>
                  ) : (
                    'Generate Itinerary'
                  )}
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="w-1/2 p-6 overflow-y-auto">
            <h4 className="text-lg font-semibold text-white mb-4">Your Itinerary</h4>
            {itinerary ? (
              <div className="prose prose-invert max-w-none">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-gray-100 text-sm leading-relaxed">
                    {itinerary}
                  </pre>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(itinerary)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
                  >
                    Copy Itinerary
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                  >
                    Print
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.553-.894L9 8m11.953 2.5a1 1 0 01-.893.5H14m-1.5-1.5l1.5-1.5M4 11l5-3m11 8l-5 3m0-11a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>Fill in the form and click "Generate Itinerary" to create your personalized travel plan</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPlanner;

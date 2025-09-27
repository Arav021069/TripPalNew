import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Get the Gemini Pro model
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

class GeminiService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!this.apiKey || this.apiKey === 'your_gemini_api_key_here') {
      console.warn('Gemini API key not configured. Please set VITE_GEMINI_API_KEY in your .env file');
    }
  }

  // Check if API is configured
  isConfigured() {
    return this.apiKey && this.apiKey !== 'your_gemini_api_key_here';
  }

  // Get travel recommendations based on location and preferences
  async getTravelRecommendations(location, preferences = {}) {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key not configured');
    }

    const prompt = `You are a travel expert. Provide detailed recommendations for ${location} based on these preferences:
    - Budget: ${preferences.budget || 'moderate'}
    - Duration: ${preferences.duration || '3-5 days'}
    - Interests: ${preferences.interests || 'general sightseeing'}
    - Travel style: ${preferences.travelStyle || 'leisure'}

    Please provide:
    1. Top 5 must-visit attractions
    2. Best local restaurants (with cuisine types)
    3. Recommended accommodations (budget-friendly options)
    4. Transportation tips
    5. Cultural tips and local customs
    6. Best time to visit each attraction

    Format your response in a structured way with clear sections.`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error getting travel recommendations:', error);
      throw new Error('Failed to get travel recommendations');
    }
  }

  // Get AI-powered search suggestions
  async getSearchSuggestions(query, category = 'general') {
    if (!this.isConfigured()) {
      return [];
    }

    const prompt = `Based on the search query "${query}" in the ${category} category, provide 5 relevant and helpful search suggestions that a traveler might be looking for. Keep suggestions concise and practical.`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const suggestions = response.text().split('\n').filter(s => s.trim()).slice(0, 5);
      return suggestions.map(s => s.replace(/^\d+\.\s*/, '').trim());
    } catch (error) {
      console.error('Error getting search suggestions:', error);
      return [];
    }
  }

  // Get medical advice and recommendations
  async getMedicalAdvice(symptoms, location) {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key not configured');
    }

    const prompt = `You are a medical assistant providing travel health advice. A traveler in ${location} is experiencing: ${symptoms}

    Please provide:
    1. Immediate first aid steps
    2. Whether they should seek medical attention urgently
    3. Common over-the-counter medications that might help
    4. Local emergency numbers for ${location}
    5. General health tips for travelers in this region

    IMPORTANT: This is for informational purposes only and should not replace professional medical advice. Always recommend consulting a healthcare professional for serious symptoms.`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error getting medical advice:', error);
      throw new Error('Failed to get medical advice');
    }
  }

  // Get personalized travel itinerary
  async generateTravelItinerary(destination, days, interests, budget) {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key not configured');
    }

    const prompt = `Create a detailed ${days}-day travel itinerary for ${destination} with these specifications:
    - Interests: ${interests}
    - Budget level: ${budget}
    - Include specific attractions, restaurants, and activities for each day
    - Provide time estimates for each activity
    - Include transportation options between locations
    - Suggest local experiences and hidden gems
    - Include practical tips for each day

    Format as a day-by-day breakdown with morning, afternoon, and evening activities.`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating itinerary:', error);
      throw new Error('Failed to generate travel itinerary');
    }
  }

  // Chat with AI assistant
  async chatWithAssistant(message, context = {}) {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key not configured');
    }

    const systemPrompt = `You are TripPal AI, a helpful travel assistant. You help travelers with:
    - Destination recommendations
    - Travel planning and itineraries
    - Local tips and cultural advice
    - Transportation guidance
    - Restaurant and accommodation suggestions
    - Emergency assistance and medical advice
    - General travel questions

    Current context: ${JSON.stringify(context)}
    
    Be friendly, helpful, and provide practical advice. Keep responses concise but informative.`;

    const prompt = `${systemPrompt}\n\nUser: ${message}`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error in AI chat:', error);
      throw new Error('Failed to get AI response');
    }
  }

  // Get local language phrases
  async getLanguagePhrases(destination, phrases = []) {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key not configured');
    }

    const defaultPhrases = [
      'Hello', 'Thank you', 'Please', 'Excuse me', 'Where is...?', 
      'How much?', 'Help', 'Emergency', 'I need a doctor', 'Restaurant'
    ];

    const phrasesToTranslate = phrases.length > 0 ? phrases : defaultPhrases;

    const prompt = `Translate these English phrases to the local language of ${destination}:
    ${phrasesToTranslate.join(', ')}

    For each phrase, provide:
    1. The translation
    2. Pronunciation guide (phonetic)
    3. When to use it

    Focus on the most commonly spoken language in ${destination}.`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error getting language phrases:', error);
      throw new Error('Failed to get language phrases');
    }
  }
}

// Export a singleton instance
export default new GeminiService();

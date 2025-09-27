# Gemini AI Integration in TripPal

This document describes the Gemini AI integration added to the TripPal travel application.

## Features Added

### 1. AI Chat Assistant
- **Location**: `src/components/AIChat.jsx`
- **Functionality**: Interactive chat interface for travel advice
- **Features**:
  - Real-time conversation with AI
  - Quick question suggestions
  - Context-aware responses
  - Error handling for API issues

### 2. AI Travel Planner
- **Location**: `src/components/TravelPlanner.jsx`
- **Functionality**: Generate personalized travel itineraries
- **Features**:
  - Custom destination input
  - Duration selection (1-14 days)
  - Interest-based planning
  - Budget level options
  - Travel style preferences
  - Copy and print functionality

### 3. Enhanced Search with AI Suggestions
- **Location**: `src/explore/explore.jsx`
- **Functionality**: AI-powered search suggestions
- **Features**:
  - Real-time suggestions as you type
  - Category-specific recommendations
  - Loading states and error handling

### 4. AI Medical Assistant
- **Location**: `src/medical/medical.jsx`
- **Functionality**: Medical advice and first aid guidance
- **Features**:
  - Symptom-based advice
  - Emergency guidance
  - Local medical information
  - Disclaimer for medical advice

### 5. Gemini Service Module
- **Location**: `src/services/geminiService.js`
- **Functionality**: Centralized API service
- **Methods**:
  - `getTravelRecommendations()` - Destination recommendations
  - `getSearchSuggestions()` - Search suggestions
  - `getMedicalAdvice()` - Medical guidance
  - `generateTravelItinerary()` - Custom itineraries
  - `chatWithAssistant()` - General chat
  - `getLanguagePhrases()` - Local language help

## Setup Instructions

### 1. Install Dependencies
```bash
cd facebook-c
npm install @google/generative-ai
```

### 2. Configure API Key
1. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a `.env` file in the `facebook-c` directory:
```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```
3. Copy `.env.example` to `.env` and replace the placeholder with your actual API key

### 3. Run the Application
```bash
npm run dev
```

## Usage

### AI Chat Assistant
1. Click the "AI Assistant" button on the home page
2. Type your travel questions
3. Use quick question buttons for common queries
4. Get personalized travel advice

### Travel Planner
1. Click the "AI Travel Planner" button on the home page
2. Fill in destination, duration, interests, and budget
3. Click "Generate Itinerary"
4. Copy or print your personalized itinerary

### Enhanced Search
1. Go to the Explore page
2. Start typing in the search box
3. See AI-powered suggestions appear
4. Click suggestions to use them

### Medical Assistant
1. Go to the Medical Services page
2. Describe your symptoms in the AI Medical Assistant section
3. Click "Get Advice" for immediate guidance
4. Review the advice in the modal

## API Configuration

The Gemini service automatically checks if the API key is configured. If not configured:
- Features will show appropriate error messages
- The application will continue to work without AI features
- Console warnings will indicate missing configuration

## Error Handling

All AI features include comprehensive error handling:
- Network errors
- API key issues
- Rate limiting
- Invalid responses
- User-friendly error messages

## Security Notes

- API key is stored in environment variables
- No sensitive data is logged
- All AI responses include appropriate disclaimers
- Medical advice includes professional consultation recommendations

## Customization

### Adding New AI Features
1. Add new methods to `geminiService.js`
2. Create React components for UI
3. Integrate with existing pages
4. Add proper error handling

### Modifying Prompts
Edit the prompt templates in `geminiService.js` to customize AI responses for your specific use case.

## Troubleshooting

### Common Issues
1. **API Key Not Working**: Ensure the key is correctly set in `.env` file
2. **No AI Responses**: Check browser console for error messages
3. **Slow Responses**: Gemini API may have rate limits
4. **Build Issues**: Ensure all dependencies are installed

### Debug Mode
Set `console.log` statements in `geminiService.js` to debug API calls.

## Future Enhancements

Potential improvements:
- Image analysis for travel photos
- Voice input for chat assistant
- Multi-language support
- Offline mode with cached responses
- User preference learning
- Integration with maps and booking services

#!/usr/bin/env node

/**
 * Setup script for Gemini AI integration
 * This script helps users configure their Gemini API key
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🤖 TripPal Gemini AI Setup');
console.log('========================\n');

console.log('This script will help you configure your Gemini API key for TripPal.\n');

console.log('To get your API key:');
console.log('1. Visit: https://makersuite.google.com/app/apikey');
console.log('2. Sign in with your Google account');
console.log('3. Create a new API key');
console.log('4. Copy the generated key\n');

rl.question('Enter your Gemini API key: ', (apiKey) => {
  if (!apiKey || apiKey.trim() === '') {
    console.log('❌ No API key provided. Setup cancelled.');
    rl.close();
    return;
  }

  const envContent = `# Google Generative AI API Key
# Get your API key from: https://makersuite.google.com/app/apikey
VITE_GEMINI_API_KEY=${apiKey.trim()}
`;

  const envPath = path.join(__dirname, '.env');
  
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ API key saved to .env file');
    console.log('🚀 You can now run "npm run dev" to start the application with AI features!');
  } catch (error) {
    console.log('❌ Error saving API key:', error.message);
    console.log('Please manually create a .env file with:');
    console.log(`VITE_GEMINI_API_KEY=${apiKey.trim()}`);
  }
  
  rl.close();
});

rl.on('close', () => {
  console.log('\nSetup complete! Happy traveling with AI! 🌍✈️');
  process.exit(0);
});

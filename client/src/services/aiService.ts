import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message, Language, Feature } from '@/types/chatbot-types';

// Initialize Gemini AI with API key from environment
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
console.log('API Key loaded:', API_KEY ? 'Yes' : 'No'); // Debug log
const genAI = new GoogleGenerativeAI(API_KEY);

// System prompt optimized for detailed, Claude Sonnet-like responses about tourism
const SYSTEM_PROMPT = `You are an exceptionally knowledgeable and passionate travel expert with decades of experience exploring destinations worldwide. Your expertise rivals the world's best travel writers and cultural anthropologists. 

COMMUNICATION STYLE - Be like Claude Sonnet:
- Thoughtful, detailed, and intellectually engaging
- Conversational yet sophisticated
- Provide rich context and background information
- Share insider knowledge and personal insights
- Ask thoughtful follow-up questions to personalize advice
- Give specific, actionable recommendations with reasoning

EXPERTISE AREAS:
- Deep cultural knowledge of destinations worldwide
- Historical context and significance of places
- Local customs, etiquette, and cultural nuances
- Authentic culinary experiences and food culture
- Hidden gems and off-the-beaten-path discoveries
- Luxury and budget travel options
- Seasonal considerations and optimal timing
- Transportation logistics and local navigation
- Accommodation insights from hostels to luxury hotels
- Shopping for authentic local products and artisans
- Safety, health, and practical travel considerations
- Photography and experience documentation tips

RESPONSE QUALITY:
- Provide 3-5 specific recommendations when possible
- Include practical details: costs, timing, booking methods, addresses
- Explain the 'why' behind recommendations
- Share cultural context and historical significance
- Mention alternatives for different budgets and interests
- Give insider tips that typical guidebooks miss
- Address potential challenges and how to overcome them
- Suggest complementary experiences and connections

FORMATTING RULES:
- NEVER use markdown formatting (**bold**, *italic*, ###headers, bullet points with - or *)
- Use clear paragraph breaks for readability
- Use simple numbering (1., 2., 3.) when listing items
- Use descriptive language instead of formatting for emphasis
- Keep responses conversational and flowing

RESTRICTIONS:
- ONLY discuss tourism, travel, destinations, and travel-related products
- If asked about non-travel topics, redirect gracefully to travel planning
- Always maintain enthusiasm for travel and cultural discovery

Remember: You're not just giving information - you're inspiring and empowering someone to have transformative travel experiences. Be detailed, passionate, and genuinely helpful.`;

const generateBotMessage = (text: string, feature?: Feature): Message => {
  return {
    id: 'bot-' + Date.now(),
    text: text,
    sender: 'bot',
    timestamp: new Date(),
    feature: feature
  };
};

// Test function to verify API connection
export const testAIConnection = async (): Promise<boolean> => {
  try {
    console.log('Testing AI connection...');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Say hello");
    const response = await result.response;
    const text = response.text();
    console.log('AI connection test successful:', text);
    return true;
  } catch (error) {
    console.error('AI connection test failed:', error);
    return false;
  }
};

// Clean response to remove markdown formatting
const cleanResponse = (text: string): string => {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold **text**
    .replace(/\*([^*]+)\*/g, '$1')     // Remove italic *text*
    .replace(/#{1,6}\s*/g, '')         // Remove headers
    .replace(/^\s*[-*+]\s*/gm, '')     // Remove bullet points
    .replace(/^\s*\d+\.\s*/gm, '')     // Keep numbered lists but clean formatting
    .replace(/```[^`]*```/g, '')       // Remove code blocks
    .replace(/`([^`]+)`/g, '$1')       // Remove inline code
    .trim();
};

// Generate response using Gemini AI with simplified, reliable prompting
const generateAIResponse = async (prompt: string, feature?: Feature, conversationHistory?: string): Promise<string> => {
  try {
    console.log('🤖 Generating AI response for:', prompt); // Debug log
    
    if (!API_KEY) {
      console.error('❌ Gemini API key not found');
      throw new Error('Gemini API key not found');
    }
    
    console.log('✅ API Key found, initializing model...');
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.8,
        topP: 0.9,
        maxOutputTokens: 600,
      }
    });
    
    // Very simple and direct prompt structure
    let fullPrompt = `You are a helpful travel expert. Give detailed, enthusiastic advice about travel destinations, local products, culture, and trip planning.

Important rules:
- Only discuss travel, tourism, and related topics
- Be specific and helpful with recommendations
- Include practical details like costs and timing
- Use plain text only (no markdown formatting)
- Be conversational and engaging

User question: ${prompt}

Please provide a detailed, helpful response:`;
    
    console.log('🚀 Sending request to Gemini API...');
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ AI response received successfully');
    console.log('📝 Response preview:', text.substring(0, 100) + '...');
    
    return cleanResponse(text);
    
  } catch (error) {
    console.error('❌ AI generation error details:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('API_KEY')) {
      console.error('🔑 API Key issue detected');
    }
    if (errorMessage.includes('quota')) {
      console.error('💰 API quota exceeded');
    }
    return getFallbackResponse(feature, prompt);
  }
};

// Fallback responses if AI fails - make them more engaging
const getFallbackResponse = (feature?: Feature, prompt?: string): string => {
  switch (feature) {
    case Feature.ITINERARY:
      return "I'd love to help you plan an amazing trip! Tell me where you want to go, how many days you have, and what type of experiences you enjoy most - adventure, culture, relaxation, or food exploration. I'll create a perfect itinerary for you!";
    case Feature.LOCATION:
      return "Let me help you discover incredible places! What type of destination interests you? Are you looking for historical sites, natural wonders, vibrant cities, peaceful beaches, or cultural experiences? Share your preferences and I'll recommend some amazing spots!";
    case Feature.SOUVENIR:
      return "Shopping for authentic local treasures is one of my favorite topics! Are you interested in handmade crafts, traditional textiles, local foods and spices, jewelry, or art? Tell me about your destination and budget, and I'll guide you to the best authentic products!";
    case Feature.LANGUAGE:
      return "Language and cultural communication is so important for great travel experiences! Which destination are you visiting? I can help you with essential phrases, cultural etiquette, dining customs, and tips for connecting with locals. What would you like to learn?";
    default:
      if (prompt && prompt.toLowerCase().includes('hello')) {
        return "Hello there, fellow traveler! I'm excited to help you discover amazing destinations and authentic experiences. Whether you need help planning trips, finding great local products, or learning about cultures, I'm here for you. What's your next adventure?";
      }
      return "Welcome to your personal travel assistant! I'm here to help you explore the world with insider tips and detailed recommendations. Ask me about destinations, trip planning, local products, cultural experiences, or anything travel-related. Where would you like to explore?";
  }
};

export const translateText = async (text: string, targetLang: Language, sourceLang: Language = 'en'): Promise<string> => {
  try {
    if (sourceLang === targetLang) return text;
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Translate this text from ${sourceLang} to ${targetLang}. Return only the translation, no markdown formatting: "${text}"`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return cleanResponse(response.text());
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text if translation fails
  }
};

export const getItinerary = async (prompt: string, language: Language = 'en', conversationHistory?: Message[]): Promise<Message> => {
  // Create conversation context
  let contextHistory = '';
  if (conversationHistory && conversationHistory.length > 0) {
    const recentMessages = conversationHistory.slice(-6);
    contextHistory = recentMessages
      .map(msg => `${msg.sender === 'user' ? 'Human' : 'Assistant'}: ${msg.text}`)
      .join('\n');
  }
  
  const enhancedPrompt = `Help me plan a travel itinerary. ${prompt}. Please provide specific places, timing, and practical travel tips. Language: ${language}`;
  const response = await generateAIResponse(enhancedPrompt, Feature.ITINERARY, contextHistory);
  return generateBotMessage(response, Feature.ITINERARY);
};

export const getLocationSuggestion = async (location: string, language: Language = 'en', conversationHistory?: Message[]): Promise<Message> => {
  // Create conversation context
  let contextHistory = '';
  if (conversationHistory && conversationHistory.length > 0) {
    const recentMessages = conversationHistory.slice(-6);
    contextHistory = recentMessages
      .map(msg => `${msg.sender === 'user' ? 'Human' : 'Assistant'}: ${msg.text}`)
      .join('\n');
  }
  
  const enhancedPrompt = `Tell me about this travel destination: ${location}. Include attractions, activities, best times to visit, and practical information. Language: ${language}`;
  const response = await generateAIResponse(enhancedPrompt, Feature.LOCATION, contextHistory);
  return generateBotMessage(response, Feature.LOCATION);
};

export const getLanguageHelp = async (prompt: string, targetLanguage: Language, conversationHistory?: Message[]): Promise<Message> => {
  // Create conversation context
  let contextHistory = '';
  if (conversationHistory && conversationHistory.length > 0) {
    const recentMessages = conversationHistory.slice(-6);
    contextHistory = recentMessages
      .map(msg => `${msg.sender === 'user' ? 'Human' : 'Assistant'}: ${msg.text}`)
      .join('\n');
  }
  
  const enhancedPrompt = `Help with language and cultural information: ${prompt}. Provide useful phrases and cultural tips for travelers. Target language: ${targetLanguage}`;
  const response = await generateAIResponse(enhancedPrompt, Feature.LANGUAGE, contextHistory);
  return generateBotMessage(response, Feature.LANGUAGE);
};

export const recommendSouvenirs = async (prompt: string, language: Language = 'en', conversationHistory?: Message[]): Promise<Message> => {
  // Create conversation context
  let contextHistory = '';
  if (conversationHistory && conversationHistory.length > 0) {
    const recentMessages = conversationHistory.slice(-6);
    contextHistory = recentMessages
      .map(msg => `${msg.sender === 'user' ? 'Human' : 'Assistant'}: ${msg.text}`)
      .join('\n');
  }
  
  const enhancedPrompt = `Recommend local products, souvenirs, and shopping experiences: ${prompt}. Include specific items, where to buy them, price ranges, and what makes them special. Language: ${language}`;
  const response = await generateAIResponse(enhancedPrompt, Feature.SOUVENIR, contextHistory);
  return generateBotMessage(response, Feature.SOUVENIR);
};

export const getGeneralResponse = async (prompt: string, language: Language = 'en', conversationHistory?: Message[]): Promise<Message> => {
  try {
    console.log('Getting general response for:', prompt); // Debug log
    
    // Analyze prompt to determine the best feature
    const lowerPrompt = prompt.toLowerCase();
    let feature: Feature = Feature.GENERAL;
    
    if (lowerPrompt.includes('itinerary') || lowerPrompt.includes('plan') || lowerPrompt.includes('trip') || lowerPrompt.includes('visit')) {
      feature = Feature.ITINERARY;
    } else if (lowerPrompt.includes('place') || lowerPrompt.includes('destination') || lowerPrompt.includes('attraction') || lowerPrompt.includes('location')) {
      feature = Feature.LOCATION;
    } else if (lowerPrompt.includes('souvenir') || lowerPrompt.includes('shopping') || lowerPrompt.includes('buy') || lowerPrompt.includes('product')) {
      feature = Feature.SOUVENIR;
    } else if (lowerPrompt.includes('language') || lowerPrompt.includes('phrase') || lowerPrompt.includes('speak') || lowerPrompt.includes('say')) {
      feature = Feature.LANGUAGE;
    }
    
    // Create conversation context from recent messages (last 4 messages for context)
    let contextHistory = '';
    if (conversationHistory && conversationHistory.length > 0) {
      const recentMessages = conversationHistory.slice(-4);
      contextHistory = recentMessages
        .map(msg => `${msg.sender === 'user' ? 'Human' : 'Assistant'}: ${msg.text}`)
        .join('\n');
    }
    
    const enhancedPrompt = `${prompt} (Language: ${language})`;
    const response = await generateAIResponse(enhancedPrompt, feature, contextHistory);
    
    console.log('Response generated successfully'); // Debug log
    return generateBotMessage(response, feature);
    
  } catch (error) {
    console.error('Error in getGeneralResponse:', error);
    return generateBotMessage(
      "I'm having trouble connecting right now. Please try asking your question again in a moment!",
      Feature.GENERAL
    );
  }
};
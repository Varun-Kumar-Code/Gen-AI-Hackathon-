import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message, Language, Languages } from '../types/types';

if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error("VITE_GEMINI_API_KEY environment variable not set");
}

const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY as string);
const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash' });

const generateBotMessage = async (response: any): Promise<Message> => {
    const text = await response.text() || '';
    const sources: any[] = [];
        
    return {
        id: 'bot-' + Date.now(),
        text: text,
        sender: 'bot',
        sources: sources.length > 0 ? sources : undefined,
    };
};

export const translateText = async (text: string, targetLang: Language, sourceLang: Language = 'en'): Promise<string> => {
    if (sourceLang === targetLang) return text;
    try {
        const sourceLangName = Languages.find((l: { id: Language; name: string }) => l.id === sourceLang)?.name || sourceLang;
        const targetLangName = Languages.find((l: { id: Language; name: string }) => l.id === targetLang)?.name || targetLang;

        const result = await model.generateContent(
            `Translate the following text from ${sourceLangName} to ${targetLangName}. Respond with only the translated text, nothing else.\n\nTEXT: "${text}"`
        );
        const response = await result.response;
        return response.text().trim();
    } catch (error) {
        console.error("Error translating text:", error);
        return text; // Fallback to original text on error
    }
};


export const getItinerary = async (prompt: string): Promise<Message> => {
    try {
        const result = await model.generateContent(
            `User request for Jharkhand itinerary: "${prompt}"

            Instructions:
            - Create a detailed, personalized itinerary
            - Keep the response concise and easy to read
            - Structure the plan day-by-day
            - For each day, suggest activities, sights, and local food
            - Provide practical tips like travel times or booking recommendations
            - Use markdown-style syntax (* for lists, ** for bold)`
        );
        const response = await result.response;
        return generateBotMessage(response);
    } catch (error) {
        console.error("Error generating itinerary:", error);
        throw new Error("Failed to generate itinerary.");
    }
};

export const getLocationSuggestion = async (location: string): Promise<Message> => {
    try {
        const result = await model.generateContent(
            `Provide tourist suggestions for the following location in Jharkhand: ${location}.
            
            Include:
            - Interesting facts
            - Opening hours
            - Why someone should visit
            - Keep the response concise and informative`
        );
        const response = await result.response;
        return generateBotMessage(response);
    } catch (error) {
        console.error("Error getting location suggestions:", error);
        throw new Error("Failed to get location suggestions.");
    }
};

export const getLanguageHelp = async (prompt: string, targetLanguage: Language): Promise<Message> => {
    try {
        const targetLangName = Languages.find((l: { id: Language; name: string }) => l.id === targetLanguage)?.name || targetLanguage;
        const result = await model.generateContent(
            `User's language query (for ${targetLangName}): "${prompt}"
            
            Instructions:
            - Provide clear translations or language assistance in ${targetLangName}
            - For common phrases, include pronunciations (e.g., 'Namaste (nah-ma-stay)')
            - Focus on languages of Jharkhand (Hindi, Santhali, Nagpuri) and major Indian languages
            - Keep responses concise and practical`
        );
        const response = await result.response;
        return generateBotMessage(response);
    } catch (error) {
        console.error("Error with language help:", error);
        throw new Error("Failed to provide language help.");
    }
};
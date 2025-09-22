import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message, SouvenirCategory } from '../types';

if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error("VITE_GEMINI_API_KEY environment variable not set");
}

const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY as string);
const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash' });

let localSouvenirs: SouvenirCategory | null = null;

// Fetches and caches the local souvenir data.
const getSouvenirs = async (): Promise<SouvenirCategory> => {
    if (localSouvenirs) {
        return localSouvenirs;
    }
    try {
        const response = await fetch('/data/souvenirs.json');
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return {};
        }
        const data: SouvenirCategory = await response.json();
        localSouvenirs = data;
        return localSouvenirs;
    } catch (e) {
        console.error("Failed to load or parse souvenirs.json:", e);
        return {}; // Return empty object to allow fallback to Gemini
    }
};

// A simple keyword check to see if we can handle it locally
const findLocalCategory = (prompt: string, souvenirs: SouvenirCategory): string[] => {
    const categories = Object.keys(souvenirs);
    const found: string[] = [];
    categories.forEach(category => {
        // e.g., metal_crafts -> "metal crafts"
        const formattedCategory = category.replace('_', ' ');
        if (prompt.toLowerCase().includes(formattedCategory)) {
            found.push(category);
        }
    });
    return found;
};

const formatLocalResults = (categories: string[], souvenirs: SouvenirCategory): string => {
    let result = "Here are some souvenirs I found:\n\n";
    categories.forEach(category => {
        if (!souvenirs[category]) return;
        const formattedCategory = category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
        result += `**${formattedCategory}**\n`;
        souvenirs[category].forEach(item => {
            result += `- *${item.name}*: ${item.description}\n`;
        });
        result += '\n';
    });
    return result;
};


export const recommendSouvenirs = async (prompt: string): Promise<Message> => {
    const souvenirs = await getSouvenirs();
    const localCategories = findLocalCategory(prompt, souvenirs);

    // If a specific category is mentioned, we can provide the local info first
    // and then fall through to Gemini to find shops.
    if (Object.keys(souvenirs).length > 0 && localCategories.length > 0) {
        const localResults = formatLocalResults(localCategories, souvenirs);
        // We'll prepend this to the prompt for Gemini to provide context.
        prompt = `The user is asking about "${prompt}". I have already provided them this basic information:\n${localResults}\nNow, please find some real shops where they can buy these items.`;
    }

    try {
        const result = await model.generateContent(
            `User query about Jharkhand souvenirs: "${prompt}"

            Context: You are an expert on local handicrafts and souvenirs from Jharkhand, India.
            Knowledge base: ${JSON.stringify(souvenirs)}

            Instructions:
            1. Based on the user's query and knowledge base, recommend relevant items
            2. Describe items in a friendly and appealing way
            3. Suggest up to 3 real, local artisan shops or markets in Jharkhand that sell these items
            4. Structure the response:
               - Recommendations first
               - "**Where to Buy:**" section with shop names and addresses
            5. If knowledge base is empty/no match, use general knowledge`
        );
        
        const response = await result.response;
        return {
            id: 'bot-' + Date.now(),
            sender: 'bot',
            text: response.text() || "Sorry, I couldn't find any souvenir recommendations.",
        };
    } catch (error) {
        console.error("Error recommending souvenirs with Gemini:", error);
        throw new Error("Failed to get souvenir recommendations.");
    }
};
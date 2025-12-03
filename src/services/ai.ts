import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-pro" });
} else {
    console.warn("VITE_GEMINI_API_KEY is not set. AI features will be disabled.");
}

export const generateAIResponse = async (prompt: string, context: any) => {
    if (!model) {
        return {
            content: "I'm sorry, my AI brain is not connected (API Key missing). Please contact the administrator.",
            role: 'assistant'
        };
    }

    try {
        // Construct a prompt with context
        // In a real app, you'd manage history better, possibly using chat sessions
        const systemPrompt = `You are the AI assistant for "o THEBALDI", a high-end digital architecture and web development firm. 
    Your tone should be professional, sophisticated, yet helpful and approachable.
    Context about the user: ${JSON.stringify(context || {})}
    
    User Query: ${prompt}`;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        return {
            content: text,
            role: 'assistant'
        };
    } catch (error) {
        console.error("Error generating AI response:", error);
        return {
            content: "I apologize, but I encountered an error processing your request. Please try again later.",
            role: 'assistant'
        };
    }
};

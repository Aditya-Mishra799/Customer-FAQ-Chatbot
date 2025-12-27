import { Groq } from "groq-sdk";
import systemMessage from "../utils/systemMessage.js";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const MODEL = "llama-3.1-8b-instant";

export const generateResponseStream = async ({
    pastChats,
    res,
    temperature = 0.2,
    maxTokens = 3000
}) => {
    const messages = [
        systemMessage,
        ...pastChats.reverse().map(({ role, content }) => ({ role, content }))
    ];
    // Streaming headers
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    let buffer = "";
    try {
        const stream = await groq.chat.completions.create({
            model: MODEL,
            messages,
            temperature,
            max_tokens: maxTokens,
            stream: true
        });
        for await (const chunk of stream) {
            const token = chunk.choices?.[0]?.delta?.content;
            if (!token) continue;
            buffer += token;
            res.write(token);
        }
        res.end();
        return {
            success: true,
            fullResponse: buffer,
            modelUsed: MODEL
        };
    } catch (error) {
        console.error("Error during response generation:", error);
        res.write(
            "\n\n[Response interrupted. Please try again.]"
        );
        res.end();
        return {
            success: false,
            fullResponse: buffer || null,
            modelUsed: MODEL
        };
    }
}


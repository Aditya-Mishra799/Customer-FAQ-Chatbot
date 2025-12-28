import { getConversationById, addChatMessage, getTotalChatsCount } from "../services/conversations.service.js";
import { generateResponseStream } from "../services/generateResponse.service.js";
import ApiError from "../utils/ApiError.js";
const getConversation = async (req, res, next) => {
    try {
        const { conversationId } = req;
        const offset = parseInt(req.query.offset) || 0;
        const limit = parseInt(req.query.limit) || 50;
        const conversation = await getConversationById(conversationId, offset, limit);
        const totalChats = await getTotalChatsCount(conversationId);
        const hasMore = (offset + limit) < totalChats;
        res.status(200).json({
            success: true,
            data: (conversation || []).reverse(),
            totalChats,
            hasMore
        });
    } catch (error) {
        next(error);
    }
}

const addMessageToConversation = async (req, res, next) => {
    // function to add a new user query to the conversation and stream the agent response and then save it at end
    const { conversationId } = req;
    let { message } = req.body;
    message = message?.trim();
    if (message.length < 5) {
        throw new ApiError(400, "Message too short", "VALIDATION_ERROR", { field: "message" });
    }
    try {
        // add user message to conversation
        await addChatMessage(conversationId, "user", message, null);
        // get past 6 chats for context
        const pastChats = await getConversationById(conversationId, 0, 6);
        // stream the agent response
        const response = await generateResponseStream({
            pastChats,
            res
        });
        if(response.success && response.fullResponse) {
            // save agent response to conversation
            await addChatMessage(conversationId, "assistant", response.fullResponse, response.modelUsed);
        }
    } catch (error) {
        next(error);
    }

}

export {
    getConversation,
    addMessageToConversation
};
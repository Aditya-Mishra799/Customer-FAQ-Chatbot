// check if the request has a valid conversationId, if not create a new conversationId
// create id using crypto
import crypto from "crypto";
import { checkConversationExists, createConversation } from "../services/conversations.service.js";
import ApiError from "../utils/ApiError.js";
const conversationIdMiddleware = async (req, res, next) => {
    try {
        let conversationId = req.cookies?.conversationId
        if (!conversationId) {
            conversationId = crypto.randomBytes(16).toString("hex");
        }
        const conversationExists = await checkConversationExists(conversationId);
        if (!conversationExists) {
            await createConversation(conversationId);
        }
        req.conversationId = conversationId;
        const isProd = process.env.NODE_ENV === "production";

        const cookieOptions = {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            path: "/",
        };
        res.cookie("conversationId", conversationId, cookieOptions);
        next();
    } catch (error) {
        if (error instanceof ApiError) {
            return next(error);
        }
        next(new ApiError(500, "Failed to process conversation ID", "CONVERSATION_ID_ERROR", { originalError: error.message }));
    }
}
export default conversationIdMiddleware;
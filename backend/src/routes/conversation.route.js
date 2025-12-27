import { getConversation, addMessageToConversation } from "../controllers/conversation.controller.js";
import express from "express";
import { rateLimiterChat } from "../middlewares/rateLimit.js";
const router = express.Router();
router.get("/", getConversation);
router.post("/message", rateLimiterChat, addMessageToConversation);
export default router;
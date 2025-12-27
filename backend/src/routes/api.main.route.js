import express from "express";
import conversationRouter from "./conversation.route.js";
import conversationIdMiddleware from "../middlewares/conversationId.js";
import { rateLimiterChat } from "../middlewares/rateLimit.js";
const router = express.Router();

router.use("/conversation", rateLimiterChat,conversationIdMiddleware, conversationRouter);

export default router;
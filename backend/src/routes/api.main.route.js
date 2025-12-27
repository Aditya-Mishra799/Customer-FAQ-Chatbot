import express from "express";
import conversationRouter from "./conversation.route.js";
import conversationIdMiddleware from "../middlewares/conversationId.js";
const router = express.Router();

router.use("/conversation",conversationIdMiddleware, conversationRouter);

export default router;
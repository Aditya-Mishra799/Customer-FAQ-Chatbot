import { getConversation, addMessageToConversation } from "../controllers/conversation.controller.js";
import express from "express";
const router = express.Router();
router.get("/", getConversation);
router.post("/message", addMessageToConversation);
export default router;
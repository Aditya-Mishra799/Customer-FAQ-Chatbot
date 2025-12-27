import pool from "../config/db.js"
import ApiError from "../utils/ApiError.js";
const getConversationById = async (conversationId, offset = 0, limit = 50) => {
    // get the last conversations based on timestamp
    const query = `
        SELECT id, role, content, created_at
        FROM chats
        WHERE conversation_id = $1
        ORDER BY created_at DESC
        LIMIT $2 OFFSET $3
    `
    const values = [conversationId, limit, offset]
    try {
        const res = await pool.query(query, values)
        return res.rows
    } catch (error) {
        throw new ApiError(500, "Failed to fetch conversation", "DB_ERROR", { originalError: error.message });
    }
}

const getTotalChatsCount = async (conversationId) => {
    const query = `SELECT COUNT(*) AS total FROM chats WHERE conversation_id = $1`
    const values = [conversationId]
    try {
        const res = await pool.query(query, values)
        return res.rows[0].total
    } catch (error) {
        throw new ApiError(500, "Failed to fetch total chats count", "DB_ERROR", { originalError: error.message });
    }
}

const checkConversationExists = async (conversationId) => {
    const query = `
        SELECT 1
        FROM conversations
        WHERE id = $1
    `
    const values = [conversationId]
    try {
        const res = await pool.query(query, values)
        return res.rowCount > 0
    } catch (error) {
        throw new ApiError(500, "Failed to check conversation existence", "DB_ERROR", { originalError: error.message });
    }
}

const createConversation = async (conversationId) => {
    const query = `
        INSERT INTO conversations (id, created_at, updated_at, last_activity_at)
        VALUES ($1, NOW(), NOW(), NOW())
    `
    const values = [conversationId]
    try {
        await pool.query(query, values)
    } catch (error) {
        throw new ApiError(500, "Failed to create conversation", "DB_ERROR", { originalError: error.message });
    }
}

const addChatMessage = async (conversationId, role, content, model_used) => {
    const query = `
        INSERT INTO chats (conversation_id, role, content, model_used, created_at)
        VALUES ($1, $2, $3, $4, NOW())
    `
    const values = [conversationId, role, content, model_used]

    // Update the conversation's last_activity_at
    const updateQuery = `
        UPDATE conversations
        SET last_activity_at = NOW(), updated_at = NOW()
        WHERE id = $1
    `
    const updateValues = [conversationId]
    try {
        await pool.query(query, values)
        await pool.query(updateQuery, updateValues)
    } catch (error) {
        throw new ApiError(500, "Failed to add chat message", "DB_ERROR", { originalError: error.message });
    }
}

export { getConversationById, checkConversationExists, addChatMessage, createConversation, getTotalChatsCount }
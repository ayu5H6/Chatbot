import express from "express";
import Chat from "../models/Chat.js";
import { getAIResponse } from "../services/ai.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { sessionId, message } = req.body;

  let chat = await Chat.findOne({ sessionId });
  if (!chat) {
    chat = await Chat.create({ sessionId, messages: [] });
  }

  chat.messages.push({ role: "user", content: message });

  const reply = await getAIResponse(message);
  chat.messages.push({ role: "ai", content: reply });

  await chat.save();
  res.json({ reply });
});


router.get("/:sessionId", async (req, res) => {
  const chat = await Chat.findOne({ sessionId: req.params.sessionId });
  res.json(chat?.messages || []);
});

export default router;
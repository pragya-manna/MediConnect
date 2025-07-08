import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// ✅ Your actual Gemini API Key here
const genAI = new GoogleGenerativeAI("AIzaSyBpTdS4upSl-3UCJ1ZKvz3wij5YDvOPuF8");

// ✅ Single model instance (use a suitable Gemini model)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/ask", async (req, res) => {
  const { question, chatMemory } = req.body;

  // Validate chatMemory is an array of { role, parts } items
  const history = Array.isArray(chatMemory) ? chatMemory : [];

  try {
    // ✅ Start a *chat session* with memory
    const chat = model.startChat({
      history: history,
    });

    // ✅ Send the new user message
    const result = await chat.sendMessage(question);

    // ✅ Get the model's text answer
    const answer = result.response.text();

    // ✅ Add the new exchange to memory
    const updatedMemory = [
      ...history,
      { role: "user", parts: [{ text: question }] },
      { role: "model", parts: [{ text: answer }] },
    ];

    // ✅ Respond to frontend
    res.json({ answer, updatedMemory });

  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});



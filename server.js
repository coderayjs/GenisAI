const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
require('dotenv').config({ path: '.env.local' });

const app = express();
app.use(cors());
app.use(express.json());

console.log('API Key exists:', !!process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/generate-advice', async (req, res) => {
  try {
    const { question, answer } = req.body;
    console.log('Received request:', { question, answer });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          "role": "system", 
          "content": "You are an empathetic mental health advisor. Provide supportive, non-judgmental advice." 
        },
        {
          "role": "user",
          "content": `Question: ${question}\nAnswer: ${answer}\nBased on this response, provide empathetic and supportive mental health advice:`
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const advice = completion.choices[0].message.content;
    res.json({ advice });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: 'Failed to generate advice' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
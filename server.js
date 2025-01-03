const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Load API key from .env.local
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKey = envContent.match(/OPENAI_API_KEY=(.*)/)[1].trim();

const openai = new OpenAI({
  apiKey: apiKey
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

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// For Vercel
module.exports = app; 
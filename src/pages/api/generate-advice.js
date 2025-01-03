import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { question, answer } = req.body;

    const prompt = `As a mental health professional, provide compassionate and helpful advice for someone who answered "${answer}" to the question "${question}". Focus on practical steps and positive encouragement. Include both immediate coping strategies and long-term suggestions for improvement. Keep the tone supportive and non-judgmental.`;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a compassionate mental health advisor who provides supportive, practical advice while maintaining professional boundaries and encouraging professional help when needed."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const advice = completion.data.choices[0].message.content;
    res.status(200).json({ advice });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error generating advice' });
  }
} 
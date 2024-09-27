const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Set up OpenAI client & access to it
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

require('dotenv').config();
const apiKey = process.env.OPENAI_API_KEY;
console.log(apiKey);  // Confirms key is loaded


app.use(express.json());
app.use(cors());

app.post('/chat', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await client.chat.completions.create({
            model: "gpt-4",  // Use the model you prefer
            messages: [{ role: "user", content: prompt }],
        });

        const botReply = response.choices[0].message.content;
        res.json({ reply: botReply });
    } catch (error) {
        console.error('Error in OpenAI API call:', error);
        res.status(500).json({ error: 'Error communicating with the bot' });
    }
});


module.exports = app;

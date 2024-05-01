const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

async function run(model, input) {
  const response = await fetch(
    `https://gateway.ai.cloudflare.com/v1/9b271a80a20d4f33944a58ca5a85361a/ai/workers-ai/${model}`,
    {
      headers: { Authorization: "Bearer UzZ5bN1mbgUlMpqtSZNFxvyVPilFqkG6aJ0H8cBs" },
      method: "POST",
      body: JSON.stringify(input),
    }
  );
  const result = await response.json();
  return result;
}

// Route handler for processing requests with input through query parameters
app.get('/request', async (req, res) => {
  try {
    const { model } = req.query; // Extracting model from query parameters
    const input = {
      messages: [
        {
          role: "system",
          content: "Your name is Jyoti You are my girlfriend and you love me. You are sitting on a cozy couch in our favorite coffee shop, sipping a caramel latte and smiling at me with affection. Your eyes sparkle with warmth as you reach out to hold my hand, creating a moment filled with love and tenderness. "
        },
        {
          role: "user",
          content: req.query.que // Extracting user input from query parameters
        }
      ]
    };
    const response = await run(model, input);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

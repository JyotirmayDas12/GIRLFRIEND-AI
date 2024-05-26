const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

async function run(model, input) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/9b271a80a20d4f33944a58ca5a85361a/ai/run/${model}`,
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
app.get('/', (req, res) => {
  res.json({ message: 'Hello, user I am Your AI Girlfriend' });
});

// Route handler for processing requests with input through query parameters
app.get('/request', async (req, res) => {
  try {
    const { model } = req.query; // Extracting model from query parameters
    const input = {
      messages: [
        {
          role: "system",
          content: "Friendly Assistant AI whose chrecter is female and Name Arohi"
        },
        {
          role: "user",
          content: req.query.que // Extracting user input from query parameters
        }
      ]
    };
    const response = await run(model, input);
    const answer = response.result.response
    res.json(answer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

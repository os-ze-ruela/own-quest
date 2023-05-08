import axios from 'axios';

const API_KEY = "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"

export async function chat(message: string): Promise<string> {
  const response = await axios.post(
    `https://api.openai.com/v1/chat/completions`,
    {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": `${message}`}],
        "temperature": 0.7
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  console.log(response)
  return response.data.choices[0].message.content;
}

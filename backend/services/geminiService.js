const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

async function generateQuestions(description) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const prompt = `
Generate exactly 5 quiz questions and answers from this event description.

Event Description:
${description}

Return ONLY valid JSON in this format:

[
  {
    "question": "...",
    "answer": "..."
  }
]
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}

module.exports = generateQuestions;
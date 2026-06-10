const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateQuestions(description) {
  const completion =
    await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
Generate exactly 5 challenging multiple-choice questions based on the following event description.

Event Description:
${description}

Requirements:
- Questions should test understanding, application, and critical thinking rather than simple memorization.
- Avoid overly obvious questions whose answers can be guessed easily.
- Use real-world scenarios, code snippets, problem-solving situations, or conceptual reasoning whenever appropriate.
- Include a mix of difficulty:
  - 1 Easy question
  - 2 Medium questions
  - 2 Hard questions
- At least 60% of the questions should require reasoning, analysis, or application of concepts rather than direct recall of facts.
- Each question must have exactly 4 options.
- Only one option should be correct.
- Incorrect options should be plausible and relevant to the topic.
- The correct answer must exactly match one of the provided options.
- Do not include explanations.
- Do NOT wrap the JSON in markdown or backticks.
- Return ONLY valid JSON.

Return the response in this EXACT format:

[
  {
    "question": "Question text",
    "options": [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
    ],
    "answer": "Correct Option"
  }
]
`,
        },
      ],

      model: "llama-3.3-70b-versatile",

      temperature: 0.4,

      max_tokens: 1500,
    });

  return completion.choices[0].message.content;
}

module.exports = generateQuestions;
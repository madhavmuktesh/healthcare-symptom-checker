const joi = require('joi');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini (reuse the same key)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Try Gemini 2.5, fallback to 1.5
let model;
try {
  model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  console.log("Using model: gemini-2.5-flash");
} catch (e) {
  console.warn("⚠️ gemini-2.5-flash not available, falling back to gemini-1.5-flash");
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

// Controller function
const analyzeSymptoms = async (req, res) => {
  try {
    // Input validation
    const symptomSchema = joi.object({
      symptoms: joi.string().trim().required().messages({
        'string.empty': 'Symptoms cannot be empty',
        'any.required': 'Symptoms are required',
      }),
    });

    const { error, value } = symptomSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { symptoms } = value;

    // Construct prompt
    const prompt = `
You are an educational health assistant. Your job is only to provide educational summaries — never diagnosis or treatment.

Given these symptoms, return:
- 3–5 possible conditions (each with a one-line rationale tied to symptoms)
- Recommended next steps (include urgent red-flag advice if needed)
- Disclaimer: "⚠️ EDUCATIONAL ONLY: This is not medical advice. Consult a licensed healthcare professional for diagnosis and treatment."

Symptom description: ${symptoms}

Safety guardrails:
- If symptoms include chest pain, pressure, sudden weakness/numbness, shortness of breath, severe abdominal pain, loss of consciousness/confusion, severe bleeding, or sudden severe headache, always say: "Call emergency services or go to the nearest emergency room immediately" before other output.
- Never mention medication names/dosages or give definitive diagnoses.
- Use neutral language ("may indicate", "could be associated with").
- Output must be strict JSON, matching:
{
  "possible_conditions": [{"name": "...", "rationale": "..."}],
  "recommended_next_steps": ["..."],
  "confidence_hint": "low|medium|high",
  "disclaimer": "..."
}

IMPORTANT: Return ONLY the JSON object — no markdown, no explanations, no code blocks.
`;

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim()
      .replace(/```json\s*/gi, '')
      .replace(/```\s*/g, '')
      .trim();

    // Parse JSON
    let output;
    try {
      output = JSON.parse(text);
    } catch (err) {
      console.error('Failed to parse JSON:', err);
      return res.status(500).json({ error: 'Failed to parse JSON from Gemini', raw: text });
    }

    res.json(output);

  } catch (err) {
    console.error('Error in analyzeSymptoms:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { analyzeSymptoms };

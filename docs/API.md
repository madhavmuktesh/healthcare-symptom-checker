# API Contract

**Endpoint:** POST /api/analyze

## Request Body
```json
{
  "symptoms": "Fever and sore throat for 2 days"
}

{
  "possible_conditions": [
    { "name": "Common cold", "rationale": "Fever and sore throat are typical symptoms of a common viral infection." },
    { "name": "Strep throat", "rationale": "Bacterial throat infections often present with sore throat and fever." }
  ],
  "recommended_next_steps": [
    "Stay hydrated and rest",
    "If sore throat persists beyond 3 days or is severe, consult a healthcare provider"
  ],
  "confidence_hint": "medium",
  "disclaimer": "⚠️ EDUCATIONAL ONLY: This is not medical advice. Consult a licensed healthcare professional for diagnosis and treatment."
}



---

**Summary:**  
- Your version is good—the above is just the visually polished, markdown-linting-perfect version (same content!).
- You can safely move to the **next step** once you update this.

Are you ready to go to:  
**Craft the LLM Prompt & Safety Rules**?

# Healthcare Symptom Checker

Objective:
Input: Free-text symptom description
Output: Probable medical conditions (for education only), recommended next steps, and an explicit disclaimer.
The primary goal is to provide educational feedback—not a diagnosis—based on user symptoms using responsible LLM prompting.

## MVP Features
- Backend API endpoint (POST /api/analyze)
- Input validation
- Structured response: Possible Conditions, Next Steps, Disclaimer
- Educational-only scope; safety disclaimers

## Optional Features
- React frontend UI
- Query history DB (MongoDB)
- Confidence indicator in responses
- Simple analytics

# Backend Implementation Checklist

1. Create server scaffold (Express, Flask, etc.)
2. Implement single API endpoint:
   - POST /api/analyze
   - Input: Validate symptom text is non-empty
3. Build prompt using the template in docs/prompt_template.md
   - Inject user symptoms and apply safety guardrails
4. Call LLM API (OpenAI, etc.) using low temperature (≤ 0.3)
5. Parse model output:
   - Return structured JSON matching docs/API.md
6. Handle errors gracefully (HTTP 400 for bad input, 500 for failures)
7. Add simple logging:
   - Log each request (mask symptom text if sensitive)
   - Log LLM response for debug (never commit API keys/tokens!)
8. Use environment variables for configuration:
   - API keys
   - Port
   - DB URI (if used)
   - Ensure keys/secrets are never committed (blocked by .gitignore)
9. Write minimal code to avoid overengineering—focus on clarity and correctness

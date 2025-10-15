# Sample Inputs & Expected Outputs

---

## 1. Simple Mild Symptoms

### Input:
"Runny nose and sneezing"

### Expected Output:
{
"possible_conditions": [
{ "name": "Common cold", "rationale": "A runny nose and sneezing are common with mild viral infections." },
{ "name": "Allergic rhinitis", "rationale": "Sneezing and nasal symptoms are frequently seen with allergies." }
],
"recommended_next_steps": [
"Monitor your symptoms and rest.",
"If symptoms worsen, persist more than a week, or you have trouble breathing, see a healthcare professional."
],
"confidence_hint": "medium",
"disclaimer": "⚠️ EDUCATIONAL ONLY: This is not medical advice. Consult a licensed healthcare professional for diagnosis and treatment."
}



---

## 2. Mixed Symptoms (with moderate concern)

### Input:
"Fever, nausea, and abdominal pain"

### Expected Output:
{
"possible_conditions": [
{ "name": "Gastroenteritis", "rationale": "These symptoms often occur with viral or bacterial stomach infections." },
{ "name": "Appendicitis", "rationale": "Abdominal pain with fever and nausea could indicate inflammation that requires urgent assessment." },
{ "name": "Food poisoning", "rationale": "Fever, nausea, and abdominal pain may result from contaminated food or drink." }
],
"recommended_next_steps": [
"Drink fluids and avoid heavy meals.",
"If the pain is severe, persistent, or accompanied by vomiting or blood, seek urgent medical attention.",
"If fever lasts more than 2 days, consult a healthcare professional."
],
"confidence_hint": "medium",
"disclaimer": "⚠️ EDUCATIONAL ONLY: This is not medical advice. Consult a licensed healthcare professional for diagnosis and treatment."
}



---

## 3. Red-Flag Symptoms (URGENT)

### Input:
"Severe chest pain and shortness of breath"

### Expected Output:
{
"possible_conditions": [],
"recommended_next_steps": [
"Call emergency services or go to the nearest emergency room immediately. These symptoms could indicate a life-threatening emergency."
],
"confidence_hint": "high",
"disclaimer": "⚠️ EDUCATIONAL ONLY: This is not medical advice. Consult a licensed healthcare professional for diagnosis and treatment."
}



---

## 4. Vague Input or Poor Detail

### Input:
"I don't feel well."

### Expected Output:
{
"possible_conditions": [],
"recommended_next_steps": [
"Please provide more details about your symptoms (for example: location, duration, severity) for a more informative response."
],
"confidence_hint": "low",
"disclaimer": "⚠️ EDUCATIONAL ONLY: This is not medical advice. Consult a licensed healthcare professional for diagnosis and treatment."
}
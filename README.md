# HealthCheck AI - Symptom Checker

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

An educational tool that leverages the Google Gemini Large Language Model (LLM) to suggest possible conditions and recommendations based on user-provided symptoms. This project was developed as a full-stack application for an assignment with **Unthinkable Solutions**.

**Demo Video:** 

https://github.com/user-attachments/assets/2245c4ab-c6a1-4ddc-a99a-695ebf1dfe63

---
## Key Features

* **🔐 Secure User Authentication:** Full authentication flow with user registration and login using JWT (JSON Web Tokens) and bcrypt for password hashing.
* **🤖 AI-Powered Analysis:** Integrates with the Google Gemini API to perform nuanced analysis of user-described symptoms.
* **📚 Personalized History:** Authenticated users can save their analysis results to a personal, protected history log.
* **📄 Detailed Views:** Users can view a list of their past analyses and click on any entry to see the full, detailed report from that session.
* **⚠️ Safety First:** The application includes clear disclaimers and is programmed to prioritize emergency advice for high-risk symptoms.
* **✅ Robust API:** A well-structured backend API built with Express.js and Mongoose for interacting with the MongoDB database.

---
## Tech Stack

| Category      | Technology                                           |
| ------------- | ---------------------------------------------------- |
| **Frontend**  | React, Vite, React Router, Axios, `date-fns`         |
| **Backend**   | Node.js, Express.js                                  |
| **Database**  | MongoDB Atlas, Mongoose                              |
| **LLM**       | Google Gemini API                                    |
| **Auth**      | JWT (JSON Web Tokens), `bcryptjs`                    |
| **Styling**   | Plain CSS with Variables                             |

---
## Screenshots

*Put your screenshots here. A table format looks clean.*

Login Page

<img src="https://github.com/user-attachments/assets/a5ab679c-f471-4f36-90fa-ed46dc76f492" width="300" height="420" />

Analyze Page

<img src="https://github.com/user-attachments/assets/4b7b7b23-8cef-4c93-8c97-cd0ff5dd9c7b" width="300" height="420" />

History Page

<img src="https://github.com/user-attachments/assets/eb540d04-04ee-4167-9909-ef096e9ce020" width="300" height="420" />

---
## API Endpoints

| Method | Endpoint              | Description                               | Protected |
| ------ | --------------------- | ----------------------------------------- | :-------: |
| POST   | `/api/auth/register`  | Register a new user                       |    No     |
| POST   | `/api/auth/login`     | Log in a user and receive a JWT           |    No     |
| POST   | `/api/analyze`        | Submit symptoms for analysis              |    Yes    |
| GET    | `/api/history`        | Get all history entries for the user      |    Yes    |
| POST   | `/api/history`        | Save a new analysis to history            |    Yes    |
| GET    | `/api/history/:id`    | Get a single history entry by its ID      |    Yes    |

---
## Local Setup and Installation

To run this project locally, you will need Node.js and a MongoDB Atlas account.

### Backend


1.  **Navigate to the backend folder:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** in the `backend` root and add the following variables:
    ```env
    MONGODB_URI="your_mongodb_connection_string"
    JWT_SECRET="your_super_secret_jwt_key"
    GEMINI_API_KEY="your_google_gemini_api_key"
    ```
4.  **Run the server:**
    ```bash
    npm run dev
    ```
    The backend will be running on `http://localhost:5000`.

### Frontend

1.  **Navigate to the frontend folder:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env.local` file** in the `frontend` root and add the backend API URL:
    ```env
    VITE_API_URL="http://localhost:5000/api"
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The frontend will be running on `http://localhost:5173`.

---
## Challenges & Learnings

*(This is a great section to show your thought process!)*

A key challenge was ensuring secure and efficient communication between the React frontend and the Node.js backend. This was solved by implementing a JWT-based authentication flow. On the frontend, an Axios interceptor was used to automatically attach the authorization token to every protected API request, which simplified the code in the components and centralized the authentication logic. Another challenge was designing the LLM prompt to return a consistent JSON structure, which was crucial for reliably parsing and displaying the data in the UI.

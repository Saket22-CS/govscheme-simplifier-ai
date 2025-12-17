# 🇮🇳 GovScheme Simplifier AI

GovScheme Simplifier AI is an AI-powered web application that helps Indian citizens understand government schemes in **simple, local language** by explaining eligibility, benefits, and application steps clearly and accessibly.

Built as part of **Startup School: Prompt to Prototype (Google for Startups × Scaler)** under the *Build the Future* theme.

---

## 🌟 Why GovScheme Simplifier AI?

Millions of Indian citizens miss out on government benefits due to:
- Complex legal language
- Long, unstructured documents
- Lack of localized explanations

GovScheme Simplifier AI bridges this gap by using **Generative AI** to convert complex policy information into **easy-to-understand, step-by-step guidance**.

---

## ✨ Key Features

- 🧠 **AI-powered explanations** of government schemes
- 🌐 **Multilingual support** (English, Hindi, Hinglish)
- 👥 Supports queries by **scheme name or personal situation**
- 📋 Structured outputs:
  - Scheme Name
  - Eligibility
  - Benefits
  - Application Steps
  - Required Documents
- 🇮🇳 **Government-style UI** for trust and accessibility
- 📱 Fully responsive and mobile-friendly
- ⚠️ Responsible AI disclaimer with verification guidance

---

## 🎯 Target Users

- Farmers
- Students
- Women beneficiaries
- Senior citizens
- Rural & first-time applicants
- Any Indian citizen seeking scheme information

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS (Government-style design)
- JavaScript

### Backend
- Python
- Flask

### AI
- **Google AI Studio**
- **Gemini Model**
- Prompt-based system instruction (“Golden Prompt”)

### Deployment
- Google Cloud Run  
  *(Publicly accessible live app as required by the showcase)*

---

## 🧠 GenAI Implementation

GovScheme Simplifier AI integrates **Google AI Studio (Gemini)** using a carefully crafted **system instruction (“Golden Prompt”)**.

### How AI is used:
- Interprets user queries (scheme-based or situational)
- Detects language preference automatically
- Generates simplified, structured responses
- Ensures consistency without custom model training

This prompt-first approach demonstrates how **effective prompt engineering alone** can rapidly prototype impactful AI solutions.

---

## 🪄 The Golden Prompt (Core Idea)

The system prompt instructs Gemini to:
- Use simple, non-technical language
- Respond in the user’s language (English/Hindi/Hinglish)
- Structure answers into clear sections
- Suggest relevant schemes when users describe their situation

📸 A screenshot/PDF of this prompt is included in the official submission as proof of AI Studio usage.

---

## 🖥️ User Interface Philosophy

Inspired by official Indian government portals:
- Clean, sectioned layout
- High contrast & accessibility-first design
- Government color palette (Blue, White, Saffron accents)
- Structured information cards
- Clear disclaimers for trust and transparency

---

## 🚀 Live Demo

🔗 **Live App:**  
👉 https://govscheme-simplifier-ai.vercel.app/

🎥 **Demo Video (≤ 3 minutes):**  
👉 https://your-demo-video-link-here

---

## 📂 Project Structure

```

govscheme-simplifier-ai/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── README.md
└── .gitignore

```

---

## ⚠️ Disclaimer

This application is an **AI-powered prototype** built for educational and demonstration purposes.  
Users are advised to verify all information on **official government portals** before applying for any scheme.

---

## 👨‍💻 Author

**Saket Chaudhary**  
- LinkedIn: https://www.linkedin.com/in/saket-chaudhary22  
- GitHub: https://github.com/Saket22-CS  

---

## 🏁 Acknowledgements

- Google for Startups  
- Scaler  
- Startup School: Prompt to Prototype  
- Google AI Studio (Gemini)

---

## 📜 License

This project is released for educational and demonstration purposes only.

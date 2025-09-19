# **CareerSathi - Your Trusted AI Career Advisor**

A **personalized AI-powered career and skills advisor** for Indian students, designed to provide **structured career guidance, skill gap analysis, and step-by-step roadmaps**. Built with **Next.js 14, TypeScript, Tailwind CSS, Prisma, and Google Cloud AI**.

---

## **🚀 Features**

* 🤖 **AI-Powered Career Recommendations**: Personalized career suggestions based on your **skills, interests, motivation, and profile**.
* 🎯 **Career Roadmaps**: Step-by-step roadmap to achieve career goals.
* 📊 **Skill Gap Analysis**: Visual skill assessment and learning suggestions.
* 🔐 **Secure Authentication**: Google OAuth and email/password authentication.
* 📝 **Multi-Stage Assessment**: 4-stage interactive assessment with optional chatbot guidance.
* 💬 **Chatbot Assistance**: CareerSathi AI assistant for guidance when unsure or confused.
* 📱 **Responsive Design**: Works seamlessly on desktop and mobile.
* 🚀 **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Prisma, Framer Motion.
* 🛡️ **Security & Privacy**: JWT-based sessions, protected routes, CSRF protection, secure storage.

---

## **📂 Project Structure**

```
src/
├── app/                        # Next.js App Router
│   ├── api/                    # API routes (profile, recommend, plan, practice, chatbot)
│   ├── auth/                   # SignIn / SignUp pages with OAuth
│   ├── dashboard/              # Student dashboard
│   ├── plan/                   # Career roadmap UI
│   ├── practice/               # Skill micro-experiments
│   │   └── experiments/        # Cards for guided tasks
│   └── layout.tsx              # Global layout
├── components/                 # Reusable UI components
│   ├── auth/                   # Authentication components
│   ├── layout/                 # Header, Footer, Navigation
│   ├── providers/              # Session & context providers
│   └── ui/                     # Buttons, Cards, Progress Bars, etc.
├── lib/                        # Utility libraries
│   ├── auth.ts                 # NextAuth.js configuration
│   ├── firebase.ts             # Firebase client
│   ├── firebase-admin.ts       # Firebase admin utilities
│   └── vertex/                 # AI helper functions (recommendations, chatbot)
├── types/                      # TypeScript definitions (profile, roadmap, career)
└── middleware.ts               # Route protection and JWT validation
```

---

## **⚡ Getting Started**

### **Prerequisites**

* Node.js v18+
* npm or yarn
* Google Cloud project (for Vertex AI)
* Firebase project (Authentication + Firestore)

---

### **1️⃣ Clone Repository**

```bash
git clone https://github.com/yourusername/careersathi.git
cd careersathi
```

### **2️⃣ Install Dependencies**

```bash
npm install
```

### **3️⃣ Configure Environment Variables**

Copy the example `.env.local` and update with actual credentials:

```bash
cp .env.local.example .env.local
```

**Required variables:**

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# LinkedIn OAuth
LINKEDIN_CLIENT_ID="your-linkedin-client-id"
LINKEDIN_CLIENT_SECRET="your-linkedin-client-secret"

# Firebase (client & admin)
NEXT_PUBLIC_FIREBASE_API_KEY="..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="..."
NEXT_PUBLIC_FIREBASE_PROJECT_ID="..."
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="..."
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="..."
NEXT_PUBLIC_FIREBASE_APP_ID="..."
FIREBASE_PRIVATE_KEY="..."
FIREBASE_CLIENT_EMAIL="..."
FIREBASE_PROJECT_ID="..."

# Optional: Google Cloud AI
GOOGLE_CLOUD_PROJECT_ID="..."
GOOGLE_CLOUD_API_KEY="..."
```

---

### **4️⃣ Setup Database**

```bash
npx prisma generate
npx prisma db push
```

---

### **5️⃣ Run Development Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the app.

---

## **🧩 Authentication System**

* **Sign In / Sign Up Pages**

  * Google OAuth ✅
  * LinkedIn OAuth ✅
  * Email/Password (optional)
* **Security Features**

  * JWT session
  * Middleware route protection
  * Secure cookies (HttpOnly, Secure, SameSite)
  * CSRF protection
* **UI/UX**

  * OAuth buttons with correct branding
  * Loading states & error handling
  * Responsive design

---

## **📝 Multi-Stage Assessment**

**Stage 1 – Identity & Context**

* Collect basic info: age, education, location
* Preferences & consent

**Stage 2 – Interests & Motivation**

* Domain selection (AI, Web, Design, Finance, etc.)
* Work preferences & motivation type
* Optional: “I’m not sure” → chatbot redirection

**Stage 3 – Skills & Competency**

* Interactive skill sliders (1–5)
* Project experience & technology familiarity
* Optional: Chatbot assistance if confused

**Stage 4 – Results & Recommendations**

* AI-generated career matches (2–5 options)
* Skill gap analysis
* Satisfaction check → redirect to chatbot if needed

**Chatbot Integration**

* Redirection triggers: motivation unclear, skill assessment help, unsatisfied with results
* Contextual guidance using AI
* Previous responses available for continuity

---

## **🎨 UI / UX Highlights**

* Mobile-first responsive design
* Gradient backgrounds, hover effects, smooth transitions
* Framer Motion animations for components
* Progress bars & stage indicators in assessment
* Touch-friendly sliders and buttons for mobile

---

## **📊 AI & Recommendation System**

* Vertex AI Gemini + Vector DB integration
* Structured output for recommendations:

```json
{
  "identity": { "age": 22, "education": "BTech", "location": "Mumbai" },
  "interests": { "domains": ["AI", "Web"], "motivation": "high-pay" },
  "skills": { "problemSolving": 4, "coding": 3, "communication": 4 },
  "chatbotTriggers": ["motivation_unclear", "skills_help_needed"]
}
```

* Dynamic re-mapping based on user feedback or micro-experiments
* Skill gap analysis and roadmap generation

---

## **🔐 Security & Privacy**

* OAuth-only authentication (no passwords stored)
* JWT-based secure sessions
* Route protection middleware
* Explicit user consent for data usage
* Secure storage and no external sharing

---

## **✅ Manual Testing Checklist**

1. `/auth/signup` → OAuth buttons visible
2. Google/LinkedIn sign-in → redirect to `/dashboard`
3. Attempt `/dashboard` without login → redirected to `/auth/signin`
4. Navigation buttons change based on auth state
5. Logout → redirects to landing page
6. Multi-stage assessment → all stages progress correctly
7. Chatbot redirection triggers working
8. Skill gap analysis and career recommendations shown correctly

---

## **💻 Tech Stack**

* **Frontend:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion
* **Backend:** NextAuth.js, Prisma ORM, SQLite
* **AI:** Google Cloud Vertex AI Gemini, Vector DB
* **Authentication:** OAuth (Google, LinkedIn), email/password optional
* **Deployment:** Vercel recommended

---

## **📚 Contributing**

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m "Add new feature"`)
4. Push branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## **📄 License**

MIT License – see [LICENSE](LICENSE)

---

## **📞 Support**

* Email: [hello@careersathi.com](mailto:hello@careersathi.com)
* Discord: Join the community for real-time support

---

Made with ❤️ for Indian students by the CareerSathi Team

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
├── app/                        # Next.js App Router – all application routes
│   ├── api/                    # Serverless API endpoints
│   │   ├── assessment/         # Assessment logic and scoring
│   │   ├── auth/               # Authentication APIs (sign-in / sign-up / OAuth)
│   │   ├── careersathi/        # Career guidance and recommendation APIs
│   │   ├── charts/             # Data visualization & analytics APIs
│   │   ├── jobs/               # Job search & recommendation APIs
│   │   ├── questions/          # Dynamic question retrieval for assessments
│   │   └── roadmap/            # Career roadmap generation APIs
│   ├── auth/                   # Public authentication pages
│   │   ├── signin/             # Sign-in page
│   │   └── signup/             # Sign-up page
│   ├── dashboard/              # Personalized student dashboard
│   │   ├── loading/            # Suspense loading state
│   │   └── page/               # Dashboard entry point
│   ├── plan/                   # Career roadmap UI (renamed from `roadmap`)
│   │   ├── [[id]]/             # Dynamic roadmap details
│   │   └── page/               # Roadmap landing page
│   ├── practice/               # Skill-building practice modules
│   │   └── experiments/        # Guided micro-experiments
│   ├── how-it-helps/           # Static informational page
│   ├── jobs/                   # Job listings & search interface
│   │   ├── loading/
│   │   └── page/
│   ├── chat/                   # Real-time chat interface
│   │   └── [[id]]/             # Dynamic chat sessions
│   │       └── page/
│   ├── assessment/             # Assessment flow entry page
│   ├── layout/                 # Global layout wrapper (shared header/footer)
│   ├── page/                   # Root landing page
│   ├── error/                  # Application-wide error boundary
│   ├── not-found/              # 404 page
│   └── globals.css             # Global styles
│
├── components/                 # Reusable, feature-oriented React components
│   ├── auth/                   # Authentication UI widgets
│   ├── layout/                 # Header, footer, navigation bars
│   ├── providers/              # Context & session providers
│   ├── dashboard/              # Dashboard cards and charts
│   ├── assessment/             # Assessment UI elements
│   ├── chat/                   # Chat UI widgets
│   ├── jobs/                   # Job-related components
│   ├── roadmap/                # Career roadmap visuals
│   └── ui/                     # Shared UI primitives (buttons, cards, progress bars)
│
├── hooks/                      # Custom React hooks
│   ├── useAutoScroll/          # Auto-scrolling for chat windows
│   ├── useChatMessages/        # Chat message management
│   └── useChatSessions/        # Chat session handling
│
├── lib/                        # Core utilities and service layers
│   ├── assessmentChecker/      # Assessment validation and scoring helpers
│   ├── atom/                   # Jotai/Recoil state atoms
│   ├── auth/                   # Authentication configuration
│   ├── chatStorage/            # Persistent chat storage utilities
│   ├── firebase/               # Firebase client SDK
│   ├── prisma/                 # Prisma ORM client
│   ├── questionService/        # Question retrieval service
│   ├── randomGreeting/         # Friendly greeting generator
│   ├── utils/                  # General-purpose helper functions
│   ├── parseJDToHTML/          # Parse job descriptions into HTML
│   ├── getRecommendedJobs/     # Job recommendation engine
│   └── vertex/                 # AI helper functions (Vertex AI)
│
├── types/                      # Central TypeScript type definitions
│   ├── profile/                # User profile types
│   ├── roadmap/                # Career roadmap types
│   └── career/                 # Career and job types
│
├── middleware/                 # Route protection & JWT validation
├── .envExample                 # Environment variable template
├── .eslintrc.json              # ESLint configuration
└── .gitignore                  # Git ignore rules

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
git clone https://github.com/itgithubplatform/careersathi.git
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

* **Frontend:** Next.js 13+, TypeScript, Tailwind CSS, Framer Motion
* **Backend:** NextAuth.js, Prisma ORM, SQLite, postgreSQL, Firestore
* **AI:** Google Cloud Vertex AI Gemini, Vector DB(not implemented currently)
* **Authentication:** OAuth (Google), email/password (not implemented)(optional)
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

* Email: [hello@careersathi.com](mailto:saswatapal960@gmail.com)
* connect with us for real-time support

---

Made with ❤️ for Indian students by the CareerSathi Team

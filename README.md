# CareerSathi - Your Trusted Career Advisor

A personalized AI career and skills advisor designed specifically for Indian students. Built with Next.js, TypeScript, and Google Cloud AI.

## Features

- 🤖 **AI-Powered Career Guidance**: Personalized recommendations based on skills and interests
- 🎯 **Career Roadmaps**: Step-by-step paths to achieve career goals
- 📊 **Skills Gap Analysis**: Identify and bridge skill gaps for target roles
- 🔐 **Secure Authentication**: Google OAuth and email/password authentication
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- 🚀 **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Prisma

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/careersathi.git
cd careersathi
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Fill in your environment variables:
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` for Google OAuth
- `NEXTAUTH_SECRET` for NextAuth.js
- `DATABASE_URL` for your database

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── layout/           # Layout components
│   ├── providers/        # Context providers
│   └── ui/               # UI components
├── lib/                  # Utility libraries
└── types/                # TypeScript type definitions
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email hello@careersathi.com or join our community Discord.

---

Made with ❤️ for Indian students by the CareerSathi team.
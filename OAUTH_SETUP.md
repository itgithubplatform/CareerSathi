# CareerSathi - OAuth Authentication Setup

## Clean OAuth-Only Authentication with Google & LinkedIn

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

```bash
npx prisma generate
npx prisma db push
```

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API and Google Identity API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client IDs
5. Set authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google` (for production)

### 4. LinkedIn OAuth Setup

1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
2. Create a new app
3. In Auth tab, add redirect URLs:
   - `http://localhost:3000/api/auth/callback/linkedin`
   - `https://yourdomain.com/api/auth/callback/linkedin` (for production)
4. Request access to "Sign In with LinkedIn" product

### 5. Environment Variables

Update your `.env.local` file:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-key-generate-new-one"

# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-oauth-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"

# LinkedIn OAuth (from LinkedIn Developer Portal)
LINKEDIN_CLIENT_ID="your-linkedin-client-id"
LINKEDIN_CLIENT_SECRET="your-linkedin-client-secret"

# Google Cloud AI (optional for AI features)
GOOGLE_CLOUD_PROJECT_ID="your-google-cloud-project-id"
GOOGLE_CLOUD_API_KEY="your-google-cloud-api-key"
```

### 6. Run Development Server

```bash
npm run dev
```

## Authentication Features

### Available Sign-in Methods:
1. **Google OAuth** - Sign in with Google account
2. **LinkedIn OAuth** - Sign in with LinkedIn account

### Security Features:
- Secure session management with NextAuth.js
- Prisma database adapter for user data
- Protected routes with automatic redirects
- JWT tokens with secure cookies

### User Experience:
- Clean, modern OAuth-only sign-in page
- Visual loading states and error handling
- Responsive design for all devices
- Smooth animations and transitions
- Provider indication in dashboard

## File Structure

```
src/
├── app/
│   ├── api/auth/
│   │   └── [...nextauth]/route.ts    # NextAuth handler
│   ├── auth/
│   │   └── signin/page.tsx           # OAuth sign-in page
│   ├── dashboard/page.tsx            # Protected dashboard
│   └── page.tsx                      # Landing page
├── components/
│   ├── layout/
│   │   └── Header.tsx                # Navigation with auth
│   └── providers/
│       └── AuthProvider.tsx          # Session provider
├── lib/
│   ├── auth.ts                       # NextAuth configuration
│   └── prisma.ts                     # Prisma client
├── types/
│   └── next-auth.d.ts                # TypeScript definitions
├── middleware.ts                     # Route protection
└── prisma/
    └── schema.prisma                 # Database schema
```

## Database Schema

The Prisma schema includes:
- **User** - User profiles from OAuth providers
- **Account** - OAuth account connections
- **Session** - User sessions
- **UserProfile** - Extended user profile data
- **VerificationToken** - NextAuth verification tokens

## Troubleshooting

### Common Issues:

1. **OAuth Redirect Mismatch**
   - Ensure redirect URIs match exactly in provider settings
   - Check for trailing slashes and protocol (http/https)

2. **Session Not Persisting**
   - Verify NEXTAUTH_SECRET is set
   - Check NEXTAUTH_URL matches your domain

3. **LinkedIn OAuth Issues**
   - Ensure app is approved for "Sign In with LinkedIn"
   - Check scope permissions in LinkedIn app settings

4. **Database Issues**
   - Run `npx prisma db push` to sync schema
   - Check DATABASE_URL is correct

### Testing Authentication:

1. Test Google OAuth flow
2. Test LinkedIn OAuth flow
3. Verify protected routes redirect properly
4. Test logout functionality
5. Check user data is stored in database

## Production Deployment

1. Update environment variables for production domain
2. Update OAuth redirect URIs for production
3. Generate new NEXTAUTH_SECRET for production
4. Set up production database
5. Configure proper CORS policies

## Clean Architecture Benefits

- **No Firebase Dependencies** - Simpler setup and maintenance
- **Pure OAuth** - Industry standard authentication
- **Prisma ORM** - Type-safe database operations
- **NextAuth.js** - Battle-tested authentication library
- **Minimal Complexity** - Easier to debug and extend
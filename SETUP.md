# CareerSathi - Complete Setup Guide

## Authentication Setup with Google & LinkedIn OAuth

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Authentication and Firestore Database
4. In Authentication > Sign-in method, enable:
   - Email/Password
   - Google
   - (Optional) Anonymous for testing

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

Update your `.env.local` file with actual values:

```env
# Database
DATABASE_URL="file:./dev.db"

# Firebase Configuration (from Firebase Console > Project Settings)
NEXT_PUBLIC_FIREBASE_API_KEY="your-actual-firebase-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-actual-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-actual-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-actual-app-id"

# Firebase Admin SDK (from Firebase Console > Project Settings > Service Accounts)
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com"
FIREBASE_PROJECT_ID="your-actual-project-id"

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

### 6. Database Setup

```bash
npx prisma generate
npx prisma db push
```

### 7. Run Development Server

```bash
npm run dev
```

## Authentication Features

### Available Sign-in Methods:
1. **Email/Password** - Traditional registration and login
2. **Google OAuth** - Sign in with Google account
3. **LinkedIn OAuth** - Sign in with LinkedIn account

### Security Features:
- Password strength validation
- Secure session management with NextAuth.js
- Firebase Admin SDK for server-side verification
- Protected routes with automatic redirects

### User Experience:
- Visual password strength indicator
- Toast notifications for all actions
- Responsive design for all devices
- Smooth animations and transitions

## File Structure

```
src/
├── app/
│   ├── api/auth/
│   │   ├── [...nextauth]/route.ts    # NextAuth handler
│   │   ├── register/route.ts         # User registration
│   │   └── verify/route.ts           # Token verification
│   ├── auth/
│   │   ├── signin/page.tsx           # Sign-in page
│   │   └── signup/page.tsx           # Sign-up page
│   └── dashboard/page.tsx            # Protected dashboard
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx        # Route protection
│   ├── layout/
│   │   └── Header.tsx                # Navigation with auth
│   └── providers/
│       └── AuthProvider.tsx          # Session provider
├── lib/
│   ├── auth.ts                       # NextAuth configuration
│   ├── firebase.ts                   # Firebase client
│   └── firebase-admin.ts             # Firebase admin
└── types/
    └── next-auth.d.ts                # TypeScript definitions
```

## Troubleshooting

### Common Issues:

1. **OAuth Redirect Mismatch**
   - Ensure redirect URIs match exactly in provider settings
   - Check for trailing slashes and protocol (http/https)

2. **Firebase Connection Issues**
   - Verify all Firebase environment variables
   - Check Firebase project permissions
   - Ensure Firestore is enabled

3. **Session Not Persisting**
   - Verify NEXTAUTH_SECRET is set
   - Check NEXTAUTH_URL matches your domain

4. **LinkedIn OAuth Issues**
   - Ensure app is approved for "Sign In with LinkedIn"
   - Check scope permissions in LinkedIn app settings

### Testing Authentication:

1. Test email/password registration and login
2. Test Google OAuth flow
3. Test LinkedIn OAuth flow
4. Verify protected routes redirect properly
5. Test logout functionality

## Production Deployment

1. Update environment variables for production domain
2. Update OAuth redirect URIs for production
3. Generate new NEXTAUTH_SECRET for production
4. Configure Firebase security rules
5. Set up proper CORS policies

## Support

For issues or questions:
- Check Firebase Console for authentication logs
- Review NextAuth.js documentation
- Check browser developer tools for errors
- Verify all environment variables are set correctly
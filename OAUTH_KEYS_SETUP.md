# OAuth Keys Setup Guide - CareerSathi

## 🔑 Required OAuth Keys and Configuration

### 1. Google OAuth Setup

#### Step 1: Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Enable the following APIs:
   - Google+ API
   - Google Identity API
   - People API

#### Step 2: Create OAuth 2.0 Credentials
1. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
2. Choose **Web application**
3. Add **Authorized redirect URIs**:
   ```
   http://localhost:3000/api/auth/callback/google
   https://yourdomain.com/api/auth/callback/google
   ```
4. Copy the **Client ID** and **Client Secret**

#### Step 3: Add to .env.local
```env
GOOGLE_CLIENT_ID="123456789-abcdefghijklmnop.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-abcdefghijklmnopqrstuvwxyz"
```

### 2. LinkedIn OAuth Setup

#### Step 1: LinkedIn Developer Portal
1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
2. Click **Create App**
3. Fill in app details:
   - **App name**: CareerSathi
   - **LinkedIn Page**: Your company page (or create one)
   - **Privacy policy URL**: Your privacy policy
   - **App logo**: Upload your logo

#### Step 2: Configure OAuth Settings
1. Go to **Auth** tab
2. Add **Authorized redirect URLs**:
   ```
   http://localhost:3000/api/auth/callback/linkedin
   https://yourdomain.com/api/auth/callback/linkedin
   ```
3. Request access to **Sign In with LinkedIn** product
4. Copy **Client ID** and **Client Secret**

#### Step 3: Add to .env.local
```env
LINKEDIN_CLIENT_ID="86abcdefghijklmn"
LINKEDIN_CLIENT_SECRET="AbCdEfGhIjKlMnOp"
```

### 3. NextAuth Configuration

#### Generate Secret Key
```bash
# Generate a random secret
openssl rand -base64 32
```

#### Add to .env.local
```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-key-here"
```

## 📄 Complete .env.local File

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="AbCdEfGhIjKlMnOpQrStUvWxYz123456"

# Google OAuth
GOOGLE_CLIENT_ID="123456789-abcdefghijklmnop.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-abcdefghijklmnopqrstuvwxyz"

# LinkedIn OAuth
LINKEDIN_CLIENT_ID="86abcdefghijklmn"
LINKEDIN_CLIENT_SECRET="AbCdEfGhIjKlMnOp"

# Optional: Google Cloud AI
GOOGLE_CLOUD_PROJECT_ID="your-project-id"
GOOGLE_CLOUD_API_KEY="AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz"
```

## 🚀 Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
npx prisma generate
npx prisma db push
```

### 3. Start Development Server
```bash
npm run dev
```

## 🔍 Verification Steps

### Test Google OAuth:
1. Go to `http://localhost:3000/auth/signup`
2. Click "Sign up with Google"
3. Should redirect to Google consent screen
4. After approval, should redirect to dashboard

### Test LinkedIn OAuth:
1. Go to `http://localhost:3000/auth/signup`
2. Click "Sign up with LinkedIn"
3. Should redirect to LinkedIn consent screen
4. After approval, should redirect to dashboard

## 🛠️ Troubleshooting

### Common Issues:

#### 1. "Redirect URI Mismatch"
- **Problem**: OAuth provider rejects the redirect
- **Solution**: Ensure redirect URIs match exactly in provider settings
- **Check**: No trailing slashes, correct protocol (http/https)

#### 2. "Invalid Client ID"
- **Problem**: Wrong client ID in environment variables
- **Solution**: Double-check client ID from provider console
- **Check**: No extra spaces or quotes in .env.local

#### 3. "Access Denied"
- **Problem**: OAuth app not approved or configured properly
- **Solution**: 
  - Google: Ensure APIs are enabled
  - LinkedIn: Request "Sign In with LinkedIn" product access

#### 4. "Session Not Found"
- **Problem**: NextAuth session issues
- **Solution**: Check NEXTAUTH_SECRET and NEXTAUTH_URL are set correctly

### Debug Mode:
Add to .env.local for debugging:
```env
NEXTAUTH_DEBUG=true
```

## 📱 Production Setup

### For Production Deployment:

1. **Update Environment Variables**:
```env
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="new-production-secret-key"
```

2. **Update OAuth Redirect URIs**:
- Google: Add `https://yourdomain.com/api/auth/callback/google`
- LinkedIn: Add `https://yourdomain.com/api/auth/callback/linkedin`

3. **Database**:
- Use production database (PostgreSQL, MySQL, etc.)
- Update DATABASE_URL accordingly

## 🎯 Features Confirmed

### ✅ Registration Page Created
- **Location**: `/auth/signup`
- **Features**: 
  - Google OAuth signup
  - LinkedIn OAuth signup
  - Benefits display
  - Loading states
  - Error handling
  - Responsive design

### ✅ Sign-In Page Updated
- **Location**: `/auth/signin`
- **Features**:
  - Google OAuth signin
  - LinkedIn OAuth signin
  - Clean design
  - Error handling

### ✅ Navigation Updated
- Header includes both "Sign In" and "Sign Up" links
- Main page CTAs prioritize signup
- Mobile navigation includes both options

### ✅ OAuth Configuration
- NextAuth.js properly configured
- Prisma adapter for database storage
- JWT sessions for security
- Protected routes with middleware

## 📞 Support

If you encounter issues:
1. Check browser developer console for errors
2. Verify all environment variables are set
3. Ensure OAuth apps are properly configured
4. Test redirect URIs match exactly
5. Check database connection and schema
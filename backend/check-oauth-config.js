#!/usr/bin/env node

/**
 * Google OAuth Configuration Checker
 * Run this to verify your OAuth setup
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env') });

console.log('\n🔍 Checking Google OAuth Configuration...\n');

const checks = [];

// Check 1: Environment variables
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackUrl = process.env.GOOGLE_CALLBACK_URL;
const frontendUrl = process.env.FRONTEND_URL;

console.log('📋 Environment Variables:');
console.log('─────────────────────────────────────────────────────');

if (clientId) {
  console.log('✅ GOOGLE_CLIENT_ID:', clientId);
  checks.push(true);
} else {
  console.log('❌ GOOGLE_CLIENT_ID: NOT SET');
  checks.push(false);
}

if (clientSecret) {
  console.log('✅ GOOGLE_CLIENT_SECRET:', clientSecret.substring(0, 10) + '...');
  checks.push(true);
} else {
  console.log('❌ GOOGLE_CLIENT_SECRET: NOT SET');
  checks.push(false);
}

if (callbackUrl) {
  console.log('✅ GOOGLE_CALLBACK_URL:', callbackUrl);
  checks.push(true);
} else {
  console.log('❌ GOOGLE_CALLBACK_URL: NOT SET');
  checks.push(false);
}

if (frontendUrl) {
  console.log('✅ FRONTEND_URL:', frontendUrl);
  checks.push(true);
} else {
  console.log('❌ FRONTEND_URL: NOT SET');
  checks.push(false);
}

console.log('\n🔧 Configuration Validation:');
console.log('─────────────────────────────────────────────────────');

// Check 2: Callback URL format
if (callbackUrl) {
  if (callbackUrl.startsWith('http://localhost:')) {
    console.log('✅ Callback URL uses http://localhost (correct for development)');
  } else if (callbackUrl.startsWith('https://')) {
    console.log('⚠️  Callback URL uses https:// (make sure your server supports HTTPS)');
  } else {
    console.log('❌ Callback URL format looks incorrect');
    checks.push(false);
  }

  if (callbackUrl.endsWith('/api/auth/google/callback')) {
    console.log('✅ Callback URL path is correct');
  } else {
    console.log('❌ Callback URL path should end with /api/auth/google/callback');
    checks.push(false);
  }

  if (callbackUrl.includes(':3001')) {
    console.log('✅ Callback URL uses port 3001 (matches server)');
  } else {
    console.log('⚠️  Callback URL port might not match server port (should be 3001)');
  }

  if (callbackUrl.endsWith('/')) {
    console.log('❌ Callback URL has trailing slash (remove it!)');
    checks.push(false);
  } else {
    console.log('✅ Callback URL has no trailing slash');
  }
}

// Check 3: Client ID format
if (clientId) {
  if (clientId.endsWith('.apps.googleusercontent.com')) {
    console.log('✅ Client ID format looks correct');
  } else {
    console.log('⚠️  Client ID format might be incorrect (should end with .apps.googleusercontent.com)');
  }
}

// Check 4: Client Secret format
if (clientSecret) {
  if (clientSecret.startsWith('GOCSPX-')) {
    console.log('✅ Client Secret format looks correct');
  } else {
    console.log('⚠️  Client Secret format might be incorrect (should start with GOCSPX-)');
  }
}

console.log('\n📝 Next Steps:');
console.log('─────────────────────────────────────────────────────');

const allPassed = checks.every(check => check);

if (allPassed) {
  console.log('✅ All checks passed! Your .env configuration looks good.\n');
  console.log('If you\'re still getting errors, check:');
  console.log('1. Google Cloud Console - Authorized redirect URIs');
  console.log('   Must include: ' + callbackUrl);
  console.log('2. OAuth Consent Screen - Test users');
  console.log('   Add your Google account as a test user');
  console.log('3. Restart your backend server after any changes');
  console.log('4. Clear browser cache/cookies or use incognito mode');
} else {
  console.log('❌ Some checks failed. Please fix the issues above.\n');
  console.log('Update your .env file and run this script again.');
}

console.log('\n🔗 Useful Links:');
console.log('─────────────────────────────────────────────────────');
console.log('Google Cloud Console: https://console.cloud.google.com/apis/credentials');
console.log('Your Client ID: ' + (clientId || 'NOT SET'));
console.log('\n');

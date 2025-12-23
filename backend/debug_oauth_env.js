import dotenv from 'dotenv';
dotenv.config();

console.log('Checking Google OAuth Configuration...');

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackUrl = process.env.GOOGLE_CALLBACK_URL;

console.log(`GOOGLE_CLIENT_ID: '${clientId}' (Length: ${clientId.length})`);
console.log(`GOOGLE_CLIENT_SECRET: '${clientSecret}' (Length: ${clientSecret.length})`);
console.log(`GOOGLE_CALLBACK_URL: '${callbackUrl}' (Length: ${callbackUrl.length})`);

if (clientId.trim() !== clientId) console.warn('⚠️  WARNING: GOOGLE_CLIENT_ID has surrounding whitespace!');
if (clientSecret.trim() !== clientSecret) console.warn('⚠️  WARNING: GOOGLE_CLIENT_SECRET has surrounding whitespace!');

if (!clientId || !clientSecret || !callbackUrl) {
    console.error('❌ Missing required environment variables for Google OAuth.');
} else {
    console.log('✅ Environment variables appear to be set.');
}

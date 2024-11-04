const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file in the env folder
const result = dotenv.config({ path: path.resolve(__dirname, './env/.env') });

if (result.error) {
  throw result.error;
}

// Create a new environment file
const envFile = `export const environment = {
  production: false,
  supabaseUrl: '${process.env.SUPABASE_URL}',
  supabaseKey: '${process.env.SUPABASE_KEY}',
  geminiKey: '${process.env.GEMINI_KEY}',
  googleClient: '${process.env.API_KEY}'
};`;

// Write to src/environments/environment.ts
fs.writeFileSync('src/environments/environment.ts', envFile);

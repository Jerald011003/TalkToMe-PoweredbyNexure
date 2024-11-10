const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const result = dotenv.config({ path: path.resolve(__dirname, './env/.env') });

if (result.error) {
  throw result.error;
}

const envFile = `export const environment = {
  production: false,
  supabaseUrl: '${process.env.SUPABASE_URL}',
  supabaseKey: '${process.env.SUPABASE_KEY}',
  geminiKey: '${process.env.GEMINI_KEY}',
  googleClient: '${process.env.API_KEY}'
};`;

fs.writeFileSync('src/environments/environment.ts', envFile);

const fs = require('fs');

const environment = {
  production: process.env.NODE_ENV === 'production',
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_KEY,
  geminiKey: process.env.GEMINI_KEY,
  googleClient: process.env.API_KEY,
};

const content = `export const environment = ${JSON.stringify(environment, null, 2)};`;

fs.writeFileSync('src/environments/environment.prod.ts', content);

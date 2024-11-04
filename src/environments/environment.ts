// environment.prod.ts
export const environment = {
  production: false,
  supabaseUrl: process.env['SUPABASE_URL'],
  supabaseKey: process.env['SUPABASE_KEY'],
  geminiKey: process.env['GEMINI_KEY'],
  googleClient: process.env['API_KEY']
};

export const environment = {
    production: true,
    supabaseUrl: process.env['SUPABASE_URL'], // This will not work in the browser directly
    supabaseKey: process.env['SUPABASE_KEY'],
    geminiKey: process.env['GEMINI_KEY'],
    googleClient: process.env['API_KEY']
  };
  
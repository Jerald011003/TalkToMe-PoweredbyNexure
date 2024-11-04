export const environment = {
  production: false,
  supabaseUrl: process.env['SUPABASE_URL'] || '',
  supabaseKey: process.env['SUPABASE_KEY'] || '',
};

export const apiKey = {
  geminiKey: process.env['GEMINI_KEY'] || '',
};

export const google_client = {
  googleClient: process.env['GOOGLE_CLIENT'] || '',
};

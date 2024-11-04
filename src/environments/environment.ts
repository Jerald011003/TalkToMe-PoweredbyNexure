export interface Environment {
  production: boolean;
  supabaseUrl: string;
  supabaseKey: string;
  geminiKey: string;
  googleClient: string;
}

export const environment: Environment = {
  production: false, 
  supabaseUrl: '',
  supabaseKey: '',
  geminiKey: '',
  googleClient: ''
};

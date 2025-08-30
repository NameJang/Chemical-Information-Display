import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ngcqeetepmkgnbscjbyt.supabase.co'; // URL จาก Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nY3FlZXRlcG1rZ25ic2NqYnl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc4ODk3MTMsImV4cCI6MjA0MzQ2NTcxM30.70KBB6u7sIHkGDR_JCCeOVGFnYDF7ha0iZtYYFFmjTU'; // anon key จาก Supabase

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
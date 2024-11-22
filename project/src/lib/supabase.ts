import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ykrhvnvkqhfpduacjpkx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrcmh2bnZrcWhmcGR1YWNqcGt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NzMzMzAsImV4cCI6MjAyNTA0OTMzMH0.ZRK_Gm-IXFHKWvPOVhHgFyMPw9FWlEYmAODXuJKhRa4';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      resumes: {
        Row: {
          id: string
          created_at: string
          user_id: string
          data: Json
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          data: Json
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          data?: Json
        }
      }
      users: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
      }
    }
  }
}
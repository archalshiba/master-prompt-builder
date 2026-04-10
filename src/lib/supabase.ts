import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
        };
        Update: {
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      generated_packages: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          idea: string;
          master_prompt: string | null;
          prd: string | null;
          plan: string | null;
          tasks: string | null;
          agent_instructions: string | null;
          user_instructions: string | null;
          tech_stack: string[] | null;
          complexity: string | null;
          niche: string | null;
          target_audience: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          idea: string;
          master_prompt?: string | null;
          prd?: string | null;
          plan?: string | null;
          tasks?: string | null;
          agent_instructions?: string | null;
          user_instructions?: string | null;
          tech_stack?: string[] | null;
          complexity?: string | null;
          niche?: string | null;
          target_audience?: string[] | null;
        };
        Update: {
          name?: string;
          master_prompt?: string | null;
          prd?: string | null;
          plan?: string | null;
          tasks?: string | null;
          agent_instructions?: string | null;
          user_instructions?: string | null;
          tech_stack?: string[] | null;
          complexity?: string | null;
          niche?: string | null;
          target_audience?: string[] | null;
          updated_at?: string;
        };
      };
    };
  };
}

export type User = Database['public']['Tables']['users']['Row'];
export type GeneratedPackage = Database['public']['Tables']['generated_packages']['Row'];

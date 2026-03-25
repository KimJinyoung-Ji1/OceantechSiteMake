import { createClient, SupabaseClient } from '@supabase/supabase-js';

export type Database = {
  oceantech: {
    Tables: {
      inquiries: {
        Row: {
          id: number;
          created_at: string;
          name: string;
          email: string;
          phone: string | null;
          inquiry_type: string | null;
          content: string;
        };
        Insert: {
          id?: number;
          created_at?: string;
          name: string;
          email: string;
          phone?: string | null;
          inquiry_type?: string | null;
          content: string;
        };
        Update: {
          id?: number;
          created_at?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          inquiry_type?: string | null;
          content?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};

let browserClient: SupabaseClient<Database, 'oceantech'> | null = null;

export function getSupabaseClient(): SupabaseClient<Database, 'oceantech'> | null {
  if (browserClient) return browserClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;

  browserClient = createClient<Database, 'oceantech'>(url, anonKey, { db: { schema: 'oceantech' } });
  return browserClient;
}

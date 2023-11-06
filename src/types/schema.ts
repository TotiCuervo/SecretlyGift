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
      event: {
        Row: {
          created_at: string
          created_by: string
          date: string
          id: number
          name: string
          uuid: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          date: string
          id?: number
          name: string
          uuid?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          date?: string
          id?: number
          name?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      participant: {
        Row: {
          created_at: string
          event: string
          id: number
          is_admin: boolean
          name: string | null
          profile: string
        }
        Insert: {
          created_at?: string
          event: string
          id?: number
          is_admin?: boolean
          name?: string | null
          profile: string
        }
        Update: {
          created_at?: string
          event?: string
          id?: number
          is_admin?: boolean
          name?: string | null
          profile?: string
        }
        Relationships: [
          {
            foreignKeyName: "participant_event_fkey"
            columns: ["event"]
            isOneToOne: false
            referencedRelation: "event"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "participant_profile_fkey"
            columns: ["profile"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

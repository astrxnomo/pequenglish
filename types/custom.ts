import { type Database } from './supabase'

export type Task = Database['public']['Tables']['tasks']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Class = Database['public']['Tables']['classes']['Row']
export type Role = Database['public']['Tables']['users_role']['Row']

export type Message =
  | { success: string }
  | { error: string }
  | { message: string }

import { type Database } from './supabase'

export type Role = Database['public']['Tables']['users_role']['Row']

export type Profile = Database['public']['Tables']['profiles']['Row'] & {
  tasks: Array<Database['public']['Tables']['tasks']['Row']>
  classes: Array<Database['public']['Tables']['classes']['Row']>
  users_role: Array<Database['public']['Tables']['users_role']['Row']>
}

export type Task = Database['public']['Tables']['tasks']['Row'] & {
  profiles: Database['public']['Tables']['profiles']['Row']
}

export type Class = Database['public']['Tables']['classes']['Row'] & {
  profiles: Database['public']['Tables']['profiles']['Row']
}

export type Message =
  | { success: string }
  | { error: string }
  | { message: string }

import { User } from '@supabase/supabase-js'

export const getUsername = (
  user: User | null,
  defaultValue = '당신'
): string => {
  if (!user) {
    return defaultValue
  }

  return user.user_metadata?.name || user.email?.split('@')[0] || defaultValue
}

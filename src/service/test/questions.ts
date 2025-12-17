import { DB_TABLES } from '@/constants/supabase-db/dbTables'
import { Database } from '@/types/supabase'
import { supabase } from '@/utils/supabase'

type QuestionRow = Database['public']['Tables']['questions']['Row']

export const getQuestions = async () => {
  const { data, error } = await supabase
    .from(DB_TABLES.QUESTIONS)
    .select('*')
    .order('question_id', { ascending: true })

  return { data: data as QuestionRow[] | null, error }
}

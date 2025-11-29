import { createClient } from '../utils/supabase/server'
import { cookies } from 'next/headers'
import VeritasEducational from '../components/VeritasClient' 

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <VeritasEducational todos={todos} />
  )
}
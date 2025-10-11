import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://gjhhdtbqqrjydpkyukht.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqaGhkdGJxcXJqeWRwa3l1a2h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1MTk3ODEsImV4cCI6MjA3NDA5NTc4MX0.Rrjo8ar2OpdmtFhoWAtdd3p2mOOTUfI8rcWV5pY58As'
)

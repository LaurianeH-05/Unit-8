import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://eztyksgiwezexzpypxaq.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6dHlrc2dpd2V6ZXh6cHlweGFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMzU1MjEsImV4cCI6MjA2MDYxMTUyMX0.iNcj15nr73wNYDSlQQH5Ps81dJSIs3VO1fgwvi8aOWE'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
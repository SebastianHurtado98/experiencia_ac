import {createClient} from '@supabase/supabase-js'

const supabaseUrl = "https://sosvypyxwptwtlbaivxz.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc3Z5cHl4d3B0d3RsYmFpdnh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0OTQyNjMsImV4cCI6MjA0OTA3MDI2M30.Kyw1_LFRj1GpOv3BIUcxYKrsT00llC3GwzUXpHEGGr4"

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
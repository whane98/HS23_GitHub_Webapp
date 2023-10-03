console.log("Initialisierung Supabase");

// Supabase Initialisierung

const supabaseUrl = 'https://hthbqybdfslwcetgumsg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0aGJxeWJkZnNsd2NldGd1bXNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzMTY0ODcsImV4cCI6MjAxMTg5MjQ4N30.J_x31Yj_J6yiy9GJrd4basZex9hRl091cNommZASQzk'
const supa = supabase.createClient(supabaseUrl, supabaseKey)

export { supa }
console.log("Initialisierung Supabase");

// Supabase Initialisierung

// Hier URL und Key eintragen
const supabaseUrl = 'https://sirlqkvgtuxlsfeeymfz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpcmxxa3ZndHV4bHNmZWV5bWZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYyNDgwMDEsImV4cCI6MjAxMTgyNDAwMX0.k7mvG0tEOBa7yRtsRmLsNno7X9OQ72vLvQkSBbRem6A'
const supa = supabase.createClient(supabaseUrl, supabaseKey, {
    auth: {
        redirectTo: window.location.origin,  // This will redirect back to the page where the request originated from
    },
});

export { supa }

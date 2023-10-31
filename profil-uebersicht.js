import { supa } from "/supabase";

console.log("00 JavaScript verbunden")

// Assume you have retrieved the level from Supabase and stored it in a variable named 'level_name'

// Replace the placeholder text with the level
document.getElementById('dein-aktueller-punktestand').textContent = level_name;

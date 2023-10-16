import { supa } from "/supabase.js";

console.log("00 JavaScript verbunden")

function toggleTraining(button) {
    if (button.textContent === "Training starten") {
        button.textContent = "Training beenden";
        button.style.backgroundColor = "red";
    } else {
        button.textContent = "Training starten";
        button.style.backgroundColor = ""; // Zurücksetzen auf die Standard-Hintergrundfarbe
    }
}
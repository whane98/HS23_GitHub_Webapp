import { supa } from "/supabase.js";

console.log("00 JavaScript verbunden")


// Button muss noch vom html implementiert werden //

function toggleButton() {
    const button = document.getElementById("button-training-starten");
    if (button.innerHTML === "Training starten") {
      button.innerHTML = "Training beenden";
      button.style.backgroundColor = "red"; // Hintergrundfarbe auf Rot ändern
    } else {
      button.innerHTML = "Training starten";
      button.style.backgroundColor = ""; // Hintergrundfarbe zurücksetzen (leer lassen oder auf Ihre Standardfarbe setzen)
    }
  }
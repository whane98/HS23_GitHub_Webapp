import { supa } from "/supabase.js";

console.log("00 JavaScript verbunden")

let trainingStarted = false;
const button = document.getElementById('button-login');

button.addEventListener('click', function() {
    if (!trainingStarted) {
        button.textContent = 'Training stoppen';
        button.style.backgroundColor = 'red';
    } else {
        // Hier können Sie den Link auf die andere Seite einfügen
        window.location.href = 'URL_DER_ANDEREN_SEITE.html';
    }
    trainingStarted = !trainingStarted;
});
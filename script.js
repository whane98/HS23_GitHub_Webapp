import { supa } from "/supabase.js";

console.log("00 JavaScript verbunden")


var divElement = document.getElementById('level-uebersicht-box-1');
divElement.addEventListener('click', changeColor)
function changeColor() {
    console.log(this)
    divElement.style.backgroundColor = '#E4EF75';
}

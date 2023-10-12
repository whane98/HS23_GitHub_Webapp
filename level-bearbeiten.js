import { supa } from "/supabase.js";

console.log("00 JavaScript verbunden")

// Select all elements with the class 'card-v2'
var cardElements = document.querySelectorAll('.card-v2');

// Function to handle card click
function handleCardClick(event) {
    // Reset the background color of all cards to their default state (empty)
    cardElements.forEach(function(card) {
        card.style.backgroundColor = '';
    });

    // Change the background color of the clicked card
    event.currentTarget.style.backgroundColor = '#E4EF75';
}

// Add click event listeners to the cards
cardElements.forEach(function(card) {
    card.addEventListener('click', handleCardClick);
});

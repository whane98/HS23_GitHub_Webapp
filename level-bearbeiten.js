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

// Now we go for button-speichern ------------------------------------------------------------------------------------

// Function to handle clicking the "button-speichern"
function handleSpeichernClick() {
    // Validate if a fitness level is selected
    const isAnyLevelSelected =
        document.getElementById('card-1').style.backgroundColor === 'rgb(228, 239, 117)' ||
        document.getElementById('card-2').style.backgroundColor === 'rgb(228, 239, 117)' ||
        document.getElementById('card-3').style.backgroundColor === 'rgb(228, 239, 117)' ||
        document.getElementById('card-4').style.backgroundColor === 'rgb(228, 239, 117)';

    if (!isAnyLevelSelected) {
        window.alert("Please select a fitness level.");
    } else {
        // Enable the button and handle the redirection
        window.location.href = "details.html";
    }
}

// Add click event listener to the "button-speichern"
document.getElementById('button-speichern').addEventListener('click', handleSpeichernClick);



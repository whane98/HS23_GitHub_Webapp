import { supa } from "/supabase.js";

console.log("00 JavaScript verbunden")


// Select all elements with the class 'level-uebersicht'
var levelUebersichtElements = document.querySelectorAll('.level-uebersicht');

// Iterate through the selected elements (if needed)
levelUebersichtElements.forEach(function(element) {
    // Accessing child elements within each 'level-uebersicht' element
    var box1 = element.querySelector('#level-uebersicht-box-1');
    var box2 = element.querySelector('#level-uebersicht-box-2');
    var box3 = element.querySelector('#level-uebersicht-box-3');
    var box4 = element.querySelector('#level-uebersicht-box-4');

    // Function to handle box click
    function handleBoxClick(event) {
        // Reset the background color of all boxes to white
        [box1, box2, box3, box4].forEach(function(box) {
            box.style.backgroundColor = 'white';
        });

        // Change the background color of the clicked box to yellow
        event.currentTarget.style.backgroundColor = '#E4EF75';
    }

    // Add click event listeners to the boxes
    box1.addEventListener('click', handleBoxClick);
    box2.addEventListener('click', handleBoxClick);
    box3.addEventListener('click', handleBoxClick);
    box4.addEventListener('click', handleBoxClick);
});

   // Do something with the individual 'level-uebersicht-box' elements
    // For example, you can access their children like this:
    // var box1Title = box1.querySelector('.level-uebersicht-titel');
    // var box2Description = box2.querySelector('p');
    // ... and so on

    // Select the button element

    //registrierung
    var registerButton = document.getElementById('button-registrierung-aktiv');
    var errorMessage = document.getElementById('error-message');
    
    registerButton.addEventListener('click', function() {
        var inputs = document.querySelectorAll('.login-formular input');
        var isValid = true;
    
        inputs.forEach(function(input) {
            if (input.value.trim() === '') {
                isValid = false;
            }
        });
    
        if (isValid) {
            // All fields are filled, perform registration logic here
            errorMessage.textContent = ''; // Clear any previous error message
            window.location.href = 'details.html';
        } else {
            errorMessage.textContent = 'Please fill in all fields.';
        }
    });
    


    // Button Training
    var button = document.getElementById('button-login');
    var isTrainingStarted = false;
    
    button.addEventListener('click', function() {
        isTrainingStarted = !isTrainingStarted;
        if (isTrainingStarted) {
            button.textContent = 'Training stoppen';
            button.style.backgroundColor = 'red';
        } else {
            button.textContent = 'Training starten';
            button.style.backgroundColor = ''; // Reset background color to default
        }
    });


    // Select all elements with the class 'card-v2'
var cardElements = document.querySelectorAll('.card-v2');

// Function to handle card click
function handleCardClick(event) {
    // Reset the background color of all cards to the default
    cardElements.forEach(function(card) {
        card.style.backgroundColor = ''; // Reset background color to default
    });

    // Change the background color of the clicked card
    event.currentTarget.style.backgroundColor = '#E4EF75';
}

// Add click event listeners to the cards
cardElements.forEach(function(card) {
    card.addEventListener('click', handleCardClick);
});

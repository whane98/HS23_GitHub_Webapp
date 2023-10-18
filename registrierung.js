import { supa } from "/supabase.js";

console.log("00 JavaScript verbunden, cool")

// Now we go for the registration requirements ------------------------------------------------------------------------------------

const pswInput = document.getElementById('psw');
const pswAgainInput = document.getElementById('pswAgain');
const mailInput = document.getElementById('mail');
const weiterButton = document.getElementById('button-weiterscrollen');
const errorMessage = document.getElementById('error-message');
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function checkPasswordMatch() {
    if (pswInput.value !== pswAgainInput.value) {
        weiterButton.disabled = true;
    } else {
        weiterButton.disabled = false;
    }
}

function checkEmailFormat() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(mailInput.value)) {
        errorMessage.textContent = "Invalid email format.";
        weiterButton.disabled = true;
    } else {
        errorMessage.textContent = "";
        weiterButton.disabled = false;
    }
}

function displayErrorMessage() {
    if (pswInput.value !== pswAgainInput.value) {
        alert("Passwords must match");
    }
}

// Add input event listeners for password validation
pswInput.addEventListener('input', checkPasswordMatch);
pswAgainInput.addEventListener('input', checkPasswordMatch);

// Add input event listener for email format validation
mailInput.addEventListener('input', checkEmailFormat);

// Add click event listener to "button-weiterscrollen" for displaying error message
weiterButton.addEventListener('click', displayErrorMessage);


console.log("test");


// Now we go for weiterscrollen-button ------------------------------------------------------------------------------------

// Function to handle scrolling to the target div
function scrollToLevelUebersicht() {
    const targetDiv = document.querySelector('.level-uebersicht');
  
    if (targetDiv) {
      targetDiv.scrollIntoView({
        behavior: 'smooth', // Add smooth scrolling animation
        block: 'start',     // Scroll to the top of the target element
      });
    }
  }
  
  // Add a click event listener to the button
  document.getElementById('button-weiterscrollen').addEventListener('click', scrollToLevelUebersicht);
  



// Now we go for the yellow level cards ------------------------------------------------------------------------------------

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

 async function signUp() {
        const lastname = document.getElementById('lastname').value;
        const firstname = document.getElementById('firstname').value;
        const mail = document.getElementById('mail').value;
        const psw = document.getElementById('psw').value; console.log(psw);
        const pswAgain = document.getElementById('pswAgain').value;

        const { error, user } = await supa.auth.signUp({ email:mail, password:psw });
    
        if (error) {
            console.error("Error during sign up: ", error.message);
        } else {
            console.log("Signed up as ", user);
            
        }
    }

document.getElementById("button-registrierung").addEventListener("click", signUp)
    



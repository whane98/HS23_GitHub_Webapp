import { supa } from "/supabase.js";

console.log("00 JavaScript verbunden, cool");

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


// Now we go for signup ------------------------------------------------------------------------------------

let defaultPoints = 0;
let getId = document.querySelectorAll('.level-uebersicht-box');

getId.forEach(function(element) {
    element.addEventListener('click', function() {
        const h2Element = element.querySelector('.level-uebersicht-titel');
        if (h2Element) {
            console.log(h2Element.id);
            defaultPoints = h2Element.id 
        }
    });
});



async function signUp() {
    const lastname = document.getElementById('lastname').value;
    const firstname = document.getElementById('firstname').value;
    const mail = document.getElementById('mail').value;
    const psw = document.getElementById('psw').value;
    const pswAgain = document.getElementById('pswAgain').value;

    // Validate if all input fields are filled
    if (!lastname || !firstname || !mail || !psw || !pswAgain) {
        alert("All fields are required.");
        return;
    }

    // Validate if mail format is correct
    const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!mailRegex.test(mail)) {
        alert("Please enter a valid email address like example@example.com");
        return;
    }

    // Validate if password contains at least 6 characters
    if (psw.length < 6) {
        alert("The password must contain at least 6 characters");
        return;
    }

    // Validate if passwords match
    if (psw !== pswAgain) {
        alert("Passwords do not match.");
        return;
    }

// Validate if a level is selected
const levelBoxes = document.querySelectorAll('.level-uebersicht-box');
let selectedLevel = null;

levelBoxes.forEach(box => {
    const backgroundColor = window.getComputedStyle(box).getPropertyValue('background-color');
    if (backgroundColor === 'rgb(228, 239, 117)') {
        selectedLevel = box;
    }
});



if (!selectedLevel) {
    alert("Please select a fitness level.");
    return;
}

// Get the selected level's title
const levelTitle = selectedLevel.querySelector('.level-uebersicht-titel').textContent;

    // Sign up via Supabase

        const { user, error } = await supa.auth.signUp({ email: mail, password: psw });

if (error) {
    console.error("Error during sign up:", error.message);
    alert("Error during sign up. Please check the console for details.");
} else {
    // Insert user data into the 'users' table
    const { data, error } = await supa
    .from('users')
    .insert([
        {
            email: mail,
            lastname: lastname,
            firstname: firstname,
            level: levelTitle,
            user_id: user.id,
            deine_punkte: defaultPoints
        }
    ]);

    if (error) {
        console.error("Error inserting data:", error.message);
        alert("Error inserting data. Please check the console for details.");
    } else {
        alert("Signed up as " + user.email);
        window.location.href = "Trainings_Distanz/verification.html";
    }
}
}

document.getElementById("button-registrierung").addEventListener("click", function() {
    signUp();
     // Redirect to another page
    //window.location.href = "Trainings_Distanz/verification.html";
});

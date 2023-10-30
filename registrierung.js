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

   // Do something with the individual 'level-uebersicht-box' elements
    // For example, you can access their children like this:
    // var box1Title = box1.querySelector('.level-uebersicht-titel');
    // var box2Description = box2.querySelector('p');
    // ... and so on

    // Select the button element




// Now we go for signup ------------------------------------------------------------------------------------




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
    const isAnyLevelSelected =
        document.getElementById('level-uebersicht-box-1').style.backgroundColor === 'rgb(228, 239, 117)' ||
        document.getElementById('level-uebersicht-box-2').style.backgroundColor === 'rgb(228, 239, 117)' ||
        document.getElementById('level-uebersicht-box-3').style.backgroundColor === 'rgb(228, 239, 117)' ||
        document.getElementById('level-uebersicht-box-4').style.backgroundColor === 'rgb(228, 239, 117)';

    if (!isAnyLevelSelected) {
        alert("Please select a fitness level.");
        return;
    }

    // Sign up via Supabase
    try {
        const { error, user } = await supa.auth.signUp({ email: mail, password: psw });

        if (error) {
            console.error("Error during sign up:", error.message);
            alert("Error during sign up. Please check the console for details.");
        } else {
            alert("Signed up as " + user.email);
            window.location.href = "details.html";
        }
    } catch (error) {
        if (error.response && error.response.status === 429) {
            const retryAfter = error.response.headers['Retry-After'] || 1;
            console.log(`Rate limited. Retrying after ${retryAfter} seconds.`);
            setTimeout(signUp, retryAfter * 1000);
        } else {
            console.error("An unexpected error occurred:", error);
            alert("An unexpected error occurred. Please check the console for details.");
        }
    }
}

document.getElementById("button-registrierung").addEventListener("click", function() {
    signUp();
});

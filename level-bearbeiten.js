import { supa } from "/supabase.js";

console.log("00 JavaScript verbunden");

document.addEventListener("DOMContentLoaded", function () {
  console.log("00 JavaScript verbunden");

  // Select all elements with the class 'card-v2'
  var cardElements = document.querySelectorAll(".card-v2");

  // Function to handle card click
  function handleCardClick(event) {
    // Reset the background color of all cards to their default state (empty)
    cardElements.forEach(function (card) {
      card.style.backgroundColor = "";
    });

    // Change the background color of the clicked card
    event.currentTarget.style.backgroundColor = "#E4EF75";
  }

  // Add click event listeners to the cards
  cardElements.forEach(function (card) {
    card.addEventListener("click", handleCardClick);
  });

  // Define the getAuthenticatedUserEmail function
  function getAuthenticatedUserEmail() {
    const user = supa.auth.user(); // Get the user object from Supabase session
    if (user) {
      return user.email; // Return the user's email if available
    } else {
      return null; // Return null if user is not authenticated or email is not available
    }
  }

  async function handleSpeichernClick() {
    // Validate if a fitness level is selected
    const isAnyLevelSelected =
      document.getElementById("card-1").style.backgroundColor ===
        "rgb(228, 239, 117)" ||
      document.getElementById("card-2").style.backgroundColor ===
        "rgb(228, 239, 117)" ||
      document.getElementById("card-3").style.backgroundColor ===
        "rgb(228, 239, 117)" ||
      document.getElementById("card-4").style.backgroundColor ===
        "rgb(228, 239, 117)";

    if (!isAnyLevelSelected) {
      window.alert("Please select a fitness level.");
    } else {
      // Find the selected card and get its title (level)
      const selectedCard = Array.from(cardElements).find(
        (card) => card.style.backgroundColor === "rgb(228, 239, 117)"
      );
      const selectedLevel = selectedCard.querySelector(
        ".level-uebersicht-titel"
      ).textContent;

      // Get the authenticated user's email
      const userEmail = getAuthenticatedUserEmail();

      // Get the points range for the selected level from the 'Level' table
      const { data: levelData, error: levelError } = await supa
        .from("Level")
        .select("punkte-von")
        .eq("level_name", selectedLevel)
        .single();

      if (levelError) {
        console.error("Error fetching level data:", levelError.message);
        window.alert("Error fetching level data. Please try again.");
        return;
      }

      // Extract points range from the fetched data
      const punkteVon = levelData ? levelData["punkte-von"] : 0;

      // Get the current user's points from Supabase
      const { data: userPointsData, error: userPointsError } = await supa
        .from("users")
        .select("deine_punkte")
        .eq("email", userEmail)
        .single();

      if (userPointsError) {
        console.error("Error fetching user's points:", userPointsError.message);
        window.alert("Error fetching user's points. Please try again.");
        return;
      }

      // Extract user points from the fetched data
      let userpoints = userPointsData ? userPointsData["deine_punkte"] : 0;

      // Update the user's points with the value set at 'punkte-von'
      userpoints = punkteVon;

      try {
        // Update the user's level and points in the Supabase table
        const { data, error } = await supa
          .from("users")
          .update({ level: selectedLevel, deine_punkte: userpoints })
          .eq("email", userEmail);

        if (error) {
          console.error(
            "Error updating user's level and points:",
            error.message
          );
          window.alert(
            "Error updating user's level and points. Please try again."
          );
        } else {
          window.location.href = "profil-uebersicht.html";
        }
      } catch (error) {
        console.error("Error updating user's level and points:", error.message);
        window.alert(
          "Error updating user's level and points. Please try again."
        );
      }
    }
  }

  // Add click event listener to the "button-speichern"
  document
    .getElementById("button-speichern")
    .addEventListener("click", handleSpeichernClick);
});

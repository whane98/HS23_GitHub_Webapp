// Assuming you have already initialized Supabase client and connected to your table
import { supa } from "/supabase.js";

console.log("00 JavaScript verbunden");

// Add the function to the global scope explicitly
window.toggleTrainingState = async function () {
  // Get the button element
  const startButton = document.getElementById("button-login-start");

  // Check if the button is in active state (Training stoppen)
  if (startButton.classList.contains("active")) {
    // Get user's current points from Supabase
    const userEmail = supa.auth.user().email; // Assuming the user is authenticated
    const { data: userData, error: userError } = await supa
      .from("users")
      .select("deine_punkte")
      .eq("email", userEmail)
      .single();

    if (userError) {
      console.error("Error fetching user's points:", userError.message);
      // Handle error, display a message, or perform appropriate actions
      return;
    }

    // Extract user points from the fetched data
    let userPoints = userData ? userData.deine_punkte : 0;

    // Update user points (add 300)
    userPoints += 300;

    // Update the user's points in the Supabase table
    const { data: updateData, error: updateError } = await supa
      .from("users")
      .update({ deine_punkte: userPoints })
      .eq("email", userEmail);

    if (updateError) {
      console.error("Error updating user's points:", updateError.message);
      // Handle error, display a message, or perform appropriate actions
      return;
    }

    // Successfully updated user points
    console.log("User points updated successfully:", updateData);

    // Redirect to profil-uebersicht.html
    window.location.href = "../profil-uebersicht.html";
  }

  // Toggle the "active" class on the button element
  startButton.classList.toggle("active");

  // Change button text based on the active class
  if (startButton.classList.contains("active")) {
    startButton.textContent = "Training stoppen";
  } else {
    startButton.textContent = "Training starten";
  }
};

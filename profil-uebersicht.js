// Assuming you have already initialized Supabase client and connected to your table
import { supa } from "/supabase.js";

// Call the function to update the welcome message
updateWelcomeMessage();

async function updateGazelle() {
  try {
    const user = supa.auth.user();

    if (user) {
      // Fetch user data from Supabase
      const { data, error } = await supa
        .from("users")
        .select("firstname")
        .eq("email", user.email); // Assuming you identify users by their email address

      if (error) {
        console.error("Error fetching user data:", error.message);
      } else if (data && data.length > 0) {
        // Update the DOM element with the user's firstname
        const firstname = data[0].firstname;
        document.getElementById(
          "profil-titel"
        ).textContent = `Willkommen zurück, ${firstname}`;
      }
    }
  } catch (error) {
    console.error("Error updating welcome message:", error.message);
  }
}

// Call the function to update the Gazelle update
updateGazelle();

async function updateWelcomeMessage() {
  try {
    const user = supa.auth.user();

    if (user) {
      // Fetch user data from Supabase
      const { data: userData, error: userError } = await supa
        .from("users")
        .select("level")
        .eq("email", user.email); // Assuming you identify users by their email address

      if (userError) {
        console.error("Error fetching user data:", userError.message);
      } else if (userData && userData.length > 0) {
        const levelName = userData[0].level;

        // Fetch level data from Supabase based on levelName
        const { data: levelData, error: levelError } = await supa
          .from("Level")
          .select("punkte-von, punkte-bis")
          .eq("level_name", levelName);

        if (levelError) {
          console.error("Error fetching level data:", levelError.message);
        } else if (levelData && levelData.length > 0) {
          var punkteVon = levelData[0]["punkte-von"];
          var punkteBis = levelData[0]["punkte-bis"];

          document.getElementById(
            "dein-fortschritt"
          ).textContent = `Du befindest dich aktuell im Level ${levelName}`;
          document.getElementById("dein-aktueller-punktestand").textContent =
            punkteVon;
          document.getElementById("punktezahl-bis").textContent = punkteBis;
        }
      }
    }
  } catch (error) {
    console.error("Error updating welcome message:", error.message);
  }

  try {
    const user = supa.auth.user();

    if (user) {
      // Fetch user data from Supabase
      const { data: userData, error: userError } = await supa
        .from("users")
        .select("deine_punkte") // Select the 'deine_punkte' field
        .eq("email", user.email);

      if (userError) {
        console.error("Error fetching user data:", userError.message);
      } else if (userData && userData.length > 0) {
        const deine_punkte = userData[0].deine_punkte; // Get the value of 'deine_punkte'

        // Update the 'dein-aktueller-punktestand' element
        document.getElementById("dein-aktueller-punktestand").textContent =
          deine_punkte;

        drawProgress(punkteVon, deine_punkte, punkteBis);
      }
    }
  } catch (error) {
    console.error("Error updating welcome message:", error.message);
  }
}

function drawProgress(punkteVon, deine_punkte, punkteBis) {
  console.log(punkteVon);
  console.log(deine_punkte);
  console.log(punkteBis);

  // Calculate the percentage completion
  const percentage =
    ((deine_punkte - punkteVon) / (punkteBis - punkteVon)) * 100;

  console.log(percentage);

  // Update the progress bar width
  const innerBar = document.getElementById("inner-bar");
  innerBar.style.width = `${percentage}%`;
}

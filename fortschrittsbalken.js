// Assuming you have already initialized Supabase client and connected to your table
import { supa } from "/supabase.js";



// now we go for the fortschrittsbalken

async function updateProgressBar() {
    try {
        const user = supa.auth.user();

        if (user) {
            const { data: userData, error: userError } = await supa
                .from('users')
                .select('deine_punkte')
                .eq('email', user.email);

            if (userError) {
                console.error("Error fetching user data:", userError.message);
            } else if (userData && userData.length > 0) {
                const levelName = userData[0].level;
                const { data: levelData, error: levelError } = await supa
                    .from('Level')
                    .select('punkte-von, punkte-bis')
                    .eq('level_name', levelName);

                if (levelError) {
                    console.error("Error fetching level data:", levelError.message);
                } else if (levelData && levelData.length > 0) {
                    const punkteVon = levelData[0]['punkte-von'];
                    const punkteBis = levelData[0]['punkte-bis'];
                    const deine_punkte = userData[0]['deine_punkte'];

                    // Calculate the percentage completion
                    const percentage = ((deine_punkte - punkteVon) / (punkteBis - punkteVon)) * 100;

                    // Update the progress bar width
                    const innerBar = document.getElementById('inner-bar');
                    innerBar.style.width = `${percentage}%`;

                    // Log the values here
                    console.log("deine_punkte:", deine_punkte);
                    console.log("punkteVon:", punkteVon);
                    console.log("punkteBis:", punkteBis);
                }
            }
        }
    } catch (error) {
        console.error("Error updating progress bar:", error.message);
    }
}

// Call the function to update the progress bar after DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
    updateProgressBar();
});



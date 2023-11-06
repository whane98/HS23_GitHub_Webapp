// Assuming you have already initialized Supabase client and connected to your table
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'Yhttps://sirlqkvgtuxlsfeeymfz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpcmxxa3ZndHV4bHNmZWV5bWZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYyNDgwMDEsImV4cCI6MjAxMTgyNDAwMX0.k7mvG0tEOBa7yRtsRmLsNno7X9OQ72vLvQkSBbRem6A';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchTrainingData() {
    try {
        const { data, error } = await supabase.from("training_data").select("*");

        if (error) {
            console.error("Error fetching training data:", error.message);
            return;
        }

        const cardContainer = document.querySelector(".cards-details-v2");

        // Iterate through the fetched data and create cards dynamically
        data.forEach(training => {
            const card = document.createElement("div");
            card.classList.add("card-details-v2");
            card.id = `card-details-v2-${training.id}`; // Set card ID based on the fetched data ID

            const link = document.createElement("a");
            link.href = training.link;
            link.innerHTML = `
                <img class="card-image-v2" src="${training.image}" alt="${training.title}" />
                <h2 class="level-uebersicht-titel-v2">${training.title}</h2>
            `;

            card.appendChild(link);
            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching training data:", error.message);
    }
}

// Call the fetchTrainingData function to populate the cards
fetchTrainingData();

const { user, session, error } = supabase.auth.session();

if (error) {
    console.error("Error fetching session:", error.message);
} else if (user) {
    console.log("User is authenticated:", user);
    // You can perform actions here that require an authenticated user
} else {
    console.log("User is not authenticated");
    // You can handle the case where the user is not authenticated
}

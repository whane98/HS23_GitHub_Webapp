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

        // Assuming your card-container has class of 'card-container'
        const cardContainer = document.getElementsByClassName("card-container");

        // Iterate through the fetched data and create cards dynamically
        data.forEach(training => {
            const card = document.createElement("div");
            card.classList.add("card");

            const imageContainer = document.createElement("div");
            imageContainer.classList.add("image-container");

            const link = document.createElement("a");
            link.href = training.link; // Assuming your training data has a 'link' property
            link.innerHTML = `
                <img class="card-image" src="${training.image}" alt="${training.title}" />
                <span>${training.title}</span>
            `;

            imageContainer.appendChild(link);
            card.appendChild(imageContainer);
            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching training data:", error.message);
    }
}

// Call the fetchTrainingData function to populate the cards
fetchTrainingData();

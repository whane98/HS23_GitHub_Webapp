import { supa } from "/supabase.js";

// Function to update user status
function updateUserStatus(user) {

    if (user) {
        console.log(`Authenticated as: ${user.email}`);
    } else {
        console.log("Not authenticated.");
    }
}

// Check and display the initial user status
const initialUser = supa.auth.user();
updateUserStatus(initialUser);

// Listener for authentication state changes
supa.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
        console.log("User signed in: ", session.user);
        updateUserStatus(session.user);
    } else if (event === "SIGNED_OUT") {
        console.log("User signed out");
        updateUserStatus(null);
    }
});

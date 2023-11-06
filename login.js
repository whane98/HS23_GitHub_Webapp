import { supa } from "/supabase.js";

async function signIn() {
    const email = document.getElementById('mail').value;
    const password = document.getElementById('psw').value;

    try {
        const { user, session, error } = await supa.auth.signIn({ email, password });

        if (error) {
            console.error("Error during sign in:", error.message);
        } else {
            console.log("User authenticated successfully:", user);
            // Redirect the user to the desired page after successful login
            window.location.href = 'details.html';
        }
    } catch (error) {
        console.error("Error during sign in:", error.message);
    }
}

document.getElementById("button-login-start").addEventListener("click", signIn);


import { supa } from "/supabase.js";

console.log("00 JavaScript verbunden login nicht cool")

async function signIn() {
    const mail = document.getElementById('mail').value;
    const psw = document.getElementById('psw').value; console.log(psw);

    const { error, user } = await supa.auth.signIn({ email:mail, password:psw });

    if (error) {
        console.error("Error during sign in: ", error.message);
    } else {
        window.location.href = 'details.html';
        
    }
}


document.getElementById("button-login-start").addEventListener("click", signIn);
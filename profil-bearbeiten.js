// Assuming you have already initialized Supabase client and connected to your table
import { supa } from "/supabase.js";

// Get references to the input fields and buttons
const lastnameInput = document.querySelector('input[name="lastname"]');
const firstnameInput = document.querySelector('input[name="firstname"]');
const newEmailInput = document.querySelector('input[name="new-email"]');
const saveButton = document.getElementById("button-profil-speichern");
const emailChangeButton = document.getElementById("button-email-aendern");

// Add event listener to the save button
saveButton.addEventListener("click", async () => {
  try {
    const user = supa.auth.user();

    if (user) {
      // Retrieve values from the input fields
      const lastname = lastnameInput.value;
      const firstname = firstnameInput.value;

      // Prepare data object with only the provided fields to update
      const dataToUpdate = {};

      if (lastname !== "") {
        dataToUpdate.lastname = lastname;
      }

      if (firstname !== "") {
        dataToUpdate.firstname = firstname;
      }

      // Update lastname and/or firstname in Supabase users table
      const { data, error } = await supa
        .from("users")
        .update(dataToUpdate)
        .eq("email", user.email); // Identify user by email address

      if (error) {
        console.error("Error updating user data:", error.message);
      } else {
        console.log("User data updated successfully:", data);
        // Redirect the user to the profile overview page after updating the data
        window.location.href = "profil-uebersicht.html";
      }
    }
  } catch (error) {
    console.error("Error updating user data:", error.message);
  }
});

emailChangeButton.addEventListener("click", async () => {
  try {
    const user = supa.auth.user();

    if (user) {
      // Retrieve new email address from the input field
      const newEmail = newEmailInput.value;

      // Update the user's email address in Supabase authentication
      await supa.auth.api.updateUser(user.id, {
        email: newEmail,
      });

      // Send email verification to the new email address
      await supa.auth.api.sendMagicLinkEmail(newEmail, {
        redirectTo: window.location.href, // Redirect the user back to the same page after verification
      });

      console.log("Magic link sent successfully to update email address.");

      // Update email in the Supabase users table
      const { data, error } = await supa
        .from("users")
        .update({ email: newEmail })
        .eq("email", user.email); // Identify user by old email address

      if (error) {
        console.error("Error updating email in users table:", error.message);
      } else {
        console.log("Email updated successfully in the users table.");

        // Update the email address associated with the authenticated user in Supabase authentication
        await supa.auth.api.updateUser(user.id, {
          email: newEmail,
        });

        console.log("Email updated in Supabase authentication.");

        // Re-authenticate the user with the updated email
        const {
          user: updatedUser,
          session,
          error: authError,
        } = await supa.auth.api.signIn({
          email: newEmail,
        });

        if (authError) {
          console.error("Error re-authenticating user:", authError.message);
        } else {
          console.log(
            "User re-authenticated successfully with updated email:",
            updatedUser
          );
          // Redirect the user to the profile overview page after updating the email and re-authenticating
          window.location.href = "profil-uebersicht.html";
        }
      }
    }
  } catch (error) {
    console.error("Error updating email address:", error.message);
  }
});

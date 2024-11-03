import { sendPasswordResetEmail } from "firebase/auth";

const resetPassword = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Password reset email sent!");
    })
    .catch((error) => {
      console.error("Error sending password reset email:", error);
    });
};

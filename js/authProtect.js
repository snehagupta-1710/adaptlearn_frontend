// js/authProtect.js
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  // If no token, redirect user to login
  if (!token) {
    alert("Please login first to access this page.");
    window.location.href = "/Frontend/login&signup/login_form.html";
  }
});

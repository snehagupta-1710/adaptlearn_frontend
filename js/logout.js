document.addEventListener("DOMContentLoaded", () => {
const logoutLink = document.querySelector('a[href="/Frontend/js/logout.js"]');

if (logoutLink) {
logoutLink.addEventListener("click", (e) => {
e.preventDefault();

  if (confirm("Are you sure you want to log out?")) {
    // Clear all user data
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    alert("You have been logged out successfully.");
    window.location.href = "/Frontend/login&signup/login_form.html";
  }
});


}
});
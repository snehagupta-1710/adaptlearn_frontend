document.addEventListener("DOMContentLoaded", () => {
  // 🌙 Theme toggle icon
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      if (document.body.classList.contains("dark-mode")) {
        themeToggle.classList.replace("ri-moon-line", "ri-sun-line");
      } else {
        themeToggle.classList.replace("ri-sun-line", "ri-moon-line");
      }
    });
  }

  // 👤 Profile dropdown toggle
  const profileBtn = document.getElementById("profileBtn");
  const dropdown = document.getElementById("profileDropdown");
  if (profileBtn && dropdown) {
    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
      profileBtn.classList.toggle("active");
    });

    window.addEventListener("click", (e) => {
      if (!profileBtn.contains(e.target)) {
        dropdown.style.display = "none";
        profileBtn.classList.remove("active");
      }
    });
  }

  // 👋 Show username beside icon
  const username = localStorage.getItem("username");
  const userIcon = document.getElementById("userIcon");
  const userName = document.getElementById("userName");

  if (username) {
    if (userIcon) userIcon.textContent = username.charAt(0).toUpperCase();
    if (userName) userName.textContent = username;
  }

  // 🚪 Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.clear();
      alert("You have been logged out!");
      window.location.href = "/Frontend/login&signup/login_form.html";
    });
  }

  // ❌ Delete account
  const deleteBtn = document.getElementById("deleteBtn");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      const token = localStorage.getItem("token");
      if (!token) return alert("You are not logged in.");

      const confirmDelete = confirm("Are you sure you want to delete your account?");
      if (!confirmDelete) return;

      try {
        const res = await fetch("http://127.0.0.1:5000/api/auth/delete", {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          alert("Account deleted successfully!");
          localStorage.clear();
          window.location.href = "/Frontend/login&signup/signup_form.html";
        } else {
          alert(data.message || "Something went wrong.");
        }
      } catch (err) {
        console.error("Delete Error:", err);
        alert("Server error while deleting account.");
      }
    });
  }
});

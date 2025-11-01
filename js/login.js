document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) {
    console.error("❌ loginForm not found in DOM");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login successful!");

        // ✅ Store data for dashboard/header
       localStorage.setItem("token", data.token);
localStorage.setItem("username", data.user?.name || "User");
localStorage.setItem("email", data.user?.email || email);
localStorage.setItem("user", JSON.stringify(data.user || {}));
;


        // ✅ Redirect after login
        window.location.href = "/Frontend/home_page/index.html";
      } else {
        alert(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  });
});


// /js/login.js
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      // Save token & user to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.name);
      localStorage.setItem("email", data.user.email);

      // Redirect to homepage/dashboard
      window.location.href = "/Frontend/home_page/index.html";
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error("Login error", err);
    alert("Something went wrong.");
  }
});

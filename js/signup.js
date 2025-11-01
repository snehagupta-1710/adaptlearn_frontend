document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  if (!form) {
    console.error("❌ signupForm not found in DOM");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ✅ Ensure these input IDs exist in your HTML
    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      console.log("📤 Sending signup request to backend...");

      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      console.log("📥 Response from backend:", data);

      if (res.ok) {
        alert("✅ Signup successful! Redirecting to login page...");

        // ✅ Store details for future use
        localStorage.setItem("username", name);
        localStorage.setItem("email", email);
        if (data.token) localStorage.setItem("token", data.token);

        // Redirect safely after a short delay
        setTimeout(() => {
          window.location.href = "/Frontend/login&signup/login_form.html";
        }, 800);
      } else {
        alert(data.message || "❌ Signup failed. Try again.");
      }
    } catch (error) {
      console.error("⚠️ Network or server error:", error);
      alert("Unable to connect to the server. Please try again later.");
    }
  });
});
// /js/signup.js
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      // Save token & user (backend returns token + user)
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.name);
      localStorage.setItem("email", data.user.email);

      // either redirect to dashboard or to login page
      window.location.href = "/Frontend/home_page/index.html";
    } else {
      alert(data.message || "Signup failed");
    }
  } catch (err) {
    console.error("Signup error", err);
    alert("Something went wrong.");
  }
});

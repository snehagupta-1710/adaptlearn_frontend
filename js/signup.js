document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  if (!form) {
    console.error("❌ signupForm not found in DOM");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    if (!name || !email || !password) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    try {
      console.log("📤 Sending signup request to backend...");

      // ✅ Correct endpoint: /api/auth/register
      const res = await fetch("https://adaptlearn-backend.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      console.log("📥 Response from backend:", data);

      if (res.ok) {
        alert("✅ Signup successful! Redirecting to login page...");

        // ✅ Optionally store user info
        localStorage.setItem("username", name);
        localStorage.setItem("email", email);

        // ✅ Redirect to login page
        setTimeout(() => {
          window.location.href = "../login&signup/login_form.html";
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

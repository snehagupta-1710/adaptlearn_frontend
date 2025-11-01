// js/deleteAccount.js
document.addEventListener("DOMContentLoaded", () => {
  const deleteLink = document.querySelector("#profileDropdown a:nth-child(2)");
  // or use a more specific text match if possible:
  // const deleteLink = [...document.querySelectorAll("#profileDropdown a")].find(a => a.textContent.includes("Delete"));

  if (deleteLink) {
    deleteLink.addEventListener("click", async (e) => {
      e.preventDefault();

      if (!confirm("Are you sure you want to delete your account?")) return;

      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in.");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/auth/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          alert("✅ Account deleted successfully.");
          localStorage.clear();
          window.location.href = "/Frontend/login&signup/login_form.html";
        } else {
          alert(`❌ ${data.message || "Something went wrong while deleting the account."}`);
        }
      } catch (err) {
        console.error("Frontend Delete Error:", err);
        alert("❌ Unable to delete account. Check console for details.");
      }
    });
  } else {
    console.warn("⚠️ Delete Account link not found in dropdown.");
  }
});

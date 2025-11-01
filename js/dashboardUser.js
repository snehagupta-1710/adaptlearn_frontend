// ✅ dashboardUser.js — clean and working
document.addEventListener("DOMContentLoaded", async () => {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  // 🔹 Redirect if user not logged in
  if (!username || !email) {
    window.location.href = "/Frontend/login&signup/login_form.html";
    return;
  }

  // 🔹 Display username and initials
  const bannerHeading = document.getElementById("bannerUsername");
  const circle = document.querySelector(".t-icon");
  if (bannerHeading) bannerHeading.textContent = `Hi, ${username.split(" ")[0]}`;
  if (circle) circle.textContent = username.charAt(0).toUpperCase();

  // 🔹 Display email in dropdown if not already added
  const dropdown = document.querySelector("#profileDropdown");
  if (dropdown && !dropdown.querySelector(".email-info")) {
    const emailInfo = document.createElement("div");
    emailInfo.classList.add("email-info");
    emailInfo.style.padding = "8px 14px";
    emailInfo.style.borderTop = "1px solid #ddd";
    emailInfo.style.fontSize = "14px";
    emailInfo.style.opacity = "0.9";
    emailInfo.textContent = email;
    dropdown.appendChild(emailInfo);
  }

  // 🔹 Fetch and display overall progress summary (home page)
  try {
    const res = await fetch("http://localhost:5000/api/progress/summary", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Failed to fetch progress summary");
    const data = await res.json();

    const enrollBox = document.querySelector(".enroll .progress1");
    const completeBox = document.querySelector(".complete .progress1");
    const progressBox = document.querySelector(".progress .progress1");
    const progressFill = document.querySelector(".progress-bar .fill");

    if (enrollBox)
      enrollBox.innerHTML = `${data.enrollmentCount}<br>Course Enrollment`;
    if (completeBox)
      completeBox.innerHTML = `${data.completedTopics}<br>Topics Attempted`;
    if (progressBox)
      progressBox.innerHTML = `${data.overallProgress}%<br>Progress`;

    if (progressFill) {
      progressFill.style.width = "0%";
      setTimeout(() => {
        progressFill.style.width = `${data.overallProgress}%`;
      }, 200);
    }
  } catch (err) {
    console.error("❌ Error loading progress summary:", err);
  }
});

// ✅ Load detailed course-wise progress (for progress page)
async function loadUserProgress() {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch("http://localhost:5000/api/progress/user", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Failed to fetch detailed progress");
    const data = await res.json();

    const container = document.getElementById("progressContainer");
    if (!container) return;

    container.innerHTML = "";

    if (!Array.isArray(data) || data.length === 0) {
      container.innerHTML = "<p>No course progress found yet.</p>";
      return;
    }

    data.forEach((course) => {
      const percent = Number(course.averagePercentage) || 0;
      const div = document.createElement("div");
      div.classList.add("progress-card");
      div.innerHTML = `
        <h3>${course.courseName}</h3>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${percent}%;"></div>
        </div>
        <p>${percent}% Average Progress</p>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("❌ Error fetching detailed progress:", err);
  }
}

// Automatically load when DOM is ready
document.addEventListener("DOMContentLoaded", loadUserProgress);

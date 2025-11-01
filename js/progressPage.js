document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/Frontend/login&signup/login_form.html";
    return;
  }

  const container = document.getElementById("progressContainer");
  if (!container) return;

  try {
    const res = await fetch("http://localhost:5000/api/progress/user", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Failed to fetch user progress");
    const data = await res.json();

    container.innerHTML = "";
    if (!Array.isArray(data) || data.length === 0) {
      container.innerHTML = "<p>No enrolled courses yet.</p>";
      return;
    }

    // Remove duplicates
    const uniqueCourses = [];
    const seen = new Set();
    for (const c of data) {
      if (!seen.has(c.courseName)) {
        seen.add(c.courseName);
        uniqueCourses.push(c);
      }
    }

    // Display each course
    uniqueCourses.forEach((course) => {
      const avg = Number(course.averagePercentage) || 0;

      const card = document.createElement("div");
      card.className = "course-card";

      card.innerHTML = `
        <h4 class="course-title">
          ${escapeHtml(course.courseName)} <i class="ri-arrow-down-s-line"></i>
        </h4>
        <div class="progress-bar">
          <div class="progress-fill complete" style="width:0%">0%</div>
        </div>
        <div class="topics" style="display:none">
          ${
            Array.isArray(course.topics) && course.topics.length
              ? course.topics
                  .map(
                    (t) => `
                    <div class="topic-row">
                      <div class="topic-title">${escapeHtml(
                        t.topic || t.topicName || "Untitled"
                      )}</div>
                      <div class="progress-bar">
                        <div class="progress-fill progress" style="width:0%">
                          ${t.scorePercentage || 0}%
                        </div>
                      </div>
                    </div>`
                  )
                  .join("")
              : "<p>No topics attempted yet.</p>"
          }
        </div>
      `;

      container.appendChild(card);

      // Animate bars
      const mainBar = card.querySelector(".progress-fill.complete");
      setTimeout(() => {
        mainBar.style.width = `${avg}%`;
        mainBar.textContent = `${avg.toFixed(0)}%`;
      }, 200);

      card.querySelectorAll(".progress-fill.progress").forEach((bar, i) => {
        const val = course.topics?.[i]?.scorePercentage || 0;
        setTimeout(() => {
          bar.style.width = `${val}%`;
          bar.textContent = `${val}%`;
        }, 300 + i * 100);
      });

      // Dropdown toggle
      const title = card.querySelector(".course-title");
      title.addEventListener("click", () => {
        const topics = card.querySelector(".topics");
        const arrow = title.querySelector("i");
        const open = topics.style.display === "block";
        topics.style.display = open ? "none" : "block";
        arrow.style.transform = open ? "rotate(0deg)" : "rotate(180deg)";
      });
    });
  } catch (err) {
    console.error("❌ Error loading progress:", err);
    container.innerHTML = "<p>Error loading progress data.</p>";
  }
});

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

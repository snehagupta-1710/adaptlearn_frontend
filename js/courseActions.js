// /js/courseActions.js
async function enrollCourse(courseName) {
  const token = localStorage.getItem("token");
  if (!token) return alert("Please login first");

  try {
    const res = await fetch("http://localhost:5000/api/progress/enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ courseName })
    });
    const data = await res.json();
    if (res.ok) {
      alert("Enrolled successfully");
      // optionally update UI: change button text to "Enrolled"
    } else {
      alert(data.message || "Enrollment failed");
    }
  } catch (err) {
    console.error("Enroll error", err);
    alert("Server error");
  }
}

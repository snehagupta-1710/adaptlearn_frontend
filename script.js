document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for navigation links
    const links = document.querySelectorAll("header nav a");
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
})
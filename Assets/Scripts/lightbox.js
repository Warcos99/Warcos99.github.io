// Create the overlay element once
const overlay = document.createElement("div");
overlay.id = "lightbox-overlay";
const lightboxImg = document.createElement("img");
overlay.appendChild(lightboxImg);
document.body.appendChild(overlay);

// Open on image click
document.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG" && !overlay.contains(e.target)) {
    if (e.target.closest("a")) return; // skip if image is a link
    lightboxImg.src = e.target.src;
    lightboxImg.alt = e.target.alt;
    overlay.classList.add("active");
  }
});

// Close on overlay click
overlay.addEventListener("click", () => {
  overlay.classList.remove("active");
});

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") overlay.classList.remove("active");
});

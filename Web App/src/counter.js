document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById("modal__overlay");
  console.log("Overlay hidden state:", overlay.classList.contains("hidden")); // Should be true initially
});
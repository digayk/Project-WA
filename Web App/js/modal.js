console.log("Modal script loaded!"); // Confirm file is running
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded");
  
  const openLinks = document.querySelectorAll('.view');
  const closeBtn = document.getElementById('close__modal');
  const overlay = document.getElementById('modal__overlay');

  console.log(`Found ${openLinks.length} '.view' links`); // Should show 9
  console.log("Close button exists:", !!closeBtn); // Should be true
  console.log("Overlay exists:", !!overlay); // Should be true
});


// const openLinks = document.getElementsByClassName("view");
// const closeBtn = document.getElementById("close__modal");
// const overlay = document.getElementById("modal__overlay");

// for (let i = 0; i < openLinks.length; i++) {
//   openLinks[i].addEventListener("click", function (e) {
//     e.preventDefault(); // Prevent link jump
//     overlay.classList.remove("hidden"); // Show modal
//   });
// }

// closeBtn.onclick = () => overlay.classList.add("hidden");

// overlay.onclick = (e) => {
//   if (e.target === overlay) overlay.classList.add("hidden");
// };

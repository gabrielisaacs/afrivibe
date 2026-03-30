// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const marqueeText = document.getElementById("marquee-text");
  
  // Save the original text block
  const originalContent = marqueeText.innerHTML;
  
  // Clone the text 50 times inside the marquee
  for (let i = 0; i < 50; i++) {
    marqueeText.innerHTML += originalContent;
  }
});
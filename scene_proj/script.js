const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Canvas size
canvas.width = 800;
canvas.height = 600;

// Load the background image
const background = new Image();
background.src = "scene_proj/images/background.jpg";  // Path to background image

background.onload = function() {
  console.log("Background loaded successfully");

  // Draw the background image on the canvas
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // Load the first foreground image
  const img1 = new Image();
  img1.src = "scene_proj/images/image1.jpg";  // Path to first foreground image

  img1.onload = function() {
    console.log("Image 1 loaded successfully");

    // Draw image1 on the canvas
    ctx.drawImage(img1, 100, 100);  // Simple position, no resizing
  };

  // Load the second foreground image
  const img2 = new Image();
  img2.src = "scene_proj/images/image2.jpg";  // Path to second foreground image

  img2.onload = function() {
    console.log("Image 2 loaded successfully");

    // Draw image2 on the canvas
    ctx.drawImage(img2, 300, 200);  // Simple position, no resizing
  };
};

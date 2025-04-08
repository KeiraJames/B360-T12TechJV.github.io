const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Canvas size (you can change this as needed)
canvas.width = 800;
canvas.height = 600;

// Load the background image
const background = new Image();
background.src = "images/background.jpg";  // Correct path

background.onload = function () {
  console.log("Background loaded successfully");

  // Calculate center of canvas for positioning
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // Fit the background to the canvas size
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // Load the first foreground image (no resizing)
  const img1 = new Image();
  img1.src = "images/image1.jpg";  // Correct path

  img1.onload = function () {
    console.log("Image 1 loaded successfully");

    // Position image1 centered
    const img1X = centerX - img1.width / 2;  // Center horizontally
    const img1Y = centerY - img1.height / 2 - 50;  // Center vertically, with a bit of offset

    ctx.drawImage(img1, img1X, img1Y);  // Draw image1

    // Load the second foreground image (no resizing)
    const img2 = new Image();
    img2.src = "images/image2.jpg";  // Correct path

    img2.onload = function () {
      console.log("Image 2 loaded successfully");

      // Position image2 centered with slight offset
      const img2X = centerX - img2.width / 2;  // Center horizontally
      const img2Y = centerY - img2.height / 2 + 50;  // Offset below image1

      ctx.drawImage(img2, img2X, img2Y);  // Draw image2

      // Add centered text on top of canvas
      ctx.font = "28px Arial";
      ctx.fillStyle = "white";
      const text = "Keira Fairy Scene";
      const textWidth = ctx.measureText(text).width;
      const textX = centerX - textWidth / 2;  // Center text horizontally
      const textY = 50;  // Position text at the top
      ctx.fillText(text, textX, textY);  // Draw text
    };
  };
};

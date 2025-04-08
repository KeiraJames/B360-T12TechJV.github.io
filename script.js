const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Canvas size (you can change this as needed)
canvas.width = 800;
canvas.height = 600;

// Load the background image
const background = new Image();
background.src = "images/background.jpg";  // Ensure this path is correct
background.onload = function () {
  console.log("Background loaded successfully");

  // Calculate center of canvas for positioning
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // Fit the background to the canvas size
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);  

  // Load the first foreground image (resized to fit the canvas)
  const img1 = new Image();  // Declare img1 here
  img1.src = "images/image1.jpg";  // Ensure this path is correct
  img1.onload = function () {
    console.log("Image 1 loaded successfully");

    // Resize image to fit nicely within the canvas (e.g., 200x200)
    const imgWidth = img1.width;
    const imgHeight = img1.height;
    const scale1 = Math.min(200 / imgWidth, 200 / imgHeight);
    const newWidth1 = imgWidth * scale1;
    const newHeight1 = imgHeight * scale1;

    // Position image1 centered
    const img1X = centerX - newWidth1 / 2;  // Center horizontally
    const img1Y = centerY - newHeight1 / 2 - 50;  // Center vertically, with a bit of offset

    ctx.drawImage(img1, img1X, img1Y, newWidth1, newHeight1);  // Draw image1

    // Load the second foreground image (resized to fit the canvas)
    const img2 = new Image();  // Declare img2 here
    img2.src = "images/image2.jpg";  // Ensure this path is correct
    img2.onload = function () {
      console.log("Image 2 loaded successfully");

      // Resize second image to fit within the canvas (e.g., 150x150)
      const imgWidth2 = img2.width;
      const imgHeight2 = img2.height;
      const scale2 = Math.min(150 / imgWidth2, 150 / imgHeight2);
      const newWidth2 = imgWidth2 * scale2;
      const newHeight2 = imgHeight2 * scale2;

      // Position image2 centered with slight offset
      const img2X = centerX - newWidth2 / 2;  // Center horizontally
      const img2Y = centerY - newHeight2 / 2 + 50;  // Offset below image1

      ctx.drawImage(img2, img2X, img2Y, newWidth2, newHeight2);  // Draw image2

      // Add centered text on top of canvas
      ctx.font = "28px Arial";
      ctx.fillStyle = "white";
      const text = "Keira - Canvas Scene";
      const textWidth = ctx.measureText(text).width;
      const textX = centerX - textWidth / 2;  // Center text horizontally
      const textY = 50;  // Position text at the top
      ctx.fillText(text, textX, textY);  // Draw text
    };
  };
};

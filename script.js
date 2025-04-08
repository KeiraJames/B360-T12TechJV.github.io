const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Load the background image
const background = new Image();
background.src = "images/background.jpg";  // Ensure this is correct
background.onload = function () {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);  // Fit background to canvas size

  // Load the first foreground image (resized to fit the canvas)
  const img1 = new Image();
  img1.src = "images/image1.jpg";  // Ensure this is correct
  img1.onload = function () {
    const imgWidth = img1.width;
    const imgHeight = img1.height;
    
    // Resize image to fit nicely within the canvas (e.g., 200x200)
    const scale1 = Math.min(200 / imgWidth, 200 / imgHeight);
    const newWidth1 = imgWidth * scale1;
    const newHeight1 = imgHeight * scale1;

    ctx.drawImage(img1, 100, 300, newWidth1, newHeight1);  // Position and size image

    // Load the second foreground image (resized to fit the canvas)
    const img2 = new Image();
    img2.src = "images/image2.jpg";  // Ensure this is correct
    img2.onload = function () {
      const imgWidth2 = img2.width;
      const imgHeight2 = img2.height;

      // Resize second image to fit within the canvas (e.g., 150x150)
      const scale2 = Math.min(150 / imgWidth2, 150 / imgHeight2);
      const newWidth2 = imgWidth2 * scale2;
      const newHeight2 = imgHeight2 * scale2;

      ctx.drawImage(img2, 500, 250, newWidth2, newHeight2);  // Position and size image

      // Add text on top of canvas
      ctx.font = "28px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("Keira - Canvas Scene", 20, 50);  // Text and position
    };
  };
};

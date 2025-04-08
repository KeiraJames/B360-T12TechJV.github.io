const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size to fill the entire browser window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load the background image
const background = new Image();
background.src = "images/background.jpg";  // Ensure this path is correct
background.onload = function () {
  console.log("Background loaded successfully");
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);  // Fit background to canvas size

  // Load the first foreground image (resized to fit the canvas)
  const img1 = new Image();  // Declare img1 here
  img1.src = "images/image1.jpg";  // Ensure this path is correct
  img1.onload = function () {
    console.log("Image 1 loaded successfully");

    // Resize image1 relative to the canvas size (e.g., 20% of the canvas width)
    const imgWidth = img1.width;
    const imgHeight = img1.height;

    const scale1 = Math.min(0.2 * canvas.width / imgWidth, 0.2 * canvas.height / imgHeight);
    const newWidth1 = imgWidth * scale1;
    const newHeight1 = imgHeight * scale1;

    const x1 = 100;  // X-position for image1
    const y1 = 300;  // Y-position for image1
    ctx.drawImage(img1, x1, y1, newWidth1, newHeight1);  // Position and size image

    // Load the second foreground image (resized to fit the canvas)
    const img2 = new Image();  // Declare img2 here
    img2.src = "images/image2.jpg";  // Ensure this path is correct
    img2.onload = function () {
      console.log("Image 2 loaded successfully");

      // Resize image2 relative to the canvas size (e.g., 15% of the canvas width)
      const imgWidth2 = img2.width;
      const imgHeight2 = img2.height;

      const scale2 = Math.min(0.15 * canvas.width / imgWidth2, 0.15 * canvas.height / imgHeight2);
      const newWidth2 = imgWidth2 * scale2;
      const newHeight2 = imgHeight2 * scale2;

      const x2 = 500;  // X-position for image2
      const y2 = 250;  // Y-position for image2
      ctx.drawImage(img2, x2, y2, newWidth2, newHeight2);  // Position and size image

      // Add text on top of canvas
      ctx.font = "28px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("Keira's Forest Scene", 20, 50);  // Text and position
    };
  };
};

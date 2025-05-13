window.onload = function() {
    // 1. Get the canvas element and its 2D rendering context
    const canvas = document.getElementById('mySceneCanvas');
    const ctx = canvas.getContext('2d');

    // --- Scene Title and Your Name ---
    const sceneTitle = "Enchanted Forest"; // <<< CHANGE THIS TO YOUR SCENE TITLE
    const yourName = "Keira James";       // <<< CHANGE THIS TO YOUR NAME

    // --- Image Paths (make sure these match your files in the 'images' subfolder) ---
    const backgroundImagePath = 'images/forest_background.jpg'; // <<< REPLACE
    const foregroundImage1Path = 'images/deer.png';             // <<< REPLACE (PNG for transparency is good)
    const foregroundImage2Path = 'images/fairy.png';            // <<< REPLACE

    // --- Load and Draw Background Image ---
    const backgroundImg = new Image();
    backgroundImg.src = backgroundImagePath;

    backgroundImg.onload = function() {
        // Draw the background to cover the entire canvas
        ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

        // --- Load and Draw Foreground Images (after background has loaded) ---
        loadForegroundImages();
    };
    backgroundImg.onerror = function() {
        console.error("Failed to load background image:", backgroundImagePath);
        ctx.fillStyle = "red";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Error: Background image not found.", canvas.width / 2, canvas.height / 2);
    }

    // --- Function to load and draw foreground images ---
    function loadForegroundImages() {
        const fgImg1 = new Image();
        fgImg1.src = foregroundImage1Path;

        const fgImg2 = new Image();
        fgImg2.src = foregroundImage2Path;

        let imagesLoadedCount = 0;
        const totalFgImages = 2;

        function drawFgWhenReady() {
            imagesLoadedCount++;
            if (imagesLoadedCount === totalFgImages) {
                // All foreground images are loaded, now draw them
                // Example positions and sizes - ADJUST THESE!
                ctx.drawImage(fgImg1, 50, 300, 150, 150); // x, y, width, height
                ctx.drawImage(fgImg2, 500, 250, 120, 180);

                // --- Add Text to the Canvas (after all images are drawn) ---
                addText();
            }
        }

        fgImg1.onload = drawFgWhenReady;
        fgImg1.onerror = function() {
            console.error("Failed to load foreground image 1:", foregroundImage1Path);
            imagesLoadedCount++; // Still increment to allow other images/text to draw
            if (imagesLoadedCount === totalFgImages) addText(); // Draw text even if an image fails
        }

        fgImg2.onload = drawFgWhenReady;
        fgImg2.onerror = function() {
            console.error("Failed to load foreground image 2:", foregroundImage2Path);
            imagesLoadedCount++;
            if (imagesLoadedCount === totalFgImages) addText();
        }
    }

    // --- Function to Add Text ---
    function addText() {
        // Scene Title
        ctx.font = "bold 36px 'Arial', sans-serif"; // <<< EXPERIMENT WITH FONTS
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";    // <<< EXPERIMENT WITH COLORS (white with slight transparency)
        ctx.textAlign = "center";
        ctx.fillText(sceneTitle, canvas.width / 2, 50); // Position at top-center

        // Your Name
        ctx.font = "italic 20px 'Verdana', sans-serif"; // <<< EXPERIMENT
        ctx.fillStyle = "rgba(230, 230, 250, 0.85)";        // <<< EXPERIMENT (light lavender with transparency)
        ctx.textAlign = "right";
        ctx.fillText(`By: ${yourName}`, canvas.width - 20, canvas.height - 20); // Position at bottom-right
    }

    // Fallback if background doesn't load quickly or at all, draw text anyway after a delay
    // This is a simple fallback, more robust image loading management would use Promises.
    setTimeout(() => {
        if (imagesLoadedCount < totalFgImages && !backgroundImg.complete) { // if background hasn't even started loading fg images
             console.warn("Background or foreground images might not have loaded. Drawing text as a fallback.");
             addText();
        }
    }, 3000); // Draw text after 3 seconds if images are slow/failed

}; // End of window.onload

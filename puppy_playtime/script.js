document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('puppyCanvas');
    const ctx = canvas.getContext('2d');

    // --- State Variables ---
    let currentBackground = 'park';
    let puppyX = 50;

    // **KEY ADJUSTMENT AREA for PUPPY Y**
    // Let's aim to have the puppy's feet near the bottom.
    // We'll set puppyHeight when the image loads.
    let puppyWidth = 70;  // Default, will be updated
    let puppyHeight = 70; // Default, will be updated
    let puppyBaseY = canvas.height - puppyHeight - 10; // Initial guess: puppyHeight from bottom + 10px margin

    let showBall = true;
    let showBone = false;
    let showFrisbee = false;

    const itemSize = 40;

    let bobOffset = 0;
    let bobDirection = 0.2;
    const bobAmount = 3;

    // --- Load Images ---
    const images = {};
    const imageSources = {
        park: 'images/background1_park.png',
        livingroom: 'images/background2_livingroom.png',
        beach: 'images/background3_beach.png',
        puppy: 'images/puppy_cute.png', // Make sure this image is trimmed well
        ball: 'images/toy_ball_cute.png',
        bone: 'images/toy_bone_cute.png',
        frisbee: 'images/toy_frisbee_cute.png'
    };
    let imagesLoadedCount = 0;
    const numImages = Object.keys(imageSources).length;
    let allImagesSuccessfullyLoaded = false;

    function checkImageLoaded(img) {
        return img && img.complete && typeof img.naturalWidth !== "undefined" && img.naturalWidth > 0;
    }

    function loadImage(key, src) {
        images[key] = new Image();
        images[key].onload = () => {
            console.log(`${src} loaded successfully.`);
            imagesLoadedCount++;
            if (key === 'puppy') {
                // Update puppy dimensions based on the loaded image
                puppyWidth = images.puppy.naturalWidth;
                puppyHeight = images.puppy.naturalHeight;
                // **CRUCIAL: Recalculate puppyBaseY now that we know the height**
                puppyBaseY = canvas.height - puppyHeight - 10; // e.g., 10px from the bottom
                puppyXSlider.max = canvas.width - puppyWidth; // Update slider max
                console.log(`Puppy dimensions: ${puppyWidth}x${puppyHeight}, BaseY: ${puppyBaseY}`);
            }
            if (imagesLoadedCount === numImages) {
                allImagesSuccessfullyLoaded = true;
                console.log("All image load attempts finished.");
            }
        };
        images[key].onerror = () => {
            console.error(`Error loading image: ${src}. It will not be drawn.`);
            images[key].broken = true;
            imagesLoadedCount++;
            if (imagesLoadedCount === numImages) {
                allImagesSuccessfullyLoaded = false;
                console.log("All image load attempts finished, some failed.");
            }
        };
        images[key].src = src;
    }

    for (const key in imageSources) {
        loadImage(key, imageSources[key]);
    }

    // --- Sound Elements --- (same)
    const barkSound = document.getElementById('barkSound');
    const squeakSound = document.getElementById('squeakSound');
    const pantSound = document.getElementById('pantSound');

    // --- Event Listeners --- (same, but puppyXSlider max update is more robust)
    document.querySelectorAll('input[name="background"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            currentBackground = event.target.value;
        });
    });

    const puppyXSlider = document.getElementById('puppyX');
    puppyXSlider.addEventListener('input', (event) => {
        const maxPuppyX = canvas.width - puppyWidth;
        puppyX = Math.min(maxPuppyX, Math.max(0, parseInt(event.target.value)));
    });
    puppyXSlider.max = canvas.width - puppyWidth; // Initial max, updated on puppy image load


    document.getElementById('showBall').addEventListener('change', (event) => {
        showBall = event.target.checked;
    });
    document.getElementById('showBone').addEventListener('change', (event) => {
        showBone = event.target.checked;
    });
    document.getElementById('showFrisbee').addEventListener('change', (event) => {
        showFrisbee = event.target.checked;
    });

    document.getElementById('soundBark').addEventListener('click', () => {
        barkSound.currentTime = 0;
        barkSound.play().catch(e => console.log("Audio play failed (bark):", e));
    });
    document.getElementById('soundSqueak').addEventListener('click', () => {
        squeakSound.currentTime = 0;
        squeakSound.play().catch(e => console.log("Audio play failed (squeak):", e));
    });
    document.getElementById('soundPant').addEventListener('click', () => {
        pantSound.currentTime = 0;
        pantSound.play().catch(e => console.log("Audio play failed (pant):", e));
    });


    // --- Drawing Function ---
    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFF9C4';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 1. Draw Background (same)
        const bgImg = images[currentBackground];
        if (checkImageLoaded(bgImg)) {
            ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        } else if (bgImg && bgImg.broken) {
            ctx.fillStyle = "#D7CCC8";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#795548";
            ctx.textAlign = "center";
            ctx.font = "16px 'Patrick Hand', cursive";
            ctx.fillText(`Oops! ${currentBackground} scene is napping... 😴`, canvas.width / 2, canvas.height / 2);
        }

        // 2. Draw Items (Toys) (same)
        const itemYBase = canvas.height - 60;
        const ballImg = images.ball;
        if (showBall && checkImageLoaded(ballImg)) {
            ctx.drawImage(ballImg, 150, itemYBase, itemSize, itemSize);
        }
        const boneImg = images.bone;
        if (showBone && checkImageLoaded(boneImg)) {
            ctx.drawImage(boneImg, 250, itemYBase + 5, itemSize + 10, itemSize - 5);
        }
        const frisbeeImg = images.frisbee;
        if (showFrisbee && checkImageLoaded(frisbeeImg)) {
            ctx.drawImage(frisbeeImg, 350, itemYBase - 40, itemSize, itemSize);
        }

        // 3. Draw Puppy with Bobbing
        bobOffset += bobDirection;
        if (bobOffset > bobAmount || bobOffset < -bobAmount) {
            bobDirection *= -1;
        }
        const currentPuppyY = puppyBaseY + bobOffset; // puppyBaseY is now calculated using actual height
        const puppyImg = images.puppy;

        if (checkImageLoaded(puppyImg)) {
            // **Draw using the image's natural dimensions**
            ctx.drawImage(puppyImg, puppyX, currentPuppyY, puppyWidth, puppyHeight);
        } else { // Fallback if puppy image isn't loaded
            ctx.fillStyle = '#A1887F';
            ctx.beginPath();
            ctx.roundRect(puppyX, currentPuppyY, puppyWidth, puppyHeight, [15, 15, 15, 15]);
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.font = "14px 'Patrick Hand', cursive";
            ctx.textAlign = "center";
            ctx.fillText('Puppy 🐾', puppyX + puppyWidth / 2, currentPuppyY + puppyHeight / 2 + 5);
        }
    }

    // --- Game Loop --- (same)
    function gameLoop() {
        if (imagesLoadedCount < numImages && !allImagesSuccessfullyLoaded) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#FADADD";
            ctx.fillRect(0,0, canvas.width, canvas.height);
            ctx.fillStyle = "#795548";
            ctx.font = "24px 'Patrick Hand', cursive";
            ctx.textAlign = "center";
            ctx.fillText("Fetching Puppy Treats... 🦴", canvas.width / 2, canvas.height / 2 -10);
            ctx.font = "18px 'Patrick Hand', cursive";
            ctx.fillText(`Loaded ${imagesLoadedCount}/${numImages} goodies!`, canvas.width / 2, canvas.height / 2 + 20);
        } else {
            drawScene();
        }
        requestAnimationFrame(gameLoop);
    }

    console.log("Starting game loop. Waiting for image load attempts...");
    requestAnimationFrame(gameLoop);
});
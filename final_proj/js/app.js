// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    // PWA Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js') // Make sure sw.js is in the root
                .then(registration => console.log('Service Worker registered with scope:', registration.scope))
                .catch(err => console.error('Service Worker registration failed:', err));
        });
    }

    // PWA Install Prompt Handling
    let deferredPrompt;
    const installButton = document.getElementById('installButton');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        if (installButton) {
            installButton.style.display = 'block';
        }
    });

    if (installButton) {
        installButton.addEventListener('click', async () => {
            installButton.style.display = 'none';
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response to the install prompt: ${outcome}`);
                if (outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
            }
        });
    }

    window.addEventListener('appinstalled', () => {
        console.log('AstroLearner was installed.');
        if (installButton) installButton.style.display = 'none';
        deferredPrompt = null; 
    });


    // --- App Logic ---
    const canvas = document.getElementById('mainCanvas');
    const ctx = canvas.getContext('2d');
    const topicTitleEl = document.getElementById('topicTitle');
    const topicTextEl = document.getElementById('topicText');
    const playAudioButton = document.getElementById('playAudioButton');
    const topicMenuEl = document.getElementById('topicMenu');

    let solarSystemData = [];
    let currentTopic = null;
    let currentAudio = null;
    // let clickSfx = new Audio('audio/sfx/menu_click.wav'); 
    // let transitionSfx = new Audio('audio/sfx/transition_effect.mp3');

    // --- Canvas Drawing Functions ---
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#101020'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawStars();
    }

    function drawStars(count = 100) {
        for (let i = 0; i < count; i++) {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`; 
            ctx.beginPath();
            ctx.arc(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                Math.random() * 1.5 + 0.5, 
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
    }

    function drawTopicImage(imageSrc) {
        const img = new Image();
        img.onload = () => {
            clearCanvas(); 

            const canvasAspect = canvas.width / canvas.height;
            const imgAspect = img.width / img.height;
            let drawWidth, drawHeight, offsetX, offsetY;

            if (imgAspect > canvasAspect) { 
                drawWidth = canvas.width * 0.8; 
                drawHeight = drawWidth / imgAspect;
            } else { 
                drawHeight = canvas.height * 0.8; 
                drawWidth = drawHeight * imgAspect;
            }

            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = (canvas.height - drawHeight) / 2;

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };
        img.onerror = () => {
            console.error(`Failed to load image: ${imageSrc}`);
            clearCanvas();
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.font = '16px Arial';
            ctx.fillText('Image not available', canvas.width / 2, canvas.height / 2);
        };
        img.src = imageSrc;
    }

    // --- Content and Audio Handling ---
    function displayTopicContent(topic) {
        currentTopic = topic;
        topicTitleEl.textContent = topic.title;
        topicTextEl.textContent = topic.text;

        drawTopicImage(topic.image);

        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            playAudioButton.textContent = "Play Facts";
        }

        if (topic.audio) {
            currentAudio = new Audio(topic.audio);
            playAudioButton.style.display = 'inline-block';

            currentAudio.onended = () => {
                playAudioButton.textContent = "Play Facts";
            };
            currentAudio.onerror = () => {
                console.error(`Failed to load audio: ${topic.audio}`);
                playAudioButton.style.display = 'none';
            }
        } else {
            playAudioButton.style.display = 'none';
            currentAudio = null;
        }
    }

    if (playAudioButton) {
        playAudioButton.addEventListener('click', () => {
            if (currentAudio) {
                if (currentAudio.paused) {
                    currentAudio.play()
                        .then(() => playAudioButton.textContent = "Pause Facts")
                        .catch(e => console.error("Error playing audio:", e));
                } else {
                    currentAudio.pause();
                    playAudioButton.textContent = "Play Facts";
                }
            }
        });
    }


    // --- Menu Creation ---
    function createMenu() {
        if (!topicMenuEl) return;
        topicMenuEl.innerHTML = ''; 

        solarSystemData.forEach((topic, index) => {
            const button = document.createElement('button');
            button.textContent = topic.title;
            button.classList.add('menu-button'); 
            if (index === 0) button.classList.add('active'); 

            button.addEventListener('click', () => {
                displayTopicContent(topic);
                document.querySelectorAll('#topicMenu .menu-button').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
            topicMenuEl.appendChild(button);
        });
    }

    // --- Data Loading and Initialization ---
    async function loadDataAndInitialize() {
        try {
            console.log("Attempting to fetch solar_system_data.json from HTTP server...");
            const response = await fetch('data/solar_system_data.json'); 
            console.log("Fetch response status (from HTTP):", response.status);
            console.log("Fetch response ok (from HTTP):", response.ok);

            if (!response.ok) {
                const errorText = await response.text(); 
                console.error("Fetch error response text (from HTTP):", errorText);
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText || errorText}`);
            }

            // DEBUGGING: Log raw text before parsing
            const responseText = await response.text();
            console.log("--- Raw content of solar_system_data.json ---");
            console.log(responseText);
            console.log("--- End of raw content ---");
            

          
            solarSystemData = JSON.parse(responseText); 
            
            console.log("Parsed solarSystemData (from HTTP):", solarSystemData);


            if (solarSystemData.length > 0) {
                createMenu();
                displayTopicContent(solarSystemData[0]); 
            } else {
                topicTitleEl.textContent = "No Data";
                topicTextEl.textContent = "Could not find any topics to display.";
                clearCanvas();
                 ctx.fillStyle = 'white';
                 ctx.textAlign = 'center';
                 ctx.font = '16px Arial';
                 ctx.fillText('No data loaded.', canvas.width / 2, canvas.height / 2);
            }
        } catch (error) {
            console.error("Could not load or parse solar system data:", error); 
            topicTitleEl.textContent = "Error Loading Content"; 
            topicTextEl.textContent = `Failed to load content. Please check the browser console for details. Error: ${error.message}`;
            clearCanvas();
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.font = '16px Arial';
            ctx.fillText('Error loading data.', canvas.width / 2, canvas.height / 2);
        }
    }

    // --- Initial Setup ---
    clearCanvas(); 
    loadDataAndInitialize();

}); // End of DOMContentLoaded
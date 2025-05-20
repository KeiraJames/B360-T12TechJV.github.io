console.log("🎀 Keira's Cutesy Grid Page is loaded! Have fun! 🎀");

// You could add more interactive cutesy things here later if you want!
// For example, changing an emoji on click, or a little animation.
// But for a grid demo, this is often enough to show the JS file is connected.

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.adorable-container h1');
    if (header) {
        header.addEventListener('mouseover', () => {
            // Just a little fun effect, not essential for the grid
            const emojis = ['✨', '💖', '🌸', '🎀', '🌟', '🧁', '🎈'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            // This is a bit simplistic, might replace emojis too fast or look odd
            // but just an idea for "cutesy" interaction
            // console.log(randomEmoji);
        });
    }
});

window.addEventListener('DOMContentLoaded', event => {
    // Activate Bootstrap scrollspy on the main nav element if present
    // This makes nav links highlight as you scroll to their sections.
    // For this to work best, your body tag should have:
    // <body data-bs-spy="scroll" data-bs-target="#navbarNav" data-bs-offset="80">
    // The offset should be a bit more than your navbar's height.
    // However, a more manual approach is sometimes needed for full control.

    const mainNav = document.body.querySelector('#navbarNav');
    if (mainNav) {
        // Initialize Bootstrap's ScrollSpy if you add data-bs-spy to body
        // Example: if (document.body.hasAttribute('data-bs-spy')) {
        //    new bootstrap.ScrollSpy(document.body, {
        //        target: '#navbarNav',
        //        offset: 80 // Adjust this value based on your navbar height + a little buffer
        //    });
        // }

        // Manual scroll highlighting (alternative to Bootstrap ScrollSpy or if it's finicky)
        const sections = document.querySelectorAll('.resume-section');
        const navLinks = document.querySelectorAll('#navbarNav .nav-link');

        const activateNavLink = (currentId) => {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', () => {
            let currentSectionId = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                // Adjust offset (75) to be slightly more than navbar height
                if (pageYOffset >= (sectionTop - 75) && pageYOffset < (sectionTop + sectionHeight - 75)) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            if (currentSectionId) {
                activateNavLink(currentSectionId);
            } else if (window.pageYOffset < sections[0].offsetTop - 75 && navLinks.length > 0) {
                // If scrolled to the very top before the first section
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[0].classList.add('active'); // Highlight the first nav item
            }
        });

        // Initial active state on load for the first item if no hash
        if (!window.location.hash && navLinks.length > 0) {
            navLinks[0].classList.add('active');
        }

    }

    // Little animation for the profile picture on hover (already in CSS but can be enhanced here)
    const profilePic = document.querySelector('.profile-pic');
    if (profilePic) {
        profilePic.addEventListener('mouseenter', () => {
            // CSS handles the hover animation, JS could add more complex things
        });
        profilePic.addEventListener('mouseleave', () => {
            //
        });
    }

    console.log("Cinnamoroll's sweet resume page is ready! ☁️");
});

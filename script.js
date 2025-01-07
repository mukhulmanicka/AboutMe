(function () {
    // Update active button on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const controls = document.querySelectorAll('.control');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.scrollY || window.pageYOffset;

            if (scrollPosition >= sectionTop - sectionHeight / 3 && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        controls.forEach(control => {
            control.classList.remove('active-btn');
            if (control.dataset.id === current) {
                control.classList.add('active-btn');
            }
        });
    });

    // Smooth scroll to section when clicking controls
    [...document.querySelectorAll('.control')].forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const id = button.dataset.id;
            document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Theme toggler
    document.querySelector('.theme-btn').addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });
})();

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".carousel-slide");
    const prevButton = document.querySelector(".carousel-button.prev");
    const nextButton = document.querySelector(".carousel-button.next");
    const fullscreenOverlay = document.querySelector(".fullscreen-overlay");
    const fullscreenImage = document.querySelector(".fullscreen-image");
    const closeFullscreenButton = document.querySelector(".close-fullscreen");
    let currentSlide = 0;

    const updateSlide = () => {
        slides.forEach((slide, index) => {
            slide.classList.toggle("active", index === currentSlide);
        });

        // Dynamic button visibility
        prevButton.classList.toggle("hidden", currentSlide === 0);
        nextButton.classList.toggle("hidden", currentSlide === slides.length - 1);
    };

    const openFullscreen = (src) => {
        fullscreenImage.src = src;
        fullscreenOverlay.classList.add("visible");
    };

    const closeFullscreen = () => {
        fullscreenOverlay.classList.remove("visible");
    };

    prevButton.addEventListener("click", () => {
        if (currentSlide > 0) currentSlide--;
        updateSlide();
    });

    nextButton.addEventListener("click", () => {
        if (currentSlide < slides.length - 1) currentSlide++;
        updateSlide();
    });

    slides.forEach((slide) => {
        const img = slide.querySelector("img");
        img.addEventListener("click", () => openFullscreen(img.src));
    });

    closeFullscreenButton.addEventListener("click", closeFullscreen);

    // Close fullscreen on overlay click
    fullscreenOverlay.addEventListener("click", (e) => {
        if (e.target === fullscreenOverlay || e.target === closeFullscreenButton) {
            closeFullscreen();
        }
    });

    // Initialize the carousel
    updateSlide();
});

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

document.addEventListener('DOMContentLoaded', function() {
    // Carousel (si présent)
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-nav .prev');
    const nextBtn = document.querySelector('.carousel-nav .next');
    let currentIndex = 0;
    function updateCarousel() {
        if (carousel) {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }
    if (prevBtn && nextBtn && carouselItems.length > 0) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
            updateCarousel();
        });
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });
        setInterval(() => {
            currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        }, 5000);
    }

    // Animation d'apparition au scroll (section-animate, gallery-item, cta-section)
    const revealElements = document.querySelectorAll('.section-animate, .gallery-item, .cta-section');
    function revealOnScroll() {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                el.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Menu burger responsive
    const burger = document.getElementById('burger-menu');
    const navLinks = document.getElementById('nav-links');
    if (burger && navLinks) {
        burger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            burger.classList.toggle('open');
        });
    }

    // Ligne de progression au scroll
    const scrollLine = document.querySelector('.scroll-line');
    window.addEventListener('scroll', () => {
        if (scrollLine) {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const width = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            scrollLine.style.width = width + "%";
        }
    });

    // Lightbox pour agrandir les images au clic (blog-post et gallery)
    document.querySelectorAll('.blog-post img, .gallery-item img, img.enlargeable').forEach(img => {
        img.classList.add('enlargeable');
        img.addEventListener('click', function() {
            const overlay = document.getElementById('lightbox-overlay');
            const lightboxImg = document.getElementById('lightbox-img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            overlay.style.display = 'flex';
        });
    });
    const overlay = document.getElementById('lightbox-overlay');
    if (overlay) {
        overlay.onclick = function() {
            overlay.style.display = 'none';
            document.getElementById('lightbox-img').src = '';
        };
        document.addEventListener('keydown', function(e){
            if(e.key === "Escape") {
                overlay.style.display = 'none';
                document.getElementById('lightbox-img').src = '';
            }
        });
    }

    // Animation scroll douce
    document.documentElement.style.scrollBehavior = "smooth";

    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e){
            e.preventDefault();
            const form = e.target;
            const data = Object.fromEntries(new FormData(form));
            fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(result => {
                document.getElementById('formMessage').textContent = result.message;
                if(result.success) form.reset();
            })
            .catch(() => {
                document.getElementById('formMessage').textContent = "Erreur serveur, réessayez plus tard.";
            });
        });
    }

    // Formulaire de don
    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        donationForm.addEventListener('submit', function(e){
            e.preventDefault();
            const form = e.target;
            const data = Object.fromEntries(new FormData(form));
            fetch('/api/don', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(result => {
                document.getElementById('donationMessage').textContent = result.message;
                if(result.success) form.reset();
            })
            .catch(() => {
                document.getElementById('donationMessage').textContent = "Erreur serveur, réessayez plus tard.";
            });
        });
    }

    // Gestion des boutons de montant dans le formulaire de don
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');

    if (amountBtns && customAmountInput) {
        amountBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                // Retire la classe active de tous les boutons
                amountBtns.forEach(b => b.classList.remove('active'));
                // Ajoute la classe active sur le bouton cliqué
                btn.classList.add('active');
                // Met à jour le champ de montant personnalisé
                customAmountInput.value = btn.dataset.amount;
            });
        });
        // Si l'utilisateur clique dans le champ personnalisé, on retire la sélection des boutons
        customAmountInput.addEventListener('focus', function() {
            amountBtns.forEach(b => b.classList.remove('active'));
        });
    }
});

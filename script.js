/* ============================================
   AChERLABs Website - Main JavaScript Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Toast Notification Utility
    // ----------------------------------------------------
    function showToast(message, type = 'info') {
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);

        // Force reflow for animation
        setTimeout(() => toast.classList.add('show'), 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    // Expose showToast globally
    window.showToast = showToast;

    // ----------------------------------------------------
    // 2. Navigation Scrolled Effect & Mobile Menu Toggle
    // ----------------------------------------------------
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');

            // Responsive toggle style check
            if (navLinks.classList.contains('active')) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = '#ffffff';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
            } else {
                navLinks.style.display = '';
            }
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (window.innerWidth <= 768) {
                    navLinks.style.display = '';
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (window.innerWidth <= 768) {
                    navLinks.style.display = '';
                }
            }
        });
    }

    // ----------------------------------------------------
    // 3. Active Navigation Link Highlighting on Scroll
    // ----------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navBtns = document.querySelectorAll('.nav-links .nav-btn');

    if (sections.length > 0 && navBtns.length > 0) {
        window.addEventListener('scroll', () => {
            let currentSectionId = '';
            const scrollPos = window.scrollY + 120;

            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                if (scrollPos >= top && scrollPos < top + height) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            navBtns.forEach(btn => {
                btn.classList.remove('active');
                const href = btn.getAttribute('href');
                if (href && (href === `#${currentSectionId}` || href.endsWith(`#${currentSectionId}`))) {
                    btn.classList.add('active');
                }
            });
        });
    }

    // ----------------------------------------------------
    // 4. Hero Background Image Slider (Auto Cycling)
    // ----------------------------------------------------
    const slides = document.querySelectorAll('.hero-bg-slider .slide');
    if (slides.length > 1) {
        let currentSlide = 0;
        const slideInterval = 5000; // 5 seconds

        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, slideInterval);
    }

    // ----------------------------------------------------
    // 5. Country List & Dial Code Auto-Population
    // ----------------------------------------------------
    const countryCodes = {
        "Afghanistan": "+93", "Albania": "+355", "Algeria": "+213", "Andorra": "+376", "Angola": "+244",
        "Argentina": "+54", "Armenia": "+374", "Australia": "+61", "Austria": "+43", "Azerbaijan": "+994",
        "Bahrain": "+973", "Bangladesh": "+880", "Belgium": "+32", "Brazil": "+55", "Bulgaria": "+359",
        "Cambodia": "+855", "Canada": "+1", "Chile": "+56", "China": "+86", "Colombia": "+57",
        "Croatia": "+385", "Cyprus": "+357", "Czech Republic": "+420", "Denmark": "+45", "Egypt": "+20",
        "Estonia": "+372", "Ethiopia": "+251", "Finland": "+358", "France": "+33", "Georgia": "+995",
        "Germany": "+49", "Ghana": "+233", "Greece": "+30", "Hungary": "+36", "Iceland": "+354",
        "India": "+91", "Indonesia": "+62", "Iran": "+98", "Iraq": "+964", "Ireland": "+353",
        "Israel": "+972", "Italy": "+39", "Japan": "+81", "Jordan": "+962", "Kazakhstan": "+7",
        "Kenya": "+254", "Kuwait": "+965", "Latvia": "+371", "Lebanon": "+961", "Lithuania": "+370",
        "Luxembourg": "+352", "Malaysia": "+60", "Mexico": "+52", "Morocco": "+212", "Nepal": "+977",
        "Netherlands": "+31", "New Zealand": "+64", "Nigeria": "+234", "Norway": "+47", "Oman": "+968",
        "Pakistan": "+92", "Peru": "+51", "Philippines": "+63", "Poland": "+48", "Portugal": "+351",
        "Qatar": "+974", "Romania": "+40", "Russia": "+7", "Saudi Arabia": "+966", "Singapore": "+65",
        "South Africa": "+27", "South Korea": "+82", "Spain": "+34", "Sri Lanka": "+94", "Sweden": "+46",
        "Switzerland": "+41", "Thailand": "+66", "Turkey": "+90", "Ukraine": "+380",
        "United Arab Emirates": "+971", "United Kingdom": "+44", "United States": "+1", "Vietnam": "+84"
    };

    const countrySelect = document.getElementById('countrySelect');
    const countryCodeInput = document.getElementById('country_code');

    if (countrySelect) {
        // Populate options if empty
        if (countrySelect.options.length <= 1) {
            Object.keys(countryCodes).sort().forEach(country => {
                const opt = document.createElement('option');
                opt.value = country;
                opt.textContent = country;
                countrySelect.appendChild(opt);
            });
        }

        countrySelect.addEventListener('change', function () {
            if (countryCodeInput) {
                countryCodeInput.value = countryCodes[this.value] || '';
            }
        });
    }

    // ----------------------------------------------------
    // 6. Mobile Input Numeric Restriction
    // ----------------------------------------------------
    const mobileInputs = document.querySelectorAll('input[type="tel"], #mobile');
    mobileInputs.forEach(input => {
        input.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });

    // ----------------------------------------------------
    // 7. Download Modal Handler
    // ----------------------------------------------------
    const modal = document.getElementById('downloadModal');
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.getElementById('closeModal');

    if (openModalBtn && modal) {
        openModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
        });
    }

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // ----------------------------------------------------
    // 8. Contact Form Handling
    // ----------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const responseMsg = document.getElementById('responseMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : 'Submit';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }

            // Simulate form submission
            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }

                contactForm.reset();

                if (responseMsg) {
                    responseMsg.style.color = '#22c55e';
                    responseMsg.style.marginTop = '15px';
                    responseMsg.style.fontWeight = '600';
                    responseMsg.textContent = 'Thank you! Your message has been sent successfully. Our team will get back to you shortly.';
                }

                showToast('Message sent successfully!', 'success');
            }, 1000);
        });
    }

    // ----------------------------------------------------
    // 9. Download Form Handling
    // ----------------------------------------------------
    const downloadForm = document.getElementById('downloadForm');

    if (downloadForm) {
        downloadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = downloadForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : 'Submit';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Processing...';
            }

            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }

                downloadForm.reset();
                if (modal) modal.style.display = 'none';

                showToast('Request submitted successfully! Downloading details...', 'success');
            }, 1200);
        });
    }
});

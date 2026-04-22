// ============================================
// AcherLab Website - Main JavaScript (Final Updated)
// ============================================

// 1. Navbar Scroll Effect (Background Change)
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Call the active nav function on scroll
    updateActiveNavOnScroll();
});

// 2. Function: Active Navigation Link on Scroll
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navBtns = document.querySelectorAll('.nav-btn');
    
    let current = "";

    // Check karein ki user kaunsi section par hai
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // 150px offset taaki navbar ke niche wala part count ho
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    // Active class update karein
    navBtns.forEach(btn => {
        btn.classList.remove('active');
        // Check karein ki button ka href match kar raha hai current section se
        // btn.getAttribute('href') format "#home" jaisa hoga
        if (btn.getAttribute('href') == '#' + current) {
            btn.classList.add('active');
        }
    });
}

// 3. Mobile Menu Logic (Toggle + Close on Click)
function initMobileMenu() {
    const hamburger = document.querySelector('.mobile-menu-btn');
    const navContainer = document.querySelector('.nav-links');

    if (hamburger && navContainer) {
        // Toggle Menu on Hamburger Click
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navContainer.classList.toggle('show');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navContainer.contains(e.target) && !hamburger.contains(e.target)) {
                navContainer.classList.remove('show');
            }
        });

        // Close menu when a Nav Link is clicked (Important for Single Page)
        const navButtons = navContainer.querySelectorAll('.nav-btn');
        navButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Check if menu is open, then close it
                if (navContainer.classList.contains('show')) {
                    navContainer.classList.remove('show');
                }
            });
        });
    }
}

// 4. Create Particles for Hero Section
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const colors = ['#06b6d4', '#a855f7', '#f97316', '#22c55e'];

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.backgroundColor = colors[i % 4];
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (2 + Math.random() * 3) + 's';
        container.appendChild(particle);
    }
}

// 5. Contact Form Handler
function initFormHandler() {
    const form = document.getElementById("contactForm");
    const responseMessage = document.getElementById("responseMessage");

    if (form && responseMessage) {
        const scriptURL = "https://script.google.com/macros/s/AKfycbyK38CS8AYsQ65PR9oqIgB5DgE_b0t-f4Juh9X_f6Ja5cl05c5uJmmaGQB6lWqwBV4VAQ/exec";

        form.addEventListener("submit", e => {
            e.preventDefault();

            responseMessage.innerText = "Sending...";
            responseMessage.style.color = "#94a3b8";

            fetch(scriptURL, { method: "POST", body: new FormData(form) })
                .then(response => {
                    responseMessage.innerText = "Thank you! Your message has been sent successfully.";
                    responseMessage.style.color = "#94a3b8";
                    form.reset();
                })
                .catch(error => {
                    console.error("Error!", error.message);
                    responseMessage.innerText = "Error! Please try again.";
                    responseMessage.style.color = "#ef4444";
                });
        });
    }
}

// 6. Download Modal Logic (Integrated with Validation)
function initDownloadModal() {
    const modal = document.getElementById("downloadModal");
    const openBtn = document.getElementById("openModal");
    const closeBtn = document.getElementById("closeModal");
    const form = document.getElementById("downloadForm");
    const mobileInput = document.getElementById('mobile');

    if (!modal || !openBtn || !closeBtn || !form) return;

    // --- Modal Open/Close ---
    openBtn.addEventListener("click", function() {
        modal.style.display = "block";
    });

    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // --- Country Code Logic ---
    const countryCodes = {
        "Afghanistan": "+93", "Albania": "+355", "Algeria": "+213", "Andorra": "+376", "Angola": "+244", "Antigua & Barbuda": "+1268", "Argentina": "+54", "Armenia": "+374", "Australia": "+61", "Austria": "+43", "Azerbaijan": "+994", "Bahamas": "+1242", "Bahrain": "+973", "Bangladesh": "+880", "Barbados": "+1246", "Belarus": "+375", "Belgium": "+32", "Belize": "+501", "Benin": "+229", "Bhutan": "+975", "Bolivia": "+591", "Bosnia & Herzegovina": "+387", "Botswana": "+267", "Brazil": "+55", "Brunei": "+673", "Bulgaria": "+359", "Burkina Faso": "+226", "Burundi": "+257", "Cabo Verde": "+238", "Cambodia": "+855", "Cameroon": "+237", "Canada": "+1", "Central African Republic": "+236", "Chad": "+235", "Chile": "+56", "China": "+86", "Colombia": "+57", "Comoros": "+269", "Congo": "+242", "Costa Rica": "+506", "Côte d'Ivoire": "+225", "Croatia": "+385", "Cuba": "+53", "Cyprus": "+357", "Czech Republic": "+420", "Denmark": "+45", "Djibouti": "+253", "Dominica": "+1767", "Dominican Republic": "+1809", "DR Congo": "+243", "Ecuador": "+593", "Egypt": "+20", "El Salvador": "+503", "Equatorial Guinea": "+240", "Eritrea": "+291", "Estonia": "+372", "Eswatini": "+268", "Ethiopia": "+251", "Fiji": "+679", "Finland": "+358", "France": "+33", "Gabon": "+241", "Gambia": "+220", "Georgia": "+995", "Germany": "+49", "Ghana": "+233", "Greece": "+30", "Grenada": "+1473", "Guatemala": "+502", "Guinea": "+224", "Guinea-Bissau": "+245", "Guyana": "+592", "Haiti": "+509", "Holy See": "+379", "Honduras": "+504", "Hungary": "+36", "Iceland": "+354", "India": "+91", "Indonesia": "+62", "Iran": "+98", "Iraq": "+964", "Ireland": "+353", "Israel": "+972", "Italy": "+39", "Jamaica": "+1876", "Japan": "+81", "Jordan": "+962", "Kazakhstan": "+7", "Kenya": "+254", "Kiribati": "+686", "Kuwait": "+965", "Kyrgyzstan": "+996", "Laos": "+856", "Latvia": "+371", "Lebanon": "+961", "Lesotho": "+266", "Liberia": "+231", "Libya": "+218", "Liechtenstein": "+423", "Lithuania": "+370", "Luxembourg": "+352", "Madagascar": "+261", "Malawi": "+265", "Malaysia": "+60", "Maldives": "+960", "Mali": "+223", "Malta": "+356", "Marshall Islands": "+692", "Mauritania": "+222", "Mauritius": "+230", "Mexico": "+52", "Micronesia": "+691", "Moldova": "+373", "Monaco": "+377", "Mongolia": "+976", "Montenegro": "+382", "Morocco": "+212", "Mozambique": "+258", "Myanmar": "+95", "Namibia": "+264", "Nauru": "+674", "Nepal": "+977", "Netherlands": "+31", "New Zealand": "+64", "Nicaragua": "+505", "Niger": "+227", "Nigeria": "+234", "North Korea": "+850", "North Macedonia": "+389", "Norway": "+47", "Oman": "+968", "Pakistan": "+92", "Palau": "+680", "Panama": "+507", "Papua New Guinea": "+675", "Paraguay": "+595", "Peru": "+51", "Philippines": "+63", "Poland": "+48", "Portugal": "+351", "Qatar": "+974", "Romania": "+40", "Russia": "+7", "Rwanda": "+250", "Saint Kitts & Nevis": "+1869", "Saint Lucia": "+1758", "Samoa": "+685", "San Marino": "+378", "Sao Tome & Principe": "+239", "Saudi Arabia": "+966", "Senegal": "+221", "Serbia": "+381", "Seychelles": "+248", "Sierra Leone": "+232", "Singapore": "+65", "Slovakia": "+421", "Slovenia": "+386", "Solomon Islands": "+677", "Somalia": "+252", "South Africa": "+27", "South Korea": "+82", "South Sudan": "+211", "Spain": "+34", "Sri Lanka": "+94", "St. Vincent & Grenadines": "+1784", "State of Palestine": "+970", "Sudan": "+249", "Suriname": "+597", "Sweden": "+46", "Switzerland": "+41", "Syria": "+963", "Tajikistan": "+992", "Tanzania": "+255", "Thailand": "+66", "Timor-Leste": "+670", "Togo": "+228", "Tonga": "+676", "Trinidad & Tobago": "+1868", "Tunisia": "+216", "Turkey": "+90", "Turkmenistan": "+993", "Tuvalu": "+688", "Uganda": "+256", "Ukraine": "+380", "United Arab Emirates": "+971", "United Kingdom": "+44", "United States": "+1", "Uruguay": "+598", "Uzbekistan": "+998", "Vanuatu": "+678", "Venezuela": "+58", "Vietnam": "+84", "Yemen": "+967", "Zambia": "+260", "Zimbabwe": "+263"
    };

    const select = document.getElementById("countrySelect");

    if (select) {
        if (select.options.length <= 1) {
            Object.keys(countryCodes).sort().forEach(country => {
                const option = document.createElement("option");
                option.value = country;
                option.textContent = country;
                select.appendChild(option);
            });
        }

        select.addEventListener("change", function() {
            const codeInput = document.getElementById("country_code");
            if (countryCodes[this.value]) {
                codeInput.value = countryCodes[this.value];
            } else {
                codeInput.value = "";
            }
        });
    }

    // --- Mobile Input Validation & Scroll Fix ---
    if (mobileInput) {
        mobileInput.addEventListener('focus', function() {
            setTimeout(function() {
                mobileInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });

        mobileInput.addEventListener('keypress', function(e) {
            const charCode = (e.which) ? e.which : e.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                e.preventDefault();
            }
        });

        mobileInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    // --- Form Submit Handler ---
    const scriptURL = "https://script.google.com/macros/s/AKfycbyT-EM5ItFY9CR3271O-f1OvTUkD2AgIdfzrXMcGjh8g0v0qTnaKucbq1dXzlzsRDk0/exec";
    const fileId = "1kqtQLNplcL7OV_js9y0YZib0g04ABM1_"; //PipingLab Softwer Download//
    const downloadLink = "https://drive.google.com/uc?export=download&id=" + fileId;

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const mobileValue = mobileInput.value;
        if (!mobileValue) {
            alert("Please enter a mobile number.");
            return;
        }
        if (!/^\d+$/.test(mobileValue)) {
            alert("Mobile number should contain only digits.");
            return;
        }
        if (mobileValue.length < 5) {
            alert("Please enter a valid mobile number.");
            return;
        }

        const btn = form.querySelector(".modal-btn");
        const originalText = btn.innerText;
        btn.innerText = "Processing...";
        btn.disabled = true;

        const formData = new FormData(form);
        const bodyString = new URLSearchParams(formData).toString();

        fetch(scriptURL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: bodyString
        })
        .then(response => response.text())
        .then(() => {
            alert("Success! Check your email for confirmation. Download starting...");
            form.reset();
            modal.style.display = "none";
            window.open(downloadLink, "_blank");
        })
        .catch(error => {
            console.error("Error!", error.message);
            alert("Error submitting form. Please try again.");
        })
        .finally(() => {
            btn.innerText = originalText;
            btn.disabled = false;
        });
    });
}

// 7. Hero Background Slider Logic
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-bg-slider .slide');

    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % totalSlides;
            slides[currentSlide].classList.add('active');
        }

        setInterval(nextSlide, 2500);
    }
}

// ============================================
// Initialize Everything on Page Load
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    initFormHandler();
    initDownloadModal();
    initMobileMenu(); // Isme mobile menu ka logic aa gaya hai
    initHeroSlider();
    
    // Page load par bhi ek baar active nav check karein
    updateActiveNavOnScroll();
});

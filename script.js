/* ==========================================================================
   CONFIGURATIONS (Yahan Apni Real Links Aur Email Likhein)
   ========================================================================== */
const MY_CONFIG = {
    // email: "apnamail@gmail.com",                  
    subject: "Hiring Inquiry from Portfolio",     // Email ka default subject
    linkedin: "https://www.linkedin.com/in/rafianasir-webdev/?isSelfProfile=true",
    github: "https://github.com/nasirhanzala",        
    
};

/* ==========================================================================
   REAL LINKS ACTION (Automating icons and buttons dynamically)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // 1. LinkedIn Links Setup
    document.querySelectorAll('a[class*="linkedin"], a[href*="linkedin"], .fa-linkedin').forEach(el => {
        const anchor = el.closest('a');
        if (anchor) {
            anchor.setAttribute('href', MY_CONFIG.linkedin);
            anchor.setAttribute('target', '_blank'); // New tab mein kholne ke liye
        }
    });

    // 2. GitHub Links Setup
    document.querySelectorAll('a[class*="github"], a[href*="github"], .fa-github').forEach(el => {
        const anchor = el.closest('a');
        if (anchor) {
            anchor.setAttribute('href', MY_CONFIG.github);
            anchor.setAttribute('target', '_blank');
        }
    });

    // 3. Instagram / Twitter Setup (If icons exist in your layout)
    document.querySelectorAll('.fa-instagram, .fa-instagram-square').forEach(el => {
        const anchor = el.closest('a');
        if (anchor) { anchor.setAttribute('href', MY_CONFIG.instagram); anchor.setAttribute('target', '_blank'); }
    });
    document.querySelectorAll('.fa-twitter, .fa-x-twitter').forEach(el => {
        const anchor = el.closest('a');
        if (anchor) { anchor.setAttribute('href', MY_CONFIG.twitter); anchor.setAttribute('target', '_blank'); }
    });

    // 4. Email Direct Action (Mailto trigger)
    // Yeh header/footer ya contact-card ke envelope icon par automatic set ho jayega
    document.querySelectorAll('a[href^="mailto"], .fa-envelope, .fa-envelope-open').forEach(el => {
        const anchor = el.closest('a');
        if (anchor) {
            anchor.setAttribute('href', `mailto:${MY_CONFIG.email}?subject=${encodeURIComponent(MY_CONFIG.subject)}`);
        }
    });
});


/* ==========================================================================
   HAMBURGER MENU TOGGLE & CLICK-OUTSIDE
   ========================================================================== */
const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");
const menuIcon = menuBtn ? menuBtn.querySelector("i") : null;

if (menuBtn && navbar && menuIcon) {
    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Click event ko bubble hone se rokega
        navbar.classList.toggle("active");

        if (navbar.classList.contains("active")) {
            menuIcon.classList.remove("fa-bars");
            menuIcon.classList.add("fa-xmark");
        } else {
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
        }
    });

    // Menu link click karne par navbar automatic close ho jaye
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
        });
    });

    // UX Feature: Agar mobile menu open ho aur user bahar kahin bhi screen par click kare to menu band ho jaye
    document.addEventListener("click", (e) => {
        if (!navbar.contains(e.target) && !menuBtn.contains(e.target)) {
            navbar.classList.remove("active");
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
        }
    });
}


/* ==========================================================================
   DARK MODE CONTROLLER (Perfect CSS Variable Sync)
   ========================================================================== */
const themeBtn = document.querySelector(".theme-btn");
const themeIcon = document.querySelector(".theme-btn i");

function enableDarkMode() {
    // CSS Variables se match karne ke liye class ko "dark-theme" kiya
    document.body.classList.add("dark-theme");

    if (themeIcon) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    }

    localStorage.setItem("theme", "dark");
}

function disableDarkMode() {
    document.body.classList.remove("dark-theme");

    if (themeIcon) {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    }

    localStorage.setItem("theme", "light");
}

/* Load Saved Theme on Load */
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    enableDarkMode();
} else {
    disableDarkMode(); // default behavior light mode
}

/* Toggle Theme Button Listener */
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        if (document.body.classList.contains("dark-theme")) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
}
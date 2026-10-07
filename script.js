/* =====================================================
   NEXUS AI CLUB
   Main JavaScript
   ===================================================== */


/* ================= ELEMENTS ================= */

const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("backToTop");
const joinForm = document.getElementById("joinForm");
const successMessage = document.getElementById("successMessage");
const currentYear = document.getElementById("currentYear");


/* ================= MOBILE MENU ================= */

menuToggle.addEventListener("click", () => {

    const isOpen = navMenu.classList.toggle("open");

    menuToggle.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

    document.body.classList.toggle(
        "menu-open",
        isOpen
    );
});


/* Close menu when a navigation link is clicked */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        menuToggle.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove("menu-open");
    });

});


/* Close menu when Join Us is clicked */

const joinButton = document.querySelector(".join-btn");

if (joinButton) {

    joinButton.addEventListener("click", () => {

        navMenu.classList.remove("open");

        menuToggle.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove("menu-open");

    });

}


/* ================= HEADER SCROLL EFFECT ================= */

function handleScroll() {

    const scrollPosition = window.scrollY;

    if (scrollPosition > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }


    /* Back to top button */

    if (scrollPosition > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}


window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
);

handleScroll();


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll(
    "main section[id]"
);


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 150;

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    `#${sectionId}`
                ) {
                    link.classList.add("active");
                }

            });

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


/* ================= BACK TO TOP ================= */

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ================= REVEAL ANIMATIONS ================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ================= FORM VALIDATION ================= */

function showError(input, message) {

    const formGroup =
        input.closest(".form-group");

    const errorMessage =
        formGroup.querySelector(".error-message");

    formGroup.classList.add("error");

    errorMessage.textContent = message;

}


function clearError(input) {

    const formGroup =
        input.closest(".form-group");

    const errorMessage =
        formGroup.querySelector(".error-message");

    formGroup.classList.remove("error");

    errorMessage.textContent = "";

}


/* Email validation */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


/* Validate one field */

function validateField(input) {

    const value = input.value.trim();

    clearError(input);


    /* Required text/select fields */

    if (
        input.hasAttribute("required") &&
        value === ""
    ) {

        showError(
            input,
            "This field is required."
        );

        return false;
    }


    /* Name validation */

    if (input.id === "fullName") {

        if (value.length < 2) {

            showError(
                input,
                "Please enter your full name."
            );

            return false;
        }

    }


    /* Email validation */

    if (input.id === "email") {

        if (!isValidEmail(value)) {

            showError(
                input,
                "Please enter a valid email address."
            );

            return false;
        }

    }


    return true;

}


/* Validate all form fields */

function validateForm() {

    const requiredFields =
        joinForm.querySelectorAll(
            "input[required], select[required]"
        );

    let valid = true;

    requiredFields.forEach(field => {

        if (!validateField(field)) {
            valid = false;
        }

    });


    return valid;

}


/* Live validation */

const formFields =
    joinForm.querySelectorAll(
        "input, select, textarea"
    );


formFields.forEach(field => {

    field.addEventListener(
        "blur",
        () => {

            if (
                field.hasAttribute("required") ||
                field.value.trim() !== ""
            ) {

                validateField(field);

            }

        }
    );


    field.addEventListener(
        "input",
        () => {

            if (
                field.closest(".form-group")
                    .classList.contains("error")
            ) {

                validateField(field);

            }

        }
    );

});


/* Form submission */

joinForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        successMessage.classList.remove("show");

        const isValid =
            validateForm();


        if (!isValid) {

            const firstError =
                joinForm.querySelector(
                    ".form-group.error input, " +
                    ".form-group.error select, " +
                    ".form-group.error textarea"
                );

            if (firstError) {

                firstError.focus();

            }

            return;

        }


        /*
         * No database is used.
         * This simulates a successful submission.
         */

        successMessage.classList.add("show");


        /* Reset form */

        joinForm.reset();


        /* Scroll success message into view */

        successMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


        /* Hide success message after 7 seconds */

        setTimeout(() => {

            successMessage.classList.remove(
                "show"
            );

        }, 7000);

    }
);


/* ================= CURRENT YEAR ================= */

currentYear.textContent =
    new Date().getFullYear();


/* ================= SMOOTH ANCHOR HANDLING ================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener(
        "click",
        event => {

            const targetId =
                anchor.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }


            event.preventDefault();


            const headerHeight =
                header.offsetHeight;

            const targetPosition =
                target.offsetTop -
                headerHeight;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        }
    );

});


/* ================= CARD TILT EFFECT ================= */

const cards =
    document.querySelectorAll(
        ".activity-card, .project-card"
    );


cards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            /* Disable effect on small screens */

            if (window.innerWidth < 800) {
                return;
            }


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) / centerY) * -2;


            const rotateY =
                ((x - centerX) / centerX) * 2;


            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* ================= ESCAPE KEY ================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            navMenu.classList.remove("open");

            menuToggle.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );

        }

    }
);
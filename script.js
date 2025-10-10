window.history.scrollRestoration = "manual"; // disable browser scroll restore
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

document.addEventListener("DOMContentLoaded", function () {

    new Swiper(".projects-swiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3.5 }
        }
    });

    document.querySelectorAll(".faq-item").forEach(item => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        question.addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            // Close all items
            document.querySelectorAll(".faq-item").forEach(faq => {
                faq.classList.remove("active");
                if (faq.querySelector(".faq-answer")) {
                    faq.querySelector(".faq-answer").style.maxHeight = null;
                }
            });
            // Toggle clicked item
            if (!isActive) {
                item.classList.add("active");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const tl = gsap.timeline();

    // Step 1: Fade out loader
    tl.to(loader, { opacity: 0, duration: 0.6 })
        .set(loader, { display: "none" });

    // Step 2: Fade in PIQOINNOVATION
    tl.to("#intro-logo", { opacity: 1, duration: 1 });

    // Step 3: Animate O to center with custom X
    const oLetter = document.querySelector(".o-letter");
    const oRect = oLetter.getBoundingClientRect();

    const centerY = window.innerHeight / 2;
    const offsetY = centerY - (oRect.top + oRect.height / 2);
    const customX = "-300%";

    tl.to(oLetter, {
        x: customX,
        y: offsetY,
        scale: 70,
        duration: 3,
        ease: "power4.inOut"
    });

    // Step 4: Fade out PIQOINNOVATION and reveal content
    tl.to("#intro-logo", { opacity: 0, duration: 0.5 }, "-=1.5");
    tl.to(
        ".header, .main, .Design-section, .projects-main-section, .faq-section, .quote-container, .footer-hero-section, .footer-section",
        { opacity: 1, duration: 1 },
        "-=1.5"
    );

    // Step 5: Animate rings
    const green = document.querySelector(".ring-green");
    const orange = document.querySelector(".ring-orange");
    const blue = document.querySelector(".ring-blue");

    tl.fromTo(green,
        { y: 200, scale: 0, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.5"
    )
        .fromTo(orange,
            { y: 0, scale: 0, opacity: 0 },
            { y: 0, scale: 1, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.5"
        )
        .fromTo(blue,
            { y: 0, scale: 0, opacity: 0 },
            { y: 0, scale: 1, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.5"
        );

    // Step 6: Move hero-visual + show hero-content
    tl.to(".hero-visual", {
        left: "0",
        duration: 1.5,
        ease: "power3.inOut"
    })
        .set(".hero-content", { visibility: "visible" })
        .to(".hero-content", {
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        }, "-=0.6");

    // ✅ Step 7: On scroll, pin hero & animate
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    // Ensure ring-blue is initially visible and small
    gsap.set(".ring-blue", { scale: 0.5, autoAlpha: 1, y: 0 });
    gsap.set(".ring-orange", { scale: 0.5, autoAlpha: 1, y: 0 });
    gsap.set(".ring-green", { scale: 0.5, autoAlpha: 1, y: 0 });

    gsap.timeline({
        scrollTrigger: {
            trigger: ".h-container",     // pin the hero section
            start: "top top",
            endTrigger: ".projectEntry",            // when hero hits top of viewport
            end: "+=2000",                // scroll distance (adjust as needed)
            scrub: 2,                 // link animation to scroll
            pin: true,                   // keep hero fixed during animation
            anticipatePin: 1
        }
    })
        .to(".hero-content", {
            opacity: 0,
            duration: 1
        })
        .to(".hero-visual", {
            left: "-14vw",
            duration: 1.5,
            ease: "power3.inOut"
        }, "<")

        .to(".hero-visual", {
            scale: 0.4,
            y: () => window.innerHeight - (document.querySelector(".hero-visual").offsetHeight * 0.5) - 80,
            duration: 2.5,
            ease: "power3.inOut",
            transformOrigin: "center center"
        })


        // ✅ Blue ring + background transition AFTER hero-visual moves
        .to(".ring-blue", {
            scale: 4.5,
            y: () => -window.innerHeight * 2, // offscreen
            autoAlpha: 0,
            duration: 2.5,
            ease: "power3.inOut"
        })
        .to(".bg-blue", { opacity: 1, duration: 2, ease: "power2.inOut" }, "<")
        .to(".bg-black", { opacity: 0, duration: 2, ease: "power2.inOut" }, "-=0.5", "<")
        .to(".blue-bg-section", {
            autoAlpha: 1,       // fade in smoothly
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
            onReverseComplete: () => {
                // hide on reverse smoothly
                gsap.set(".blue-bg-section", { opacity: "0" });
            }
        }, "-=1") // overlap with background transition


        // ✅ orange ring + background transition AFTER hero-visual moves
        .to(".ring-orange", {
            scale: 4.5,
            y: () => -window.innerHeight * 2, // offscreen
            autoAlpha: 0,
            duration: 2.5,
            ease: "power3.inOut"
        }, "=1.5")
        .to(".blue-bg-section", { opacity: "0" }, "<")
        .to(".bg-orange", { opacity: 1, duration: 2, ease: "power2.inOut" }, "<")
        .to(".bg-blue", { opacity: 0, duration: 2, ease: "power2.inOut" }, "-=0.5", "<")
        .to(".orange-bg-section", {
            autoAlpha: 1,       // fade in smoothly
            opacity: 1,   // show element
            duration: 1,
            ease: "power2.inOut",
            onReverseComplete: () => {
                // hide on reverse smoothly
                gsap.set(".orange-bg-section", { opacity: "0" });
            }
        }, "-=1") // overlap with background transition


        // ✅ orange ring + background transition AFTER hero-visual moves
        .to(".ring-green", {
            scale: 4.5,
            y: () => -window.innerHeight * 2, // offscreen
            autoAlpha: 0,
            duration: 2.5,
            ease: "power3.inOut"
        }, "=1.5")
        .to(".orange-bg-section", { opacity: "0" }, "<")
        .to(".bg-green", { opacity: 1, duration: 2, ease: "power2.inOut" }, "<")
        .to(".bg-orange", { opacity: 0, duration: 2, ease: "power2.inOut" }, "-=0.5", "<")
        .to(".green-bg-section", {
            autoAlpha: 1,       // fade in smoothly
            opacity: 1,   // show element
            duration: 1,
            ease: "power2.inOut",
            onReverseComplete: () => {
                // hide on reverse smoothly
                gsap.set(".green-bg-section", { opacity: "0" });
            }
        }, "-=1") // overlap with background transition

    // ✅ Black background stays from projectEntry until footer
    ScrollTrigger.create({
        trigger: ".projectEntry",
        start: "top center",             // when projectEntry reaches middle of viewport
        endTrigger: ".footer-section",   // keep until footer
        end: "bottom bottom",
        onEnter: () => {
            gsap.to(".bg-black", { opacity: 1, duration: 1.5, ease: "power2.inOut" });
            gsap.to(".bg-blue, .bg-orange, .bg-green", { opacity: 0, duration: 1.5, ease: "power2.inOut" });
        },
        onEnterBack: () => {
            gsap.to(".bg-black", { opacity: 1, duration: 1.5, ease: "power2.inOut" });
            gsap.to(".bg-blue, .bg-orange, .bg-green", { opacity: 0, duration: 1.5, ease: "power2.inOut" });
        }
    });



    gsap.to(".hero-visual", {
        scrollTrigger: {
            trigger: ".projectEntry",
            start: "top center",
            endTrigger: ".footer-section",
            end: "bottom bottom",
            toggleActions: "play reverse play reverse", // enter -> play, leave back -> reverse
        },
        x: -475.587,
        y: 623,
        scale: 0.58,
        duration: 2,
        ease: "power3.inOut",
        immediateRender: false // ensures reverse works properly
    });


    gsap.to(".hero-visual", {
        scrollTrigger: {
            trigger: ".faqEntry",
            start: "top center",
            endTrigger: ".footer-section",
            end: "bottom bottom",
            toggleActions: "play reverse play reverse", // enter -> play, leave back -> reverse
        },
        x: 451.587,
        y: 1288,
        scale: 0.58,
        duration: 2,
        ease: "power3.inOut",
        immediateRender: false // ensures reverse works properly
    });


    gsap.to(".hero-visual", {
        scrollTrigger: {
            trigger: ".quoteEntry",
            start: "top center",
            endTrigger: ".footer-section",
            end: "bottom bottom",
            toggleActions: "play reverse play reverse", // enter -> play, leave back -> reverse
        },
        x: 0,
        y: 1860,
        scale: 1.1,
        duration: 1.5,
        opacity: 0.5,
        ease: "power3.inOut",
        immediateRender: false // ensures reverse works properly
    });


    gsap.to(".hero-visual", {
        scrollTrigger: {
            trigger: ".footerEntry",
            start: "top center",
            endTrigger: ".footer-section",
            end: "bottom bottom",
            toggleActions: "play reverse play reverse", // enter -> play, leave back -> reverse
        },
        x: 0,
        y: 2500,
        opacity: 1,
        scale: 0.58,
        duration: 2,
        ease: "power3.inOut",
        immediateRender: false // ensures reverse works properly
    });


    // --- Vision Section Animation ---


    // gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const pointers = [
        { el: "#p1", start: 0.5, end: 1.8 },
        { el: "#p2", start: 0.35, end: 1.5 },
        { el: "#p3", start: 0.2, end: 1.3 }
    ];

    const contentBlock = document.querySelector("#vision-text");

    const contentData = [
        { title: "Vision", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio." },
        { title: "Mission", text: "Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet." },
        { title: "Our Values", text: "Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta." }
    ];

    // Reference: initial position of first pointer (center)
    const centerProgress = pointers[0].start;

    // Track last pointer index for forward/reverse scroll
    let lastTriggeredIndex = -1;

    // Get the SVG path and its total length
    const path = document.querySelector("#arcPath");
    const pathLength = path.getTotalLength();

    // Function to get x,y position along the path, allowing overshoot beyond 1
    function getPositionAlongPath(progress) {
        const distance = progress * pathLength; // can be > pathLength for overshoot
        const clampedDistance = Math.min(distance, pathLength);
        return path.getPointAtLength(clampedDistance);
    }

    // --- Timeline ---
    const tls = gsap.timeline({
        scrollTrigger: {
            trigger: ".vision-section",
            start: "top top",
            end: "+=500", // adjust scroll length for your design
            scrub: true,
            pin: true,
            anticipatePin: 1,
            onUpdate: self => {
                const tlProgress = self.progress; // 0 → 1
                let currentIndex = -1;

                // Move pointers and determine which pointer passed center
                pointers.forEach((p, i) => {
                    const pointerProgress = p.start + (p.end - p.start) * tlProgress;
                    const pos = getPositionAlongPath(pointerProgress);
                    gsap.set(p.el, { x: pos.x, y: pos.y });

                    if (pointerProgress >= centerProgress) currentIndex = i;
                });

                // Update text only if pointer index changed
                if (currentIndex !== lastTriggeredIndex && currentIndex !== -1) {
                    updateText(currentIndex);
                    lastTriggeredIndex = currentIndex;
                }

                // Handle scrolling back before first pointer
                if (tlProgress <= 0 && lastTriggeredIndex !== 0) {
                    updateText(0);
                    lastTriggeredIndex = 0;
                }
            },
            onRefresh: () => { lastTriggeredIndex = -1; }
        }
    });

    // Animate pointers along the path for rotation/align
    pointers.forEach(p => {
        tls.to(p.el, {
            motionPath: {
                path: "#arcPath",
                align: "#arcPath",
                alignOrigin: [0.5, 0.5],
                start: p.start,
                end: Math.min(p.end, 1), // motionPath cannot exceed 1 for rotation
                autoRotate: true
            },
            ease: "none"
        }, 0);
    });

    // --- Text update function ---
    function updateText(index) {
        gsap.to(contentBlock, {
            autoAlpha: 0,
            duration: 0.4,
            onComplete: () => {
                contentBlock.querySelector("h2").textContent = contentData[index].title;
                contentBlock.querySelector("p").textContent = contentData[index].text;
                gsap.to(contentBlock, { autoAlpha: 1, duration: 0.4 });
            }
        });
    }







});






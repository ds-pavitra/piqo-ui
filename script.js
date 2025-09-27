document.addEventListener("DOMContentLoaded", function () {

    new Swiper(".projects-swiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
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
    gsap.registerPlugin(ScrollTrigger);
    // Ensure ring-blue is initially visible and small
    gsap.set(".ring-blue", { scale: 0.5, autoAlpha: 1, y: 0 });
    gsap.set(".ring-orange", { scale: 0.5, autoAlpha: 1, y: 0 });
    gsap.set(".ring-green", { scale: 0.5, autoAlpha: 1, y: 0 });

    gsap.timeline({
        scrollTrigger: {
            trigger: ".h-container",     // pin the hero section
            start: "top top",            // when hero hits top of viewport
            end: "+=2000",                // scroll distance (adjust as needed)
            scrub: 3,                 // link animation to scroll
            pin: true,                   // keep hero fixed during animation
            anticipatePin: 1
        }
    })
        .to(".hero-content", {
            opacity: 0,
            duration: 1
        })
        .to(".hero-visual", {
            left: "-16vw",
            duration: 1.5,
            ease: "power3.inOut"
        }, "<")

        .to(".hero-visual", {
            scale: 0.4,
            y: () => window.innerHeight - (document.querySelector(".hero-visual").offsetHeight * 0.5) - 80,
            duration: 1.5,
            ease: "power3.inOut",
            transformOrigin: "center center"
        })


        // ✅ Blue ring + background transition AFTER hero-visual moves
        .to(".ring-blue", {
            scale: 4.5,
            y: () => -window.innerHeight * 2, // offscreen
            autoAlpha: 0,
            ease: "power3.inOut"
        })
        .to(".bg-blue", { opacity: 1, duration: 2, ease: "power2.inOut" }, "<")
        .to(".bg-black", { opacity: 0, duration: 2, ease: "power2.inOut" }, "-=0.5", "<")
        .to(".blue-bg-section", {
            autoAlpha: 1,       // fade in smoothly
            display: "block",   // show element
            duration: 1,
            ease: "power2.inOut",
            onReverseComplete: () => {
                // hide on reverse smoothly
                gsap.set(".blue-bg-section", { display: "none" });
            }
        }, "-=1") // overlap with background transition


        // ✅ orange ring + background transition AFTER hero-visual moves
        .to(".ring-orange", {
            scale: 4.5,
            y: () => -window.innerHeight * 2, // offscreen
            autoAlpha: 0,
            ease: "power3.inOut"
        }, "=1.5")
        .to(".blue-bg-section", { display: "none" }, "<")
        .to(".bg-orange", { opacity: 1, duration: 2, ease: "power2.inOut" }, "<")
        .to(".bg-blue", { opacity: 0, duration: 2, ease: "power2.inOut" }, "-=0.5", "<")
        .to(".orange-bg-section", {
            autoAlpha: 1,       // fade in smoothly
            display: "block",   // show element
            duration: 1,
            ease: "power2.inOut",
            onReverseComplete: () => {
                // hide on reverse smoothly
                gsap.set(".orange-bg-section", { display: "none" });
            }
        }, "-=1") // overlap with background transition


        // ✅ orange ring + background transition AFTER hero-visual moves
        .to(".ring-green", {
            scale: 4.5,
            y: () => -window.innerHeight * 2, // offscreen
            autoAlpha: 0,
            ease: "power3.inOut"
        }, "=1.5")
        .to(".orange-bg-section", { display: "none" }, "<")
        .to(".bg-green", { opacity: 1, duration: 2, ease: "power2.inOut" }, "<")
        .to(".bg-orange", { opacity: 0, duration: 2, ease: "power2.inOut" }, "-=0.5", "<")
        .to(".green-bg-section", {
            autoAlpha: 1,       // fade in smoothly
            display: "block",   // show element
            duration: 1,
            ease: "power2.inOut",
            onReverseComplete: () => {
                // hide on reverse smoothly
                gsap.set(".green-bg-section", { display: "none" });
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
});






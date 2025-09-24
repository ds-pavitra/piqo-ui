window.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate .mainPeacock to .peacockSecond position and size on scroll
    const mainPeacock = document.querySelector(".mainPeacock");
    const peacockSecond = document.querySelector(".peacockSecond");
    const peacockThird = document.querySelector(".peacockThird");

    if (mainPeacock && peacockSecond) {
        // Get initial and target bounding rects
        function getRects() {
            return {
                main: mainPeacock.getBoundingClientRect(),
                second: peacockSecond.getBoundingClientRect(),
            };
        }

        // Animate using GSAP quickTo for transform
        // Ensure mainPeacock stays above design backgrounds
        // Already absolutely positioned globally by CSS
        mainPeacock.style.zIndex = 2001;
        ScrollTrigger.create({
            trigger: ".section-entry",
            start: "top center",
            endTrigger: peacockSecond,
            end: "top center",
            scrub: true,
            onUpdate: self => {
                const { main, second } = getRects();
                // Target size for mainPeacock at peacockSecond: 250x250px
                // Target size and position for mainPeacock at peacockSecond
                const scaleX = 1; // We'll set width/height directly
                const scaleY = 1;
                const x = -102.043; // Use your provided transform values
                const y = 69.7451;
                const tx = x * self.progress;
                const ty = y * self.progress;
                const sx = 1 + (scaleX - 1) * self.progress;
                const sy = 1 + (scaleY - 1) * self.progress;
                // Interpolate position and size
                const currentWidth = 550 + (250 - 550) * self.progress;
                const currentHeight = 600 + (250 - 600) * self.progress;
                gsap.to(mainPeacock, {
                    transform: `translate(${x * self.progress}px, ${y * self.progress}px)`,
                    width: `${currentWidth}px`,
                    height: `${currentHeight}px`,
                    transformOrigin: "0% 0%",
                    zIndex: 2001,
                    duration: 0.1,
                    overwrite: true,
                });
            },
            onLeaveBack: () => {
                gsap.to(mainPeacock, {
                    transform: "translate(0%,0%)",
                    width: "550px",
                    height: "600px",
                    transformOrigin: "0% 0%",
                    zIndex: 2001,
                    duration: 0.3,
                    overwrite: true,
                });
            },
            onLeave: () => {
                const { main, second } = getRects();
                const scaleX = second.width / main.width;
                const scaleY = second.height / main.height;
                const x = second.left - main.left;
                const y = second.top - main.top;
                gsap.to(mainPeacock, {
                    transform: `translate(-102.043px, 69.7451px)`,
                    width: "250px",
                    height: "250px",
                    transformOrigin: "0% 0%",
                    zIndex: 2001,
                    duration: 0.3,
                    overwrite: true,
                });
            }
        });
    }
    // Animate .mainPeacock to .peacockThird position and size on .projectEntry scroll
    if (mainPeacock && peacockThird) {
        // You can adjust these values to match the visual position of peacockThird
        const targetX = -605; // Example: move more left
        const targetY = 0;  // Example: move down
        const startWidth = 250;
        const startHeight = 250;
        const endWidth = 300;
        const endHeight = 255;
        ScrollTrigger.create({
            trigger: ".projectEntry",
            start: "top center",
            endTrigger: peacockThird,
            end: "top center",
            scrub: true,
            onUpdate: self => {
                const tx = targetX * self.progress;
                const ty = targetY * self.progress;
                const currentWidth = startWidth + (endWidth - startWidth) * self.progress;
                const currentHeight = startHeight + (endHeight - startHeight) * self.progress;
                gsap.to(mainPeacock, {
                    transform: `translate(${tx}px, ${ty}px)`,
                    width: `${currentWidth}px`,
                    height: `${currentHeight}px`,
                    transformOrigin: "0% 0%",
                    zIndex: 2001,
                    duration: 0.1,
                    overwrite: true,
                });
            },
            onLeaveBack: () => {
                gsap.to(mainPeacock, {
                    transform: "translate(-102.043px, 69.7451px)",
                    width: "250px",
                    height: "250px",
                    transformOrigin: "0% 0%",
                    zIndex: 2001,
                    duration: 0.3,
                    overwrite: true,
                });
            },
            onLeave: () => {
                gsap.to(mainPeacock, {
                    transform: `translate(${targetX}px, ${targetY}px)`,
                    width: `${endWidth}px`,
                    height: `${endHeight}px`,
                    transformOrigin: "0% 0%",
                    zIndex: 2001,
                    duration: 0.3,
                    overwrite: true,
                });
            }
        });
    }

    const peacockFourth = document.querySelector('.peacockFourth');
    if (mainPeacock && peacockFourth) {
        const targetX = -700;
        const targetY = 120;
        const startWidth = 300;
        const startHeight = 255;
        const endWidth = 300;
        const endHeight = 255;
        ScrollTrigger.create({
            trigger: ".clinetsEntry",
            start: "top center",
            endTrigger: peacockFourth,
            end: "top center",
            scrub: true,
            onUpdate: self => {
                const tx = targetX * self.progress;
                const ty = targetY * self.progress;
                const currentWidth = startWidth + (endWidth - startWidth) * self.progress;
                const currentHeight = startHeight + (endHeight - startHeight) * self.progress;
                gsap.to(mainPeacock, {
                    transform: `translate(${tx}px, ${ty}px)`,
                    width: `${currentWidth}px`,
                    height: `${currentHeight}px`,
                    transformOrigin: "0% 0%",
                    zIndex: 2001,
                    duration: 0.1,
                    overwrite: true,
                });
            },
            onLeaveBack: () => {
                gsap.to(mainPeacock, {
                    transform: "translate(-605px, 100px)",
                    width: "300px",
                    height: "255px",
                    transformOrigin: "0% 0%",
                    zIndex: 2001,
                    duration: 0.3,
                    overwrite: true,
                });
            },
            onLeave: () => {
                gsap.to(mainPeacock, {
                    transform: `translate(${targetX}px, ${targetY}px)`,
                    width: `${endWidth}px`,
                    height: `${endHeight}px`,
                    transformOrigin: "0% 0%",
                    zIndex: 2001,
                    duration: 0.3,
                    overwrite: true,
                });
            }
        });
    }
    // Animate .mainPeacock to .peacockFifth position and size on FAQ section scroll
    const peacockFifth = document.querySelector('.peacockFifth');
    if (mainPeacock && peacockFifth) {
        const targetX = 200;
        const targetY = 120;
        const startWidth = 300;
        const startHeight = 255;
        const endWidth = 300;
        const endHeight = 255;
        ScrollTrigger.create({
            trigger: ".faq-section",
            start: "top center",
            endTrigger: peacockFifth,
            end: "top center",
            scrub: true,
            onUpdate: self => {
                const tx = targetX * self.progress;
                const ty = targetY * self.progress;
                const currentWidth = startWidth + (endWidth - startWidth) * self.progress;
                const currentHeight = startHeight + (endHeight - startHeight) * self.progress;
                gsap.to(mainPeacock, {
                    transform: `translate(${tx}px, ${ty}px)`,
                    width: `${currentWidth}px`,
                    height: `${currentHeight}px`,
                    transformOrigin: "0% 0%",
                    zIndex: 2001,
                    duration: 0.1,
                    overwrite: true,
                });
            },
            onLeaveBack: () => {
                gsap.to(mainPeacock, {
                    transform: "translate(-700px, 120px)",
                    width: "300px",
                    height: "255px",
                    transformOrigin: "0% 0%",
                    zIndex: 2001,
                    duration: 0.3,
                    overwrite: true,
                });
            },
            onLeave: () => {
                gsap.to(mainPeacock, {
                    transform: `translate(${targetX}px, ${targetY}px)`,
                    width: `${endWidth}px`,
                    height: `${endHeight}px`,
                    transformOrigin: "0% 0%",
                    zIndex: 2001,
                    duration: 0.3,
                    overwrite: true,
                });
            }
        });
    }

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

  // Center Y (still automatic)
  const centerY = window.innerHeight / 2;
  const offsetY = centerY - (oRect.top + oRect.height / 2);

  // Custom X adjustment (you can change this manually)
  const customX = "-300%"; // +100px to the right, -100px to the left, etc.


  // Animate
  tl.to(oLetter, {
    x: customX,     // use your custom X
    y: offsetY,     // still centered vertically
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
});



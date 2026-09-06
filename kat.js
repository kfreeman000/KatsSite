const mouseRipple = document.getElementById("ripple");
const cursorGlow = document.getElementById("cursor-glow");
const starfield = document.getElementById("starfield");
const RIPPLE_SIZE = 280;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function triggerRipple(x, y) {
    if (!mouseRipple) return;
    mouseRipple.style.setProperty("--ripple-x", `${x}px`);
    mouseRipple.style.setProperty("--ripple-y", `${y}px`);
    mouseRipple.style.setProperty("--ripple-size", `${RIPPLE_SIZE}px`);
    mouseRipple.style.animation = "none";
    void mouseRipple.offsetWidth;
    mouseRipple.style.animation = "rippleEffect 0.85s ease-out forwards";
}

function bounceArrow(id) {
    const arrow = document.getElementById(id);
    if (!arrow) return;

    let direction = 1;
    let position = 0;

    setInterval(() => {
        position += direction;
        if (position > 10 || position < 0) {
            direction *= -1;
        }
        arrow.style.transform = `translateY(${position}px)`;
    }, 30);
}

function initCursorGlow() {
    if (!cursorGlow || reduceMotion) return;
    window.addEventListener("pointermove", (event) => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    });
}

function initStarfield() {
    if (!starfield || reduceMotion) return;

    const ctx = starfield.getContext("2d");
    const stars = [];
    let width = 0;
    let height = 0;

    function resize() {
        width = starfield.width = window.innerWidth;
        height = starfield.height = window.innerHeight;
        stars.length = 0;
        const count = Math.min(180, Math.floor((width * height) / 14000));
        for (let i = 0; i < count; i += 1) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * 1.4 + 0.2,
                a: Math.random(),
                s: Math.random() * 0.015 + 0.004,
                drift: Math.random() * 0.15 + 0.02
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        stars.forEach((star) => {
            star.a += star.s;
            const alpha = 0.25 + Math.abs(Math.sin(star.a)) * 0.75;
            star.y += star.drift;
            if (star.y > height) star.y = 0;
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw();
}

function initParallax() {
    if (reduceMotion) return;
    const layers = document.querySelectorAll(".nebula, .planet");
    window.addEventListener("pointermove", (event) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 16;
        const y = (event.clientY / window.innerHeight - 0.5) * 12;
        layers.forEach((layer, index) => {
            const depth = (index + 1) * 0.35;
            layer.style.translate = `${x * depth}px ${y * depth}px`;
        });
    });
}

document.addEventListener("click", (event) => {
    triggerRipple(event.clientX, event.clientY);
});

if (mouseRipple) {
    mouseRipple.style.setProperty("--ripple-size", `${RIPPLE_SIZE}px`);
}

function initFlipCards() {
    document.querySelectorAll(".flip-card").forEach((card) => {
        card.addEventListener("click", (event) => {
            if (event.target.closest("a")) return;
            card.classList.toggle("is-flipped");
        });
    });
}

initCursorGlow();
initStarfield();
initParallax();
initFlipCards();
bounceArrow("arrow");

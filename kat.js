const mouseRipple = document.getElementById("ripple");
const RIPPLE_SIZE = 200;

function wiggleBackground(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    mouseRipple.style.setProperty('--ripple-x', `${mouseX}px`);
    mouseRipple.style.setProperty('--ripple-y', `${mouseY}px`);
    mouseRipple.style.setProperty('--ripple-size', `${RIPPLE_SIZE}px`);

    mouseRipple.style.animation = 'none';
    void mouseRipple.offsetWidth;
    mouseRipple.style.animation = 'rippleEffect 0.7s ease-out forwards';
}

document.addEventListener('mousemove', wiggleBackground);

mouseRipple.style.setProperty('--ripple-size', `${RIPPLE_SIZE}px`);
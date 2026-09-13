let activeAnimationTimers = [];

function animateSteps(steps, containerId, delay = 500) {
    // Clear any pending animation timers from previous calculations
    activeAnimationTimers.forEach(id => clearTimeout(id));
    activeAnimationTimers = [];

    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";

    steps.forEach((step, index) => {
        const timerId = setTimeout(() => {
            const p = document.createElement("p");
            if (typeof step === "string" && (step.startsWith("<") || step.includes("<span") || step.includes("<code") || step.includes("<strong"))) {
                p.innerHTML = step;
            } else {
                p.innerText = step;
            }
            p.classList.add("step-animate");
            container.appendChild(p);
        }, index * delay);
        activeAnimationTimers.push(timerId);
    });
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { animateSteps };
}

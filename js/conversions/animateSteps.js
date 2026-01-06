function animateSteps(steps, containerId, delay = 800) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    steps.forEach((step, index) => {
        setTimeout(() => {
            const p = document.createElement("p");
            p.innerText = step;
            p.classList.add("step-animate");
            container.appendChild(p);
        }, index * delay);
    });
}

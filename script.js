const startBtn = document.getElementById("startBtn");
const overlay = document.getElementById("soundOverlay");
const video = document.getElementById("videoBg");
const musica = document.getElementById("musicaBg");
const intro = document.getElementById("intro");
const main = document.getElementById("main");

/* INICIO */
startBtn.addEventListener("click", () => {

    video.muted = false;
    video.play();

    overlay.classList.add("hidden");
    intro.classList.remove("hidden");

    video.onended = function () {
        musica.currentTime = 18;
        musica.play();
    };

    setTimeout(() => {
        intro.style.display = "none";
        main.classList.remove("hidden");
    }, 3000);
});

/* COUNTDOWN */
const eventDate = new Date("March 13, 2026 19:00:00").getTime();
let fireworksStarted = false;

setInterval(() => {

    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {

        document.getElementById("eventMessage").innerHTML =
            "🎉 ¡Hoy es el gran día! 🎉";

        if (!fireworksStarted) {
            startFireworks();
            fireworksStarted = true;
        }

        return;
    }

    document.getElementById("days").innerHTML =
        Math.floor(distance / (1000 * 60 * 60 * 24));

    document.getElementById("hours").innerHTML =
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    document.getElementById("minutes").innerHTML =
        Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("seconds").innerHTML =
        Math.floor((distance % (1000 * 60)) / 1000);

}, 1000);

/* PARTICULAS */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

for (let i = 0; i < 60; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5
    });
}

function animateParticles(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {

        p.y -= p.speed;
        if (p.y < 0) p.y = canvas.height;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}
animateParticles();

/* FUEGOS */
function startFireworks(){

    const fwCanvas = document.getElementById("fireworks");
    const fwCtx = fwCanvas.getContext("2d");

    fwCanvas.width = window.innerWidth;
    fwCanvas.height = window.innerHeight;

    let fireworks = [];

    function createFirework(){

        let x = Math.random() * fwCanvas.width;
        let y = Math.random() * fwCanvas.height / 2;

        for (let i = 0; i < 30; i++) {

            fireworks.push({
                x: x,
                y: y,
                radius: 2,
                color: `hsl(${Math.random() * 360},100%,50%)`,
                speedX: (Math.random() - 0.5) * 6,
                speedY: (Math.random() - 0.5) * 6,
                life: 100
            });
        }
    }

    function animateFireworks(){

        fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);

        fireworks.forEach((p, index) => {

            p.x += p.speedX;
            p.y += p.speedY;
            p.life--;

            fwCtx.beginPath();
            fwCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            fwCtx.fillStyle = p.color;
            fwCtx.fill();

            if (p.life <= 0) fireworks.splice(index, 1);
        });

        requestAnimationFrame(animateFireworks);
    }

    setInterval(createFirework, 800);
    animateFireworks();
}

/* BOTÓN FORMULARIO */
const rsvpBtn = document.getElementById("rsvpBtn");

if (rsvpBtn) {
    rsvpBtn.addEventListener("click", function () {
        window.open("https://form.jotform.com/260598051895065", "_blank");
    });
}
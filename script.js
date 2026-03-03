document.addEventListener('DOMContentLoaded', () => {
    const initial = document.getElementById('initial-screen');
    const curtains = document.getElementById('curtain-container');
    const main = document.getElementById('main-content');
    const startBtn = document.getElementById('start-btn');
    const musicBtn = document.getElementById('music-btn');
    const audio = document.getElementById('bg-music');

    startBtn.addEventListener('click', () => {
        initial.classList.add('hidden');
        setTimeout(() => {
            curtains.classList.add('open');
            setTimeout(() => {
                curtains.style.display = 'none';
                main.classList.add('visible');
                confetti({ particleCount: 140, spread: 100, origin: { y: 0.6 } });
                audio.volume = 0.4;
                audio.play().catch(() => {});
            }, 3200);
        }, 100);
    });

    musicBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            musicBtn.textContent = 'Pausar Música';
        } else {
            audio.pause();
            musicBtn.textContent = 'Reproducir Música';
        }
    });

    // Fecha actualizada: viernes 13 de marzo 2026 - 20:00
    const target = new Date('2026-03-13T20:00:00-05:00').getTime();
    function timer() {
        const diff = target - Date.now();
        if (diff < 0) {
            document.querySelector('.countdown').innerHTML = '<p style="font-size:2.5rem;color:#ffd700;">¡Llegó el día! 🎉</p>';
            return;
        }
        document.getElementById('days').textContent = Math.floor(diff / 86400000);
        document.getElementById('hours').textContent = Math.floor((diff % 86400000) / 3600000);
        document.getElementById('minutes').textContent = Math.floor((diff % 3600000) / 60000);
        document.getElementById('seconds').textContent = Math.floor((diff % 60000) / 1000);
    }
    setInterval(timer, 1000);
    timer();
});
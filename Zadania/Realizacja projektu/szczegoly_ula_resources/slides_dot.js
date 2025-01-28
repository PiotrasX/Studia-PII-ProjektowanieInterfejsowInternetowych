document.addEventListener('DOMContentLoaded', () => {
    ustawAktualnySlajd(1);
});

window.addEventListener('resize', () => {
    if (!czyAnimacjaAktywna) pokazSlajd(aktualnySlajd);
    else pokazSlajd(aktualnySlajd, true);
});

let aktualnySlajd = 1;
let liczbaSlajdow = document.querySelectorAll('#slides-1 .slides-div').length;
let czyAnimacjaAktywna = false;

function ustawAktualnySlajd(n) {
    aktualnySlajd = n > liczbaSlajdow ? 1 : n < 1 ? liczbaSlajdow : n;
    pokazSlajd(aktualnySlajd, true);
    aktualizujDoty(aktualnySlajd);
}

function pokazSlajd(n, zAnimacja = false) {
    const kontenerSlajdow = document.querySelector('#slides-1');
    const szerokoscSlajdu = kontenerSlajdow.querySelector('.slides-div').offsetWidth;
    const styl = window.getComputedStyle(kontenerSlajdow);
    const gap = parseFloat(styl.columnGap) || 0;
    const przesuniecie = -(szerokoscSlajdu + gap) * (n - 1);

    kontenerSlajdow.style.transition = zAnimacja ? 'transform 500ms ease' : 'none';
    kontenerSlajdow.style.transform = `translateX(${przesuniecie}px)`;

    if (zAnimacja) {
        czyAnimacjaAktywna = true;
        kontenerSlajdow.addEventListener('transitionend', () => {
            czyAnimacjaAktywna = false;
        }, { once: true });
    }
}

function aktualizujDoty(aktywnyNumer) {
    const doty = document.querySelectorAll('#dot-div-1 .dot');
    doty.forEach((dot, index) => {
        dot.classList.toggle('aktywny', index === aktywnyNumer - 1);
    });
}

const kontener = document.querySelector('.slides-border-container');
let startX;
let aktywnyKontener = null; 

kontener.addEventListener('mouseenter', () => {
    aktywnyKontener = kontener;
});

kontener.addEventListener('mouseleave', () => {
    aktywnyKontener = null;
});

kontener.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    e.preventDefault();
});

kontener.addEventListener('mouseup', (e) => {
    const koniecX = e.clientX;
    const odleglosc = startX - koniecX;
    const kierunek = odleglosc > 0 ? 1 : -1;
    if (Math.abs(odleglosc) > 50) zmienSlajd(kierunek);
});

kontener.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    e.preventDefault();
});

kontener.addEventListener('touchend', (e) => {
    const koniecX = e.changedTouches[0].clientX;
    const odleglosc = startX - koniecX;
    const kierunek = odleglosc > 0 ? 1 : -1;
    if (Math.abs(odleglosc) > 50) zmienSlajd(kierunek);
});

document.addEventListener('keydown', (event) => {
    if (aktywnyKontener && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
        const kierunek = event.key === 'ArrowRight' ? 1 : -1;
        zmienSlajd(kierunek);
    }
});

function zmienSlajd(kierunek) {
    ustawAktualnySlajd(aktualnySlajd + kierunek);
}

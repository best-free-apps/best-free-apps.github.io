// =========================================================
// ПЛАВНАЯ ПРОКРУТКА
// =========================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        const href = this.getAttribute('href');

        // "#" используется для пока неактивной кнопки Google Play.
        if (!href || href === '#') {
            return;
        }

        const target = document.querySelector(href);

        if (target) {

            e.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        }

    });

});


// =========================================================
// АНИМАЦИЯ ЭЛЕМЕНТОВ ПРИ ПРОКРУТКЕ
// =========================================================

const animatedElements = document.querySelectorAll(
    '.feature-card, ' +
    '.screenshot-card, ' +
    '.stat-item, ' +
    '.network-chips span'
);


const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
).matches;


if (!prefersReducedMotion && 'IntersectionObserver' in window) {

    const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    };


    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                observer.unobserve(entry.target);

            }

        });

    }, observerOptions);


    animatedElements.forEach((element, index) => {

        element.style.opacity = '0';

        element.style.transform = 'translateY(25px)';

        element.style.transition =
            'opacity 0.6s ease, transform 0.6s ease';

        const delay = (index % 6) * 50;

        element.style.transitionDelay = `${delay}ms`;

        observer.observe(element);

    });

} else {

    animatedElements.forEach(element => {

        element.style.opacity = '1';
        element.style.transform = 'none';

    });

}


// =========================================================
// ПОДСВЕТКА АКТИВНОГО ПРИЛОЖЕНИЯ В МЕНЮ
// =========================================================

const metroSection = document.querySelector('#metro');
const trainsSection = document.querySelector('#trains');

const metroNavLink = document.querySelector(
    '.app-nav a[href="#metro"]'
);

const trainsNavLink = document.querySelector(
    '.app-nav a[href="#trains"]'
);


function updateNavigation() {

    if (
        !metroSection ||
        !trainsSection ||
        !metroNavLink ||
        !trainsNavLink
    ) {
        return;
    }


    const scrollPosition =
        window.scrollY + (window.innerHeight * 0.35);


    const metroTop = metroSection.offsetTop;
    const trainsTop = trainsSection.offsetTop;


    // Пока пользователь находится во вступительном блоке,
    // активные пункты меню не показываем.

    if (scrollPosition < metroTop) {

        metroNavLink.classList.remove('active');
        trainsNavLink.classList.remove('active');

        return;
    }


    // Раздел электричек Москвы

    if (scrollPosition >= trainsTop) {

        metroNavLink.classList.remove('active');
        trainsNavLink.classList.add('active');

        return;
    }


    // Раздел метро Санкт-Петербурга

    metroNavLink.classList.add('active');
    trainsNavLink.classList.remove('active');

}


window.addEventListener(
    'scroll',
    updateNavigation,
    { passive: true }
);


window.addEventListener(
    'resize',
    updateNavigation
);


updateNavigation();
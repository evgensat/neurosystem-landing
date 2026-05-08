/* НейроСистема · основной JS лендинга */
/* Подключается через CDN на любой странице с .ns-app */

/* НЕЙРОСИСТЕМА — JAVASCRIPT */

// ============================================
// ЗВЁЗДНОЕ НЕБО В HERO
// ============================================
function createStars() {
    const container = document.getElementById('stars');
    if (!container) return;
    const count = 50;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (2 + Math.random() * 2) + 's';
        container.appendChild(star);
    }
}
createStars();

// ============================================
// ПРОГРЕСС-БАР СКРОЛЛА
// ============================================
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / docHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ============================================
// SCROLL REVEAL
// ============================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
    revealObserver.observe(el);
});

// ============================================
// АНИМИРОВАННЫЕ СЧЁТЧИКИ В TRUST BAR
// ============================================
const trustBar = document.querySelector('.trust-bar');
if (trustBar) {
    const initialNumbers = trustBar.querySelectorAll('.trust-item-number');
    const targets = [];
    initialNumbers.forEach(numEl => {
        targets.push(parseInt(numEl.textContent, 10));
        numEl.textContent = '0';
    });

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('.trust-item-number');
                numbers.forEach((numEl, index) => {
                    const target = targets[index];
                    setTimeout(() => {
                        numEl.classList.add('counting');
                        const duration = 1600;
                        const start = performance.now();
                        function updateCount(now) {
                            const elapsed = now - start;
                            const progress = Math.min(elapsed / duration, 1);
                            const eased = 1 - Math.pow(1 - progress, 3);
                            const current = Math.floor(target * eased);
                            numEl.textContent = current;
                            if (progress < 1) {
                                requestAnimationFrame(updateCount);
                            } else {
                                numEl.textContent = target;
                                numEl.classList.remove('counting');
                                numEl.classList.add('flash');
                                setTimeout(() => numEl.classList.remove('flash'), 800);
                            }
                        }
                        requestAnimationFrame(updateCount);
                    }, index * 200);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    counterObserver.observe(trustBar);
}

// ============================================
// АККОРДЕОНЫ
// ============================================
function toggleStep(header) {
    const card = header.closest('.step-card');
    card.classList.toggle('open');
}

function toggleFaq(question) {
    const item = question.closest('.faq-item');
    item.classList.toggle('open');
}

// ============================================
// ТАЙМЕР
// ============================================
const endDate = new Date();
endDate.setDate(endDate.getDate() + 7);
endDate.setHours(23, 59, 59, 0);

function updateTimer() {
    const now = new Date().getTime();
    const distance = endDate.getTime() - now;

    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateTimer();
setInterval(updateTimer, 1000);

// ============================================
// EXIT-INTENT POPUP
// ============================================
const exitPopup = document.getElementById('exitPopup');
let popupShown = false;

document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0 && !popupShown) {
        popupShown = true;
        exitPopup.classList.add('visible');
    }
});

if (/Mobi|Android/i.test(navigator.userAgent)) {
    setTimeout(() => {
        if (!popupShown) {
            popupShown = true;
            exitPopup.classList.add('visible');
        }
    }, 60000);
}

function closePopup() {
    exitPopup.classList.remove('visible');
}

exitPopup.addEventListener('click', (e) => {
    if (e.target === exitPopup) {
        closePopup();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// ============================================
// ПРИНУДИТЕЛЬНОЕ ПРИМЕНЕНИЕ INTER
// ============================================
function forceInterFont() {
    const sections = [
        '.hero', '.trust-bar', '.problem', '.journey', '.program',
        '.differences', '.author', '.fit', '.neuroclub', '.tariffs',
        '.pilot', '.faq', '.guarantees', '.final-cta',
        '.popup', '.sticky-cta'
    ];
    const interFamily = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

    sections.forEach(selector => {
        document.querySelectorAll(selector).forEach(section => {
            section.style.setProperty('font-family', interFamily, 'important');
            section.querySelectorAll('*').forEach(el => {
                if (!el.classList.contains('popup-promo-code')) {
                    el.style.setProperty('font-family', interFamily, 'important');
                }
            });
        });
    });

    document.querySelectorAll(
        '.hero h1, .hero h2, ' +
        '.problem h2, .journey h2, .program h2, .differences h2, ' +
        '.author h2, .fit h2, .neuroclub h2, .tariffs h2, ' +
        '.pilot h2, .faq h2, .guarantees h2, .final-cta h2, ' +
        '.section-title, .hero-title, .author-name'
    ).forEach(el => {
        el.style.setProperty('font-weight', '800', 'important');
    });

    document.querySelectorAll(
        '.hero h3, .problem h3, .journey h3, .program h3, ' +
        '.differences h3, .author h3, .fit h3, .neuroclub h3, ' +
        '.tariffs h3, .pilot h3, .faq h3, .guarantees h3, .final-cta h3'
    ).forEach(el => {
        el.style.setProperty('font-weight', '700', 'important');
    });

    document.querySelectorAll('.popular-badge').forEach(el => {
        el.style.setProperty('font-weight', '800', 'important');
        el.style.setProperty('white-space', 'nowrap', 'important');
    });

    document.querySelectorAll(
        '.tariff-name, .author-tag, .pilot-badge, .version-label'
    ).forEach(el => {
        el.style.setProperty('font-weight', '700', 'important');
    });

    document.querySelectorAll('.final-content').forEach(el => {
        el.style.setProperty('display', 'flex', 'important');
        el.style.setProperty('flex-direction', 'column', 'important');
        el.style.setProperty('align-items', 'center', 'important');
        el.style.setProperty('justify-content', 'center', 'important');
        el.style.setProperty('text-align', 'center', 'important');
        el.style.setProperty('width', '100%', 'important');
        el.style.setProperty('max-width', '1100px', 'important');
        el.style.setProperty('margin-left', 'auto', 'important');
        el.style.setProperty('margin-right', 'auto', 'important');
    });

    document.querySelectorAll('.final-author').forEach(el => {
        el.style.setProperty('display', 'flex', 'important');
        el.style.setProperty('flex-direction', 'row', 'important');
        el.style.setProperty('align-items', 'center', 'important');
        el.style.setProperty('justify-content', 'center', 'important');
        el.style.setProperty('width', 'fit-content', 'important');
        el.style.setProperty('margin', '40px auto 0 auto', 'important');
        el.style.setProperty('align-self', 'center', 'important');
    });

    document.querySelectorAll('.final-statement, .final-fineprint, .final-cta h2').forEach(el => {
        el.style.setProperty('text-align', 'center', 'important');
        el.style.setProperty('margin-left', 'auto', 'important');
        el.style.setProperty('margin-right', 'auto', 'important');
    });
}

document.addEventListener('DOMContentLoaded', forceInterFont);
window.addEventListener('load', () => {
    forceInterFont();
    setTimeout(forceInterFont, 500);
    setTimeout(forceInterFont, 1500);
});

// ============================================
// ОБЁРТКА .author-facts li ТЕКСТА В <span>
// ============================================
function wrapAuthorFactsText() {
    document.querySelectorAll('.author-facts li').forEach(li => {
        if (li.querySelector('.fact-text')) return;

        const wrapper = document.createElement('span');
        wrapper.className = 'fact-text';
        wrapper.style.flex = '1';
        wrapper.style.minWidth = '0';
        wrapper.style.lineHeight = 'inherit';

        const nodesToMove = Array.from(li.childNodes).filter(node => {
            return !(node.nodeType === 1 && (node.tagName === 'svg' || node.tagName === 'SVG' || node.tagName.toLowerCase() === 'svg'));
        });
        nodesToMove.forEach(node => wrapper.appendChild(node));

        li.appendChild(wrapper);
    });
}

document.addEventListener('DOMContentLoaded', wrapAuthorFactsText);
window.addEventListener('load', wrapAuthorFactsText);

// ============================================
// НАВИГАЦИЯ
// ============================================
function initNavMenu() {
    const burger = document.getElementById('navBurger');
    const mobileMenu = document.getElementById('navMobileMenu');
    const mobileLinks = document.querySelectorAll('.nav-mobile-link, .nav-mobile-cta');

    if (!burger || !mobileMenu) return;

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            mobileMenu.classList.remove('open');
        });
    });

    document.addEventListener('click', (e) => {
        if (!burger.contains(e.target) && !mobileMenu.contains(e.target)) {
            burger.classList.remove('active');
            mobileMenu.classList.remove('open');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            burger.classList.remove('active');
            mobileMenu.classList.remove('open');
        }
    });
}

document.addEventListener('DOMContentLoaded', initNavMenu);

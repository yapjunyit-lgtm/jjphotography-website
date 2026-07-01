/* ============================================================
   LUMEN SHARED SCRIPTS
   Custom cursor, scroll progress, nav, reveal animations,
   mobile menu, navbar scroll effect, and preloader.
   Shared across all pages of JJ Photography.
   ============================================================ */

/* ── Custom Cursor ────────────────────────────────── */
(function() {
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursorDot');
    if (!cursor || !cursorDot) return;

    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Enlarge cursor on hoverable elements
    var hoverTargets = document.querySelectorAll(
        'a, button, .gallery-item, .service-card, .filter-btn, ' +
        '.testimonial-btn, .testimonial-dot, .nav-dot, .hamburger, ' +
        'input, select, textarea, .pricing-card, .contact-card, .portfolio-item'
    );
    hoverTargets.forEach(function(el) {
        el.addEventListener('mouseenter', function() { cursor.classList.add('hover'); });
        el.addEventListener('mouseleave', function() { cursor.classList.remove('hover'); });
    });
})();

/* ── Scroll Progress Bar ──────────────────────────── */
(function() {
    var bar = document.getElementById('scrollProgress');
    if (!bar) return;
    window.addEventListener('scroll', function() {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = progress + '%';
    });
})();

/* ── Scroll Reveal (Intersection Observer) ────────── */
(function() {
    var revealEls = document.querySelectorAll('.reveal-on-scroll');
    if (!revealEls.length) return;
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el) { observer.observe(el); });
})();

/* ── Navbar Scroll Effect ─────────────────────────── */
(function() {
    var navbar = document.getElementById('mainNav');
    if (!navbar) return;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
})();

/* ── Mobile Menu ──────────────────────────────────── */
(function() {
    var btn = document.getElementById('hamburgerBtn');
    var menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;

    btn.addEventListener('click', function() {
        btn.classList.toggle('active');
        menu.classList.toggle('open');
        document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });

    var links = menu.querySelectorAll('a');
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            btn.classList.remove('active');
            menu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
})();

/* ── Preloader ────────────────────────────────────── */
(function() {
    var preloader = document.getElementById('preloader');
    if (!preloader) return;
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 1000);
    });
})();

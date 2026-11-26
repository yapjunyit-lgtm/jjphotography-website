/* ============================================================
   LUMEN SHARED SCRIPTS
   Scroll progress, scroll reveal, navbar effect, mobile menu.
   Shared across all pages of JJ Photography.
   ============================================================ */

/* ── Scroll Progress Bar ──────────────────────────── */
(function() {
    var bar = document.getElementById('scrollProgress');
    if (!bar) return;
    window.addEventListener('scroll', function() {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = progress + '%';
    }, { passive: true });
})();

/* ── Scroll Reveal (Intersection Observer) ────────── */
(function() {
    var revealEls = document.querySelectorAll('.reveal-on-scroll');
    if (!revealEls.length) return;
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
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
    }, { passive: true });
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

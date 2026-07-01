// Hamburger menu toggle
(function() {
    var hamburger = document.querySelector('.hamburger');
    var navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('show');
        });
    }
})();

// Lightbox for portfolio images and videos
(function() {
    var portfolioItems = document.querySelectorAll('.portfolio-item');
    if (!portfolioItems.length) return;

    // Create lightbox DOM
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML =
        '<span class="lightbox-close">&times;</span>' +
        '<button class="lightbox-prev" aria-label="Previous">&lsaquo;</button>' +
        '<button class="lightbox-next" aria-label="Next">&rsaquo;</button>' +
        '<div class="lightbox-content"></div>' +
        '<p class="lightbox-caption"></p>';
    document.body.appendChild(lightbox);

    var lightboxContent = lightbox.querySelector('.lightbox-content');
    var lightboxCaption = lightbox.querySelector('.lightbox-caption');
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var prevBtn = lightbox.querySelector('.lightbox-prev');
    var nextBtn = lightbox.querySelector('.lightbox-next');
    var currentIndex = -1;
    var visibleItems = [];

    function getVisibleItems() {
        var items = document.querySelectorAll('.portfolio-item');
        visibleItems = [];
        for (var i = 0; i < items.length; i++) {
            if (items[i].style.display !== 'none') {
                visibleItems.push(items[i]);
            }
        }
    }

    function openLightbox(index) {
        getVisibleItems();
        currentIndex = index;
        var item = visibleItems[index];
        var caption = item.querySelector('.portfolio-overlay p');
        var videoId = item.getAttribute('data-video-id');
        lightboxCaption.textContent = caption ? caption.textContent : '';

        if (videoId) {
            // Video item: show YouTube embed
            lightboxContent.innerHTML =
                '<iframe src="https://www.youtube.com/embed/' + videoId +
                '?autoplay=1&rel=0" frameborder="0"' +
                ' allow="autoplay; encrypted-media" allowfullscreen' +
                ' class="lightbox-video"></iframe>';
        } else {
            // Photo item: show image
            var img = item.querySelector('.portfolio-image');
            lightboxContent.innerHTML =
                '<img src="' + img.src + '" alt="' + img.alt + '" class="lightbox-img">';
        }

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateNavButtons();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxContent.innerHTML = '';
        currentIndex = -1;
    }

    function showPrev() {
        getVisibleItems();
        if (currentIndex > 0) {
            openLightbox(currentIndex - 1);
        }
    }

    function showNext() {
        getVisibleItems();
        if (currentIndex < visibleItems.length - 1) {
            openLightbox(currentIndex + 1);
        }
    }

    function updateNavButtons() {
        prevBtn.style.display = currentIndex > 0 ? 'block' : 'none';
        nextBtn.style.display = currentIndex < visibleItems.length - 1 ? 'block' : 'none';
    }

    // Click handler on portfolio items
    for (var i = 0; i < portfolioItems.length; i++) {
        (function(idx) {
            var wrapper = portfolioItems[idx].querySelector('.portfolio-image-wrapper');
            if (wrapper) {
                wrapper.style.cursor = 'pointer';
                wrapper.addEventListener('click', function(e) {
                    getVisibleItems();
                    for (var j = 0; j < visibleItems.length; j++) {
                        if (visibleItems[j] === portfolioItems[idx]) {
                            openLightbox(j);
                            break;
                        }
                    }
                });
            }
        })(i);
    }

    // Close handlers
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });

    // Navigation
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showPrev();
    });
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showNext();
    });

    // Keyboard
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
})();

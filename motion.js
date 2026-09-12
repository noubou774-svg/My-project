/**
 * Learnivia — lightweight scroll reveal (Emil: scroll reveal, reduced-motion safe)
 * Backend handoff: no dependencies, optional enhancement only.
 */
(function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var selectors = [
        '.creator',
        '.programs-section',
        '.peer',
        '.real-stories',
        '.how-space',
        '.certification-wrap',
        '.learnivia-blog',
        '.learnivia-faq'
    ];

    var nodes = [];
    selectors.forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el) {
            el.classList.add('lv-reveal');
            nodes.push(el);
        });
    });

    if (!nodes.length || !('IntersectionObserver' in window)) {
        nodes.forEach(function (el) { el.classList.add('is-visible'); });
        return;
    }

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { rootMargin: '-40px 0px -40px 0px', threshold: 0.12 }
    );

    nodes.forEach(function (el) { observer.observe(el); });
})();

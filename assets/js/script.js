

// ===== Scroll con flecha intro =====
document.getElementById('scrollArrow')?.addEventListener('click', function (e) {
  e.preventDefault();
  const target = document.getElementById('gallery-section');
  if (target) {
    window.scrollTo({
      top: target.offsetTop,
      behavior: 'smooth'
    });
  }
});

// ===== Animaciones con IntersectionObserver =====
document.addEventListener('DOMContentLoaded', () => {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        
        // Primera galería (.animate-img)
        if (entry.target.classList.contains('animate-img')) {
          setTimeout(() => entry.target.classList.add('show'), index * 150);
        }

        // Segunda galería (.scroll-photo)
        else if (entry.target.classList.contains('scroll-photo')) {
          setTimeout(() => entry.target.classList.add('visible'), index * 150);
        }

        // Elementos ocultos generales (.hidden)
        else if (entry.target.classList.contains('hidden')) {
          entry.target.classList.add('show');
        }

        // Nuevas secciones (.reveal, .location-head, .map-card, .map-actions, .contact-card)
        else if (
          entry.target.classList.contains('reveal') ||
          entry.target.classList.contains('location-head') ||
          entry.target.classList.contains('map-card') ||
          entry.target.classList.contains('map-actions') ||
          entry.target.classList.contains('contact-card')
        ) {
          const delay = entry.target.style.getPropertyValue('--d') || (index * 0.07 + 's');
          entry.target.style.transitionDelay = delay;
          entry.target.classList.add('is-inview');
        }

        // Deja de observar el elemento ya animado
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });

  // Elementos a observar
  const galleryImgs = document.querySelectorAll('.animate-img, .scroll-photo');
  const hiddenEls   = document.querySelectorAll('.hidden');
  const newEls      = document.querySelectorAll('.reveal, .location-head, .map-card, .map-actions, .contact-card');

  [...galleryImgs, ...hiddenEls, ...newEls].forEach(el => revealObserver.observe(el));
});





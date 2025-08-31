


  //flecha h1 intro//

   document.getElementById('scrollArrow').addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.getElementById('gallery-section');
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    }
  });

document.addEventListener('DOMContentLoaded', () => {
  // IntersectionObserver para galerías y elementos hidden
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Diferencia entre animate-img y scroll-photo
        if (entry.target.classList.contains('animate-img')) {
          // Primera galería: usa .show
          setTimeout(() => entry.target.classList.add('show'), index * 150);
        } else if (entry.target.classList.contains('scroll-photo')) {
          // Segunda galería: usa .visible
          setTimeout(() => entry.target.classList.add('visible'), index * 150);
        } else if (entry.target.classList.contains('hidden')) {
          // Elementos hidden: también usan .show
          entry.target.classList.add('show');
        }
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  // Seleccionamos todos los elementos a animar
  const galleryImgs = document.querySelectorAll('.animate-img, .scroll-photo');
  const hiddenEls = document.querySelectorAll('.hidden');

  galleryImgs.forEach(el => revealObserver.observe(el));
  hiddenEls.forEach(el => revealObserver.observe(el));
});

    








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

// Observer exclusivo para la galería con animación suave
const galleryObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Añade un delay para que no entren todas juntas
      setTimeout(() => {
        entry.target.classList.add('show');
      }, index * 150); // 150ms entre cada imagen

      galleryObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-img').forEach(img => {
  galleryObserver.observe(img);
});

//ANIMACIOS AL HACER SCROLL EN CARRUSEL + INTRO//
    const observers = document.querySelectorAll('.fade-up, .fade-side');

    const options = {
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, options);

    observers.forEach(el => observer.observe(el));

    
//GALERÍA RANDOM SCROLL // 
document.addEventListener("scroll", () => {
  document.querySelectorAll(".gallery-random .photo").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
});
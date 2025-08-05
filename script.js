// Mostrar sección al hacer scroll
  const heroOffset = document.querySelector('.hero-offset');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        heroOffset.classList.add('show');

        // Activar animaciones internas
        const texts = heroOffset.querySelectorAll('.text-block h2, .text-block p');
        texts.forEach(el => {
          el.style.animationDelay = el.dataset?.delay || '0s';
        });

        observer.unobserve(heroOffset);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(heroOffset);

  // Mini carrusel automático
  const images = document.querySelectorAll('.mini-carousel img');
  let current = 0;

  setInterval(() => {
    images[current].classList.remove('active');
    current = (current + 1) % images.length;
    images[current].classList.add('active');
  }, 2500);




  //flecha h1 intro//

   document.getElementById('scrollArrow').addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.getElementById('hero-offset');
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    }
  });


  
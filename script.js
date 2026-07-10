document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const revealItems = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const counterItems = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.7 }
  );

  counterItems.forEach((item) => counterObserver.observe(item));

  const cursorGlow = document.querySelector('.cursor-glow');
  if (cursorGlow) {
    window.addEventListener('pointermove', (event) => {
      cursorGlow.animate(
        {
          left: `${event.clientX}px`,
          top: `${event.clientY}px`
        },
        { duration: 420, fill: 'forwards' }
      );
    });
  }
});

function animateCounter(element) {
  const target = Number(element.dataset.count || 0);
  if (!target) return;

  const duration = 1100;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    element.textContent = Math.floor(progress * target).toString();
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = target.toString();
    }
  };

  requestAnimationFrame(step);
}

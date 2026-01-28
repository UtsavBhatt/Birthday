// Loads optional home background GIF and implements image-zoom modal for memories page.

// Wait for DOM
document.addEventListener('DOMContentLoaded', function () {
  // 1) Load background GIF if present (index.html uses <div class="bg-layer" data-bg="...">)
  (function loadBackgroundGif(){
    const bg = document.querySelector('.bg-layer[data-bg]');
    if (!bg) return;
    const src = bg.dataset.bg;
    if (!src) return;
    // Preload the image/gif
    const img = new Image();
    img.src = src;
    img.onload = function () {
      bg.style.backgroundImage = `url('${src}')`;
      // add a loaded class for a subtle fade/scale
      bg.classList.add('bg-loaded');
    };
    img.onerror = function () {
      // Keep the gradient if GIF fails to load
      console.warn('Background GIF failed to load:', src);
    };
  })();

  // 2) Modal zoom for memories gallery
  (function galleryModal(){
    const modal = document.getElementById('modal');
    if (!modal) return;
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');

    function openModal(src, caption, alt){
      modalImg.src = src;
      modalImg.alt = alt || caption || '';
      modalCaption.textContent = caption || alt || '';
      modal.setAttribute('aria-hidden', 'false');
      // lock scroll
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      // focus close button for accessibility
      setTimeout(()=> modalClose.focus(), 120);
    }

    function closeModal(){
      modal.setAttribute('aria-hidden', 'true');
      // restore scroll
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      // clear src after animation to free memory (optional)
      setTimeout(()=> { modalImg.src = ''; modalCaption.textContent = ''; }, 300);
    }

    // click on figures/images
    document.querySelectorAll('.gallery .photo').forEach(figure => {
      const img = figure.querySelector('img');
      const caption = figure.dataset.caption || (figure.querySelector('figcaption') || {}).textContent;
      if (!img) return;
      figure.addEventListener('click', () => {
        openModal(img.src, caption, img.alt);
      });
      // also allow click on img specifically
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(img.src, caption, img.alt);
      });
    });

    // close handlers
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      // only close when clicking the backdrop (not the content)
      if (e.target === modal) closeModal();
    });
    // keyboard: Escape closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
        closeModal();
      }
    });
  })();
});

export default function decorate(block) {
  // Extract data from block
  const carouselItems = [...block.children].map((child) => {
    const imgElement = child.querySelector('img');
    const textElement = child.querySelector('div:nth-child(2)');
    return {
      imgHTML: child.querySelector('picture').innerHTML,
      text: textElement ? textElement.textContent.trim() : '',
    };
  });

  // HTML provided by frontend developer
  block.innerHTML = `
    <div class="maruti-carousel-content">
      <div class="maruti-carousel-image"></div>
    </div>
    <div class="owl-dots">
      ${carouselItems.map((_, index) => `<button data-slide="${index}"></button>`).join('')}
    </div>
  `;

  const imageContainer = block.querySelector('.maruti-carousel-image');
  imageContainer.innerHTML = carouselItems.map((item, index) => `
    <div class="maruti-carousel-slide" data-index="${index}">
      <picture>${item.imgHTML}</picture>
      ${item.text ? `<div class="carousel-caption">${item.text}</div>` : ''}
    </div>
  `).join('');

  // JavaScript to handle carousel navigation
  const slides = imageContainer.querySelectorAll('.maruti-carousel-slide');
  const dots = block.querySelectorAll('.owl-dots button');
  let currentIndex = 0;
  let autoPlayInterval;

  const updateSlidePosition = () => {
    slides.forEach((slide, index) => {
      slide.style.display = index === currentIndex ? 'block' : 'none';
    });
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  };

  const startAutoPlay = () => {
    autoPlayInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlidePosition();
    }, 3000); // Change slide every 3 seconds
  };

  const stopAutoPlay = () => {
    clearInterval(autoPlayInterval);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopAutoPlay();
      currentIndex = index;
      updateSlidePosition();
      startAutoPlay();
    });
  });

  block.addEventListener('mouseenter', stopAutoPlay);
  block.addEventListener('mouseleave', startAutoPlay);

  updateSlidePosition();
  startAutoPlay();
}

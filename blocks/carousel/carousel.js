export default function decorate(block) {
  // Get data from the block
  const carouselData = [...block.children].map((child) => {
    const imgElement = child.querySelector('img');
    const textElement = child.querySelector('p');
    return {
      imgSrc: imgElement ? imgElement.src : '',
      imgAlt: imgElement ? imgElement.alt : '',
      text: textElement ? textElement.textContent : '',
    };
  });

  // Generating the new HTML structure
  block.innerHTML = `
    <div class="carousel-slides-container">
      <ul class="carousel-slides">
        ${carouselData.map((data) => `
          <li class="carousel-slide">
            <picture>
              <img src="${data.imgSrc}" alt="${data.imgAlt}">
            </picture>
            ${data.text ? `<div class="carousel-slide-content"><h3>${data.text}</h3></div>` : ''}
          </li>
        `).join('')}
      </ul>
      <ul class="carousel-slide-indicators">
        ${carouselData.map((_, index) => `
          <li class="carousel-slide-indicator">
            <button data-slide-to="${index}"></button>
          </li>
        `).join('')}
      </ul>
    </div>
  `;

  // JavaScript to handle carousel navigation
  const slidesContainer = block.querySelector('.carousel-slides');
  const indicators = block.querySelectorAll('.carousel-slide-indicator button');
  let currentIndex = 0;

  const updateSlidePosition = () => {
    const translateX = currentIndex * -100;
    slidesContainer.style.transform = `translateX(${translateX}%)`;
    indicators.forEach((indicator, index) => {
      indicator.disabled = index === currentIndex;
    });
  };

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateSlidePosition();
    });
  });

  updateSlidePosition();
}

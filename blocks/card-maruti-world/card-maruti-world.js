export default function decorate(block) {
  // Extract data from block HTML
  const cardData = [...block.children].map((card) => {
    const imgElement = card.querySelector('img');
    const headingElement = card.querySelector('h3');
    const descriptionElement = card.querySelectorAll('p')[0];
    const linkElement = card.querySelector('a');
    const dateElement = card.querySelectorAll('p')[1];

    return {
      imgSrc: imgElement ? imgElement.src : '',
      imgAlt: imgElement ? imgElement.alt : '',
      heading: headingElement ? headingElement.innerHTML : '',
      description: descriptionElement ? descriptionElement.textContent : '',
      link: linkElement ? linkElement.href : '#',
      linkText: linkElement ? linkElement.textContent : 'READ MORE',
      date: dateElement ? dateElement.textContent : ''
    };
  });

  // Generate the new HTML structure
  block.innerHTML = `
    <h2 class="card-maruti-world-title">The World Of Maruti Suzuki</h2>
    <div class="card-maruti-world-cards">
      ${cardData.map((card) => `
        <div class="card-maruti-world-card">
          <img src="${card.imgSrc}" alt="${card.imgAlt}">
          <h3 class="card-maruti-world-card-title">${card.heading}</h3>
          <p class="card-maruti-world-card-description">${card.description}</p>
          <a href="${card.link}" class="card-maruti-world-card-link">${card.linkText}</a>
          <span class="card-maruti-world-card-date">${card.date}</span>
        </div>
      `).join('')}
    </div>
    <a href="#" class="card-maruti-world-view-all">VIEW ALL</a>
  `;

  // JavaScript for sliding functionality
  const cardsContainer = block.querySelector('.card-maruti-world-cards');
  const cards = block.querySelectorAll('.card-maruti-world-card');
  let currentIndex = 0;

  const updateSlidePosition = () => {
    const cardWidth = cards[0].offsetWidth;
    cardsContainer.style.transform = `translateX(${-currentIndex * (cardWidth + 16)}px)`; // 16px is the margin-right
  };

  const prevButton = document.createElement('button');
  prevButton.classList.add('nav-button', 'prev-button');
  prevButton.innerHTML = '&#10094;';
  prevButton.addEventListener('click', () => {
    currentIndex = Math.max(currentIndex - 1, 0);
    updateSlidePosition();
  });

  const nextButton = document.createElement('button');
  nextButton.classList.add('nav-button', 'next-button');
  nextButton.innerHTML = '&#10095;';
  nextButton.addEventListener('click', () => {
    currentIndex = Math.min(currentIndex + 1, cards.length - 3); // Ensure all cards are shown
    updateSlidePosition();
  });

  block.insertAdjacentElement('afterbegin', prevButton);
  block.insertAdjacentElement('beforeend', nextButton);

  updateSlidePosition();
}

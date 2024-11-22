export default function decorate(block) {
  const cards = [...block.children];

  block.innerHTML = `
    <div class="card-maruti-world-parent-cards">
      ${cards.map(card => `<div class="card-maruti-world-parent-card">${card.innerHTML}</div>`).join('')}
    </div>
    <div class="owl-nav">
      <button class="owl-prev">&lt;</button>
      <button class="owl-next">&gt;</button>
    </div>
  `;

  const cardContainer = block.querySelector('.card-maruti-world-parent-cards');
  const cardElements = block.querySelectorAll('.card-maruti-world-parent-card');
  let currentIndex = 0;

  const updateCardPosition = () => {
    const cardWidth = cardElements[0].offsetWidth;
    cardContainer.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
  };

  block.querySelector('.owl-prev').addEventListener('click', () => {
    currentIndex = Math.max(currentIndex - 1, 0);
    updateCardPosition();
  });

  block.querySelector('.owl-next').addEventListener('click', () => {
    currentIndex = Math.min(currentIndex + 1, cardElements.length - 3);
    updateCardPosition();
  });

  updateCardPosition();
}

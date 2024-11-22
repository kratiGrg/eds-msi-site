export default function decorate(block) {
  const articlesData = [...block.children].map((article) => {
    const year = article.querySelector('h1').textContent;
    const imgElement = article.querySelector('picture img');
    const titleElement = article.querySelector('h3');
    const descriptionElement = article.querySelectorAll('p')[1];
    const linkElement = article.querySelector('a');
    const dateElement = article.querySelector('em');

    return {
      year,
      imgSrc: imgElement ? imgElement.src : '',
      imgAlt: imgElement ? imgElement.alt : '',
      title: titleElement ? titleElement.textContent : '',
      description: descriptionElement ? descriptionElement.textContent : '',
      link: linkElement ? linkElement.href : '#',
      linkText: linkElement ? linkElement.textContent : 'READ MORE',
      date: dateElement ? dateElement.textContent : ''
    };
  });

  block.innerHTML = `
    <div class="accordion">
      ${articlesData.map((article, index) => `
        <div class="accordion-item" aria-expanded="${index === articlesData.length - 1}">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" aria-expanded="${index === articlesData.length - 1}">
              ${article.year}
            </button>
          </h2>
          <div class="accordion-content">
            <img src="${article.imgSrc}" alt="${article.imgAlt}">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.link}" class="read-more">${article.linkText}</a>
            <div class="date">${article.date}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  const accordionItems = block.querySelectorAll('.accordion-item');
  accordionItems.forEach((item) => {
    const button = item.querySelector('.accordion-button');
    button.addEventListener('click', () => {
      const isExpanded = item.getAttribute('aria-expanded') === 'true';
      accordionItems.forEach((i) => i.setAttribute('aria-expanded', 'false'));
      item.setAttribute('aria-expanded', !isExpanded);
    });
  });
}

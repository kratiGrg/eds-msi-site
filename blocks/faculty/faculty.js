import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Extract data from the block
  const facultyData = [...block.children].map((child) => {
    const imgElement = child.querySelector('img');
    const h2Element = child.querySelector('h2');
    const h3Element = child.querySelector('h3');
    const pElement = child.querySelector('p');

    return {
      imgSrc: imgElement ? imgElement.src : '',
      imgAlt: imgElement ? imgElement.alt : '',
      h2Text: h2Element ? h2Element.textContent : '',
      h3Text: h3Element ? h3Element.textContent : '',
      pText: pElement ? pElement.textContent : ''
    };
  });

  // Generate new HTML structure
  block.innerHTML = facultyData.map((data) => `
    <div class="faculty-card">
      <img src="${data.imgSrc}" alt="${data.imgAlt}">
      <div class="faculty-content">
        <h2>${data.h2Text} <span>${data.h3Text}</span></h2>
        <p>${data.pText}</p>
      </div>
    </div>
  `).join('');
}

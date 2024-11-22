export default function decorate(block) {
  // Extract data from block
  const carouselItems = [...block.children].map((child) => {
    const imgElement = child.querySelector('img');
    const h3Element = child.querySelector('h3');
    const pElements = child.querySelectorAll('p');
    const linkElement = child.querySelector('a');

    return {
      imgHTML: child.querySelector('picture').innerHTML,
      title: h3Element ? h3Element.textContent.trim() : '',
      description: pElements[0] ? pElements[0].textContent.trim() :

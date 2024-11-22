export default function decorate(block) {
  const items = [...block.children].map((item, index) => {
    const [header, content] = item.children;
    return {
      header: header.textContent.trim(),
      content: content ? content.innerHTML.trim() : '',
      expanded: index === 0,
    };
  });

  block.innerHTML = items.map((item, index) => `
    <div class="accordion-card">
      <button aria-expanded="${item.expanded}" class="accordion-header">
        <span>${item.header.toUpperCase()}</span>
        <span class="icon">${item.expanded ? '-' : '+'}</span>
      </button>
      ${item.content ? `<div class="accordion-content" aria-hidden="${!item.expanded}"><p>${item.content}</p></div>` : ''}
    </div>
  `).join('');

  block.querySelectorAll('.accordion-header').forEach((header, index) => {
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      block.querySelectorAll('.accordion-header').forEach((btn, idx) => {
        btn.setAttribute('aria-expanded', 'false');
        btn.querySelector('.icon').textContent = '+';
        const content = block.querySelectorAll('.accordion-content')[idx];
        if (content) content.setAttribute('aria-hidden', 'true');
      });
      if (!isExpanded) {
        header.setAttribute('aria-expanded', 'true');
        header.querySelector('.icon').textContent = '-';
        const content = block.querySelectorAll('.accordion-content')[index];
        if (content) content.setAttribute('aria-hidden', 'false');
      }
    });
  });
}

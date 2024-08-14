const itemsPerPage = 2;
let currentPage = 1;
function renderList(data, page = 1) {
  const ul = document.createElement('ul');
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = data.slice(start, end);

  paginatedItems.forEach((item) => {
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.href = item.Destination;
    anchor.text = item.Placeholder;
    li.appendChild(anchor);
    ul.appendChild(li);
  });

  return ul;
}
function createPagination(totalPages, container, data) {
  const paginationContainer = document.createElement('div');
  paginationContainer.className = 'pagination-controls';

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', () => {
      currentPage = i;
      container.innerHTML = '';
      container.appendChild(renderList(data, currentPage));
      createPagination(totalPages, container, data);
    });
    paginationContainer.appendChild(button);
  }

  container.appendChild(paginationContainer);
}
export default async function decorate(block) {
  const link = block.querySelector('a');
  const path = link ? link.getAttribute('href') : block.textContent.trim();

  const spreadSheetResponse = fetch(`${path}`).then((response) => response.json()).then((resp) => {
    const { data } = resp;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    block.appendChild(renderList(data, currentPage));
    if (totalPages > 1) {
      createPagination(totalPages, block, data);
    }
  }).catch((error) => console.error('Error fetching data:', error));
}

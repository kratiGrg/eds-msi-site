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

  for (let i = 1; i <= totalPages;) {
    const button = document.createElement('button');
    button.textContent = i;
    /* eslint-disable no-loop-func */
    button.addEventListener('click', () => {
      currentPage = i;
      container.innerHTML = '';

      container.appendChild(renderList(data, currentPage));
      createPagination(totalPages, container, data);
    });
    paginationContainer.appendChild(button);
    i += 1;
  }

  container.appendChild(paginationContainer);
}
export default async function decorate(block) {
  const link = block.querySelector('a');
  const path = link ? link.getAttribute('href') : block.textContent.trim();

  /* eslint-disable no-unused-vars */
  const spreadSheetResponse = fetch(`${path}`).then((response) => response.json()).then((resp) => {
    const { data } = resp;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    block.appendChild(renderList(data, currentPage));
    if (totalPages > 1) {
      createPagination(totalPages, block, data);
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Error fetching data:', error);
  });
}

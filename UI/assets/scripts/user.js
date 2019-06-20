/* eslint-disable no-plusplus */
const searchButton = document.querySelector('#search-type-btn');

const searchProperty = () => {
  const type = document.getElementById('search-bedroom');
  const filter = type.value.toUpperCase();
  const row = document.getElementById('search').getElementsByTagName('a');
  for (let i = 0; i < row.length; i++) {
    row[i].style.display = 'none';

    const div = row[i].getElementsByTagName('div');
    for (let j = 0; j < div.length; j++) {
      const text = row[i].getElementsByTagName('h4')[j];
      if (text) {
        if (text.innerHTML.toUpperCase().indexOf(filter) > -1) {
          row[i].style.display = '';
          break;
        }
      }
    }
  }
};
searchButton.addEventListener('click', searchProperty);

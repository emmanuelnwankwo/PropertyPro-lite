const logout = document.querySelector('#logout');

logout.addEventListener('click', () => {
  localStorage.clear();
  window.location = 'index.html';
});
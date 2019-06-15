const mainNav = document.querySelector('#main_nav_menu');
const navBarToggle = document.querySelector('#navbar_toggle_btn');

navBarToggle.addEventListener('click', () => {
  mainNav.classList.toggle('show');
});
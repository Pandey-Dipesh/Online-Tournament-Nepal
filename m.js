const mobileMenu = document.querySelector('.navbar_toggle');
const navbarMenu = document.querySelector('.navbar_menu');

mobileMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  navbarMenu.classList.toggle('active');
});
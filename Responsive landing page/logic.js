const menuToggle = document.getElementById('mobile-menu');
const nav = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});
document.getElementById('menu-toggle').addEventListener('click', function() {
    document.querySelector('header nav').classList.toggle('active');
});

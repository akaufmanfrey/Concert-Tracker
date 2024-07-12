document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.querySelector('#darkModeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    if (isDarkMode) {
        document.querySelector('html').classList.add('dark');
    }

    darkModeToggle.addEventListener('click', () => {
        document.querySelector('html').classList.toggle('dark');
        localStorage.setItem('darkMode', document.querySelector('html').classList.contains('dark'));
    });
});
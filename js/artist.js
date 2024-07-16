const apiKey = '8dc00da7296801b0bf878aa91b390845';
const userNameInput = document.querySelector('#username');
const artistContainer = document.querySelector('#artist');
const formSubmit = document.querySelector('#searchForm');

const getUserArtist = function (event) {
    event.preventDefault();
    const username = userNameInput.value.trim();
    const apiArtistUrl = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${apiKey}&format=json`;

    fetch(apiArtistUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    //console.log(data);
                    displayArtists(data);
                });
            } else {
                alert(`Error:${response.statusText}`);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to lastFM');
        });



};

const displayArtists = function (artists) {
    if (artists.length === 0) {
        artistContainer.textContent = 'No Artist found.';
        return;
    }

    artistContainer.classList = 'grid grid-cols-4 gap-3 px-2';

    for (let i = 0; i < artists.topartists.artist.length; i++) {
        const artistName = document.createElement('a');
        artistName.classList = 'bg-yellow-500  text-black font-bold py-2 px-2 border-b-3 rounded btn-artist';
        artistName.textContent = `${artists.topartists.artist[i].name.trim()}`;
        artistName.setAttribute('href', `./index.html?artist=${artistName.textContent}`);
        artistContainer.append(artistName);
    }
};


formSubmit.addEventListener('submit', getUserArtist);




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

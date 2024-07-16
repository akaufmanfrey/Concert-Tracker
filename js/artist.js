const apiKey = '8dc00da7296801b0bf878aa91b390845';
const userNameInput = document.querySelector('#username');
const artistContainer = document.querySelector('#artist');
const genreContainer = document.querySelector('#genre');
const formSubmit = document.querySelector('#searchForm');
const loadMoreBtn = document.querySelector('#load-more-btn');

const getUserArtist = function (event) {
    event.preventDefault();
    const username = userNameInput.value.trim();
    const apiArtistUrl = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${apiKey}&format=json`;
    const apiGenreUrl = `https://ws.audioscrobbler.com/2.0/?method=user.gettoptags&user=${username}&api_key=${apiKey}&format=json`

    fetch(apiArtistUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    //console.log(data);
                    displayArtists(data);
                    showLoadMoreButton();
                });
            } else {
                alert(`Error:${response.statusText}`);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to lastFM');
        });
    fetch(apiGenreUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    //console.log(data);
                    displayGenres(data);
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

    artistContainer.classList = 'grid grid-cols-2 gap-3 px-2';

    for (let i = 0; i < artists.topartists.artist.length; i++) {
        const artistName = document.createElement('a');
        artistName.classList = 'bg-yellow-500  text-black font-bold py-2 px-2 border-b-3 rounded btn-artist';
        artistName.textContent = `${artists.topartists.artist[i].name}`;
        artistName.setAttribute('href', `./index.html?artist=${artists.topartists.artist[i].name}`);
        //artistName.setAttribute('data-artist', artists.topartists.artist[i].name)
        artistContainer.append(artistName);
    }
};

const displayGenres = function (Genres) {
    if (Genres.length === 0) {
        genreContainer.textContent = 'No Genre found.';
        return;
    }
    genreContainer.classList = 'grid grid-cols-2 gap-2 px-4';

    for (let i = 0; i < Genres.toptags.tag.length; i++) {
        const genre = document.createElement('span');
        genre.classList = 'bg-yellow-500  text-black font-bold py-2 px-2 border-b-3 rounded';
        genre.textContent = `${Genres.toptags.tag[i].name}`;
        genreContainer.append(genre);
    }
};

const showLoadMoreButton = function () {
    loadMoreBtn.style.display = 'block'; 
};

formSubmit.addEventListener('submit', getUserArtist);

// artistContainer.addEventListener('click', (e) => {
//     const target = e.target;
//     if (target.classList.contains('btn-artist')) {
//         window.location = './index.html';
//         console.log(document.querySelector('#searchInput'));
//         document.querySelector('#searchInput').value = target.textContent;
//     }
// });


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

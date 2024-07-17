const searchButton = $('button[type=submit]');
const searchHistory = $('aside');
const searchInput = $('#searchInput');
const concertCards = $('#concert-container');
const loadMoreButton = $('#load-more-btn');
const locationInput = $('#location');
const apiKey = 'f1d985f2f05b0ca0bb78b860038d22dc'

function readArtistsFromStorage() {

    //Retrieve artists from localStorage and parse the JSON to an array. If there are no artists in localStorage, initialize an empty array and return it.
    const storageArray = JSON.parse(localStorage.getItem("artists"));
    if (storageArray) {
        return storageArray
    } else {
        const emptyArray = [];
        return emptyArray
    }

}

function initializePage() {
    const artistHistory = readArtistsFromStorage();
    if (artistHistory) {
        artistHistory.forEach(generateHistoryButton);
    }
    // Grabing artist name from url
    const queryString = document.location.search;
    if (queryString) {
        const artistName = queryString.split('=')[1];
        const finalName = artistName.split('%20').join();
        const nameF = finalName.split(',').join(' ');
        console.log(nameF);
        searchInput.val(nameF);
        searchButton.click();
    }
    localStorage.setItem('next', '');

}

function generateHistoryButton(artist) {
    const artistButton = $('<button>');
    artistButton.addClass('bg-gray-500 text-white px-4 py-2 search-history block my-2');
    artistButton.text(artist);
    searchHistory.append(artistButton);
}
function getConcertResults(event) {
    event.preventDefault();
    const artistSearch = searchInput.val();
    const locationSearch = locationInput.val();
    const artistArray = readArtistsFromStorage();
    if (!(artistArray.includes(artistSearch)) && artistSearch) {
        artistArray.push(artistSearch);
        generateHistoryButton(artistSearch);
        localStorage.setItem('artists', JSON.stringify(artistArray));
    }
    if (artistSearch && locationSearch) {
        const Url = `https://api.openweathermap.org/geo/1.0/direct?q=${locationSearch}&limit=1&appid=${apiKey}`
        fetch(Url).then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    if (data.length !== 0) {
                        const apiUrl = 'https://api.predicthq.com/v1/events?location_around.origin=' + data[0].lat + ',' + data[0].lon + '&q=' + artistSearch.replace(/\s/g, "+");
                        console.log(apiUrl)
                        locationInput.val('');
                        fetchConcerts(apiUrl);
                    } else {
                        alert("No city with that name found");
                    }
                });
            } else {
                alert(`Error: ${response.statusText}`);
            }
        });
    } else if (artistSearch) {
        const apiUrl = 'https://api.predicthq.com/v1/events?q=' + artistSearch.replace(/\s/g, "+");
        fetchConcerts(apiUrl);
    }
}
function fetchConcerts(apiUrl) {
    fetch(apiUrl, {
        headers: {
            Authorization: "Bearer aZ6E2Dg5S1F-jxl_3A56LnvtDQEEqBw7rPP_5qgB",
        },
    })
        .then(function (response) {
            if (response.ok) {
            searchInput.val('');
            console.log(response);
            response.json().then(function(data) {
                localStorage.setItem('next', data.next);
                console.log(data.next);
                concertCards.empty();
                data.results.forEach(displayCard);      
                if (data.next) {
                  $('#load-more-btn').show();
                } else {
                  $('#load-more-btn').hide();
                }
            })
        }
    })
}

function loadMoreResults(event) {
    event.preventDefault();
    const apiUrl = localStorage.getItem('next');
    if (apiUrl) {
        fetch(apiUrl, {
            headers: {
                Authorization: "Bearer aZ6E2Dg5S1F-jxl_3A56LnvtDQEEqBw7rPP_5qgB",
            },
        })
            .then(function (response) {
                if (response.ok) {
                    console.log(response);
                    response.json().then(function (data) {
                        localStorage.setItem('next', data.next);
                        console.log(data.next);
                        data.results.forEach(displayCard);
                    })
                }
            })
    }
}

function displayCard(results) {
    console.log(results);
    const mainCard = $('<div>');
    mainCard.addClass('block max-w-sm p-6 border border-gray-300 rounded-lg shadow-md card');
    const mainCardContent = $('<div>');
    mainCardContent.addClass('card-content')
    const cardTitle = $('<p>');
    cardTitle.addClass('mb-2 text-3xl font-bold tracking-tight text-white');
    cardTitle.text(results.title)
    const cardDate = $('<div>');
    cardDate.addClass('mb-2 text-lg font-bold tracking-tight text-white');
    cardDate.text(results.start_local);
    const cardDesc = $('<p>');
    cardDesc.addClass('mb-2 text-lg font-normal text-white dark:white');
    cardDesc.text(results.description);
    const cardAddress = $('<p>');
    cardAddress.addClass('mb-2 text-lg font-bold tracking-tight text-white');
    cardAddress.text(results.geo.address.formatted_address);
    mainCardContent.append(cardTitle);
    mainCardContent.append(cardDate);
    mainCardContent.append(cardDesc);
    mainCardContent.append(cardAddress);
    mainCard.append(mainCardContent);
    concertCards.append(mainCard);
}

searchButton.on('click', getConcertResults);
loadMoreButton.on('click', loadMoreResults);
$(document).ready(initializePage);
$('aside').on('click', '.search-history', function (event) {
    searchInput.val($(event.target).text());
    searchButton.click();
})



//Dark Mode for index.html

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


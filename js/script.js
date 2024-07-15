const searchButton = $('button[type=submit]');
const searchHistory = $('aside');
const searchInput = $('#searchInput');
const concertCards = $('#concert-container');
const loadMoreButton = $('#load');

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
function displaySearchHistory() {
    const artistHistory = readArtistsFromStorage();
    if (artistHistory) {
        artistHistory.forEach(generateHistoryButton);
    }
    localStorage.setItem('loadindex', 0);
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
    const apiUrl = 'https://api.predicthq.com/v1/events?q='+ artistSearch.replace(/\s/g, "+");
fetch(apiUrl, {
    headers: {
        Authorization: "Bearer aZ6E2Dg5S1F-jxl_3A56LnvtDQEEqBw7rPP_5qgB",
    },
})
  .then(function(response) {
        if (response.ok) {
            const artistArray = readArtistsFromStorage();
            if (!(artistArray.includes(artistSearch))) {
                artistArray.push(artistSearch);
                generateHistoryButton(artistSearch);
                localStorage.setItem('artists', JSON.stringify(artistArray));
            }
            searchInput.val('');
            console.log(response);
            response.json().then(function(data) {
                console.log(data.results);
                concertCards.empty();
                data.results.forEach(displayCard);
        })
        }
    })
}

function displayCard(results) {
    console.log(results);
    const mainCard = $('<div>');
    mainCard.addClass('block max-w-sm p-6 bg-gray border border-gray-300 rounded-lg shadow-md hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 card');
    const mainCardContent = $('<div>');
    mainCardContent.addClass('card-content')
    const cardTitle = $('<p>');
    cardTitle.addClass('mb-2 text-3xl font-bold tracking-tight text-white'); 
    cardTitle.text(results.title)
    const cardDate = $('<div>');
    cardDate.addClass('mb-2 text-lg font-bold tracking-tight text-white'); 
    cardDate.text(results.start_local);
    const cardDesc = $('<p>');
    cardDesc.addClass('mb-2 text-lg font-normal text-gray-700 dark:text-gray-400');
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
$(document).ready(displaySearchHistory);
$('aside').on('click', '.search-history', function(event) {
    searchInput.val($(event.target).text());
    searchButton.click();
})
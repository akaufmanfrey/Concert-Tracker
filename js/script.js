function getConcertResults(search) {
    const apiUrl = 'https://api.predicthq.com/v1/events?q='+ search;
fetch(apiUrl, {
    headers: {
        Authorization: "Bearer aZ6E2Dg5S1F-jxl_3A56LnvtDQEEqBw7rPP_5qgB",
    },
})
  .then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data.results);
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
    cardTitle.addClass('mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white');
    cardTitle.text(results.title)
    const cardDate = $('<div>');
    cardDate.addClass('mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white');
    cardDate.text(results.start_local);
    const cardDesc = $('<p>');
    cardDesc.addClass('mb-2 text-lg font-normal text-gray-700 dark:text-gray-400');
    cardDesc.text(results.description);
    const cardAddress = $('<p>');
    cardAddress.addClass('mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white');
    cardAddress.text(results.geo.address.formatted_address);
    mainCardContent.append(cardTitle);
    mainCardContent.append(cardDate);
    mainCardContent.append(cardDesc);
    mainCardContent.append(cardAddress);
    mainCard.append(mainCardContent);
    $('main').append(mainCard);
}

getConcertResults('taylor+swift');
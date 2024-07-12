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
    mainCard.addClass('card my-3');
    const cardTitle = $('<p>');
    cardTitle.addClass('card-header');
    cardTitle.text(results.title)
    const cardDate = $('<div>');
    cardDate.addClass('card-text');
    cardDate.text(results.start_local);
    console.log(cardDate.text());
    const cardDesc = $('<p>');
    cardDesc.addClass('card-text');
    cardDesc.text(results.description);
    console.log(cardDesc.text());
    const cardAddress = $('<p>');
    cardAddress.addClass('card-text');
    cardAddress.text(results.geo.address.formatted_address);
    mainCard.append(cardTitle);
    mainCard.append(cardDate);
    mainCard.append(cardDesc);
    mainCard.append(cardAddress);
    $('main').append(mainCard);
}

getConcertResults('taylor+swift');
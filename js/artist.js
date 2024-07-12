const apiKey = '8dc00da7296801b0bf878aa91b390845';

function getData() {
    const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=Raisin_Fran&api_key=${apiKey}&format=json`;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                });
            } else {
                alert(`Error:${response.statusText}`);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to lastFm');
        });
}

getData();
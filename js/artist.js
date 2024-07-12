const apiKey = '8dc00da7296801b0bf878aa91b390845';
// const userNameInput = document.querySelector('#username');
const artistContainer = document.querySelector('#artist');

const getUserArtist = function (username) {
    const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${apiKey}&format=json`;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
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
        //artistContainer.textContent = 'No Artist found.';
        return;
    }



    for (let i = 0; i < artists.topartists.artist.length; i++) {
        const artistName = document.createElement('h2');
        artistName.textContent = `${artists.topartists.artist[i].name}`;
        artistContainer.append(artistName);

        console.log(artists.topartists.artist[i].name);

    }

};

getUserArtist('Ujjaya');
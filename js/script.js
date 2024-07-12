const apiUrl = 'https://api.predicthq.com/v1/events?q=taylor+swift'
fetch(apiUrl, {
    headers: {
        Authorization: "Bearer aZ6E2Dg5S1F-jxl_3A56LnvtDQEEqBw7rPP_5qgB",
    },
}).then(function(response) {
    console.log(response.json());
})
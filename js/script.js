const apiUrl = 'https://api.predicthq.com/v1/events/'
fetch(apiUrl, {
    headers: {
        Authorization: "Bearer vPfAQw0dUoNkuk8-WKRpeIZJgQJFk4SR5cpzxKzHLcgK3vSBJNRuQQ"
    },
    params: {
        q: 'taylor swift'
    }
}).then(function(response) {
    console.log(response);
})
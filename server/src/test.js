
(async () => {
    const response = await fetch('http://localhost:8000/state/0', {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
    });

    const responseBody = await response.json();
    console.log(responseBody);

})();
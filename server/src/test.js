
async function getState(gameId) {
    const response = await fetch('http://localhost:8000/state/'+ gameId, {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
    });

    const responseBody = await response.json();

    return responseBody;
}

async function postDelta(gameId, playerId, delta) {
    const response = await fetch('http://localhost:8000/delta/'+ gameId + '/' + playerId, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(delta),
    });

    const responseBody = await response.json();

    return responseBody;
}

(async () => {
    const gameId = 4;
    const playerId = 1;

    let responseBody = await getState(gameId);
    // console.log(responseBody);

    responseBody = await postDelta(gameId, playerId, {
        type: "delta",
        action: "down",
    });
    console.log(responseBody);

    // responseBody = await getState(gameId);
    // console.log(responseBody);
})();
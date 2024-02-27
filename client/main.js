function setPosition(id, x, y) {
    let element = document.getElementById(id);
    element.style.left = y + "px";
    element.style.top = x + "px";
}

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


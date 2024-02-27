function setPosition(id, x, y) {
    let element = document.getElementById(id);
    element.style.left = y + "px";
    element.style.top = x + "px";
}

async function getState(gameId) {
    const response = await fetch('http://localhost:8000/state/' + gameId, {
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
    const response = await fetch('http://localhost:8000/delta/' + gameId + '/' + playerId, {
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

document.addEventListener('keydown', async (e) => {
    console.log(e.key);
    if (e.key == 'ArrowRight') {
        // todo handle arrow right
        const newState = await postDelta(0, 0, { type: "delta", action: "right" });
        // todo update view according to state
    } else if (e.key == 'ArrowUp') {
        // todo handle arrow up
    } else if (e.key == 'ArrowLeft') {
        // todo handle arrow left
    } else if (e.key == 'ArrowDown') {
        // todo handle arrow Down
    }
});

function setPosition(id, x, y) {
    const element = document.getElementById(id);
    element.style.left = x + "px";
    element.style.top = y + "px";
    element.style.transform = "translate(0,0)";
}

function setScore(id, score1, score2) {
    const element = document.getElementById(id);
    element.innerHTML = score1 + " - " + score2;
}

function updateState(state) {
    setPosition("platform-1", state['1'].x, state['1'].y);
    setPosition("platform-2", state['2'].x, state['2'].y);
    setPosition("ball", state.ball.x, state.ball.y);
    setScore("score", state['1'].score, state['2'].score);
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
        const newState = await postDelta(0, 0, { type: "delta", action: "right" });
        updateState(newState);
    } else if (e.key == 'ArrowUp') {
        const newState = await postDelta(0, 0, { type: "delta", action: "up" });
        updateState(newState);
    } else if (e.key == 'ArrowLeft') {
        const newState = await postDelta(0, 0, { type: "delta", action: "left" });
        updateState(newState);
    } else if (e.key == 'ArrowDown') {
        const newState = await postDelta(0, 0, { type: "delta", action: "down" });
        updateState(newState);
    }
});

setInterval(async () => {
    const json = await getState(0);
    updateState(json);
}, 100);

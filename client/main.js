let GameID = "";

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
    setPosition("platform-1", state.player1.x, state.player1.y);
    setPosition("platform-2", state.player2.x, state.player2.y);
    setPosition("ball", state.ball.x, state.ball.y);
    setScore("score", state.player1.score, state.player2.score);
    
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

function login() {
    const dialog = document.getElementById("login");
    dialog.showModal();
}

function closeLogin() {
    const dialog = document.getElementById("login");
    const input = document.getElementById("GameID");
    dialog.close();
    GameID = input.value;
}


setInterval(async () => {
    // todo getState,
    // todo update view with state
    const state = {
        ball: {
            x: 100,
            y: 500,
        },
        player1: {
            x: 400,
            y: 300,
            score: 50
        },
        player2: {
            x: 50,
            y: 200,
            score: 10
        }
    };
    // const json = getState(0);
    updateState(state);
}, 10);

const express = require('express');
const app = express();
const spd = 50;
const baseSpdBall = 20;
const incSpdBall = 3;
app.use(express.json());
const states = {
};
function moveBall(ball){
    const delta_x = ball.spd * Math.cos((Math.PI/180)*ball.angle);
    const delta_y = ball.spd * Math.sin((Math.PI/180)*ball.angle);
    ball.x += delta_x;
    ball.y += delta_y;
}
function changeAngle(ball){
    if(ball.y + ball.spd > 580 || ball.y + ball.spd < 20){
        ball.angle = -ball.angle
    }
}
function endOfRound(ball, GameId){
    if(ball.x > + 1180){
        GameId['1'].score ++;
        ball.x = 600;
        ball.y = 300;
        let newAngle = Math.random();
        newAngle *= 180;
        if (newAngle < 90) {
            ball.angle = newAngle - 45;
        } else {
            ball.angle = newAngle + 45;
        }
    }
    else if(ball.x < 20){
        GameId['2'].score ++;
        ball.x = 600;
        ball.y = 300;
        let newAngle = Math.random();
        newAngle *= 180;
        if (newAngle < 90) {
            ball.angle = newAngle - 45;
        } else {
            ball.angle = newAngle + 135;
        }
    }

}

app.get('/state/:game_id', (req, res) => {
    const game_id = req.params.game_id;
    if (!states[game_id]) {
        // iets in state zetten   
        states[game_id] = {
            type: "state",
            ball: {
                x: 1100,
                y: 500,
                angle: 45,
                spd: baseSpdBall
            },
            1: {
                x: 0,
                y: 5,
                score: 15
            },
            2: {
                x: 0,
                y: 5,
                score: 10
            }
        };
    }
//    console.log('State', states);
    res.send(states[game_id]);
});

app.post('/delta/:game_id/:player', (req, res) => {
    const game_id = req.params.game_id;
    const player = req.params.player;
    const delta = req.body;
    const action = delta.action;
    const gameState = states[game_id];
    const playerState = gameState[player];
    //update state according to delta action
    switch (action) {
        case "up":
            playerState.y -= spd;
            break;
        case "down":
            playerState.y += spd;
            break;
        case "left":
            playerState.x -= spd;
            break;
        case "right":
            playerState.x += spd;
            break;
    }
    console.log(playerState);
    res.send(gameState);
});

setInterval(()=>{
    for(GameId in states){
        console.log(states[GameId]);
        moveBall(states[GameId].ball);
        changeAngle(states[GameId].ball);
        endOfRound(states[GameId].ball, states[GameId]);
    }
},1000)
app.get('/yoyo', (req, res) => {
    my_response = JSON.parse('{"yoyo": 16}');
    console.log(my_response);
    res.send('yo dawg' + my_response);
})

app.use(express.static('client'));

app.listen(8000, () => {
    console.log("Running!");
});
const express = require('express');
const app = express();

app.use(express.json());
const states = {
};

app.get('/state/:game_id', (req, res) => {
    const game_id = req.params.game_id;
    if (!states[game_id]) {
        // iets in state zetten   
        states[game_id] = {
            type: "state",
            ball: {
                x: 10,
                y: 15
            },
            player1: {
                pos: [0, 5],
                x: 0,
                y: 5,
                score: 15
            },
            player2: {
                x: 0,
                y: 5,
                score: 10
            }
        };
    }
    res.send(states[game_id]);
});

app.post('/delta/:game_id/:player', (req, res) => {
    console.log(req.body);
    res.send(JSON.stringify({
        hello: "World",
    }));
});

app.get('/yoyo', (req, res) => {
    my_response = JSON.parse('{"yoyo": 16}');
    console.log(my_response);
    res.send('yo dawg' + my_response);
})

app.listen(8000, () => {
    console.log("Running!");
});

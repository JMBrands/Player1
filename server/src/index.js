const express = require('express');
const app = express();

app.get('/', (req, res) => {
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

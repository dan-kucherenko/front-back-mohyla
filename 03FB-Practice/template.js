const express = require('express');
const app = express();
const port = 3000;

const people = [
    { surname: 'Smith', phrase: 'I love hiking' },
    { surname: 'Johnson', phrase: 'Where is the nearest coffee shop?'},
    { surname: 'Williams', phrase: 'Coding is fun'},
];

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('people', { people });
});

app.listen(port, () => {
    console.log("Server is running on port", port);
});
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const api = require('./server/routes/api');
const port = 3000;
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '/dist/dovas-app')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', api);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/dovas-app/index.html'));
});

app.listen(process.env.PORT || port, function() {
    console.log("Server running on localhost:" + port)
});


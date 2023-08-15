const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const urlencodedParser = bodyParser.urlencoded({extended: false})
const app = express();
const port = 8000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json(), urlencodedParser);
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
const DATABASE = 'finaltodolist';

mongoose.connect(`mongodb://localhost/${DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log(`Established a connection to the ${DATABASE} database`))
    .catch(err => console.log(`Something went wrong when connecting to the ${DATABASE} database`, err));

require('dotenv').config();
require('../server/routes.js')(app);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`) 
});

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

//.ENV SETUP:
dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

//LOG REQUESTS:
app.use(morgan('tiny'));

//MONGODB CONNECTION:
connectDB();

//PARSE REQUEST TO BODY PARSER:
app.use(bodyparser.urlencoded({ extended: true }));

//SET VIEW ENGINE:
app.set('view engine', 'ejs'); //REFERENCE: app.set('views',path.resolve(__dirname, 'views/ejs'));

//LOAD ASSETS:ABSOLUTE PATHS...
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

//LOAD ROUTERS:
app.use('/', require('./server/routes/router'));

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

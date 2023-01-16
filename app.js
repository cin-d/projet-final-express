const express = require('express');
const app=express();

const config = require('./config');
const routes = require('./routes');
const cors = require('cors');
const morgan = require('morgan');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(config.basePath, routes);


app.listen(config.port, () => {
    console.log('coucou');
});

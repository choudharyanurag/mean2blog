/* Express Setup */
const  express = require("express");
const app = express();

/* Path setup */
const path = require('path');
/* Mongoose Setup */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
/* Mongodb connection */
const dbConfig = require('./config/dev-dbconfig');
const helpers = require('./utils/helpermethods');
console.log('Will try to connect to database ' + dbConfig.uri);
const dbConnection = mongoose.connect(dbConfig.uri /*, { useMongoClient: true } */
    , (err)=>helpers.handleDBError(err));
//console.log(dbConnection);

/* Application start */

app.use(express.static(__dirname+'/blog-ui-client/dist/'));


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/blog-ui-client/dist/index.html'));
});

app.listen( 8009, ()=>{
    console.log('App Started on 8009');
});

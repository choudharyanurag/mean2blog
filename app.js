/* Express Setup */
const  express = require("express");
const app = express();
const router = express.Router();

/* DEV */
const cors = require('cors');
app.use(cors());
/* DEV */



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



/* Authentication */

const authentication = require('./routes/authentication')(router);
const login = require('./routes/login')(router);

/* body parser */ 


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/* Application start and Routes */
app.use(express.static(__dirname+'/blog-ui-client/dist/'));
app.use('/auth',authentication);
app.use('/login',login);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/blog-ui-client/dist/index.html'));
});

app.listen( 8009, ()=>{
    console.log('App Started on 8009');
});

const express = require('express');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');


app.use(express.static('./assets'));
app.use(expressLayout);

//extractstyle and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//use express router
app.use('/',require('./routes/index'));

//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port, function(err){
if(err){
    // console.log(err,'error encountered in starting the server');
    console.log(`Error in running the server: ${port}`);
    return;
}
console.log(`server iss running on port: ${port}`);
});
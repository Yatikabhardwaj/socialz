const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
//used for authentication
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css' 
}));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayout);

//extractstyle and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session cookie in the db

app.use(session({
    name: 'codeial',
    //TODO: Change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
            mongooseConnection : db,
            autoRemove: 'disable'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    }
)
}));

app.use(passport.initialize());
app.use(passport.session());

//checks whether a session cookie is present or not. Whenever any request comes, setAuthenticatedUser(middleware) will be called from passport-local-authentication and the user will be stored in locals. User will then be accessed in views
app.use(passport.setAuthenticatedUser)

//use express router
app.use('/',require('./routes/index'));

app.listen(port, function(err){
if(err){
    // console.log(err,'error encountered in starting the server');
    console.log(`Error in running the server: ${port}`);
    return;
}
console.log(`server iss running on port: ${port}`);
});
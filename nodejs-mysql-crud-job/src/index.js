const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const mysqlStore = require('express-mysql-session');
const passport = require('passport');

const {database} = require('./key');

//Initializations
const app = express();
require('./lib/passport');

//Configurations
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname , 'views'));


//View engine
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir:  path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middlewares - Security
app.use(session({
    secret: 'ofaaoficial',
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(database)
}));
//send messages through views
app.use(flash());
app.use(morgan('dev'));
//Management of get data
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());



//Global variables
app.use((req, res, next)=> {
    app.locals.msg = req.flash('msg');
    app.locals.errs = req.flash('errs');
    app.locals.err = req.flash('err');
    app.locals.user = req.user;
    next();
});

//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/books', require('./routes/books'));

//Public files
app.use(express.static(path.join(__dirname, 'public')));

//Starting server
app.listen(app.get('port'), ()=> {
    console.log(`Server on port : ${app.get('port')}`);
});




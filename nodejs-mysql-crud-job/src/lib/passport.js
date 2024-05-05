const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const pool = require('../database');
const {encryptPassword, matchPassword} = require('../lib/helpers');


//Sign up - Register
passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, username, password, done) =>{
    const {fullname, email} = req.body;
    const newUser = {
        username,
        password,
        fullname,
        email
    }
    newUser.password = await encryptPassword(newUser.password);
    const result = await pool.query('INSERT INTO users SET ?', [newUser], async (err, resQuery)=>{
        newUser.id =  resQuery.insertId;
        return done(null, newUser);
    });
}));

passport.serializeUser((usr, done) => {
    done(null, usr.id);
});

passport.deserializeUser(async (id, done)=> {
    await pool.query('SELECT * FROM users WHERE id = ?', [id], async (err, resQuery) =>{
        done(null, resQuery[0]);
    });
});


//Sign in - Login
passport.use('local.signin', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done)=> {
    console.log('hola');
    await pool.query('SELECT * FROM users WHERE username = ?', [username], async (err, resQuery) => {
        let user = await resQuery[0];
        if(!user) return done(null, false, req.flash('err', `The username does not exists.`));

        const validPassword = await matchPassword(password, user.password);
        if(validPassword) return done(null, user, req.flash('msg',`Welcome ${user.fullname}`));

        return done(null, null, req.flash('err',`Incorrect password`));
    });
}));
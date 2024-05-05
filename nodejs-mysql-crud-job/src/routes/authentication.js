const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedId } = require('../lib/auth');

const {check, validationResult } = require('express-validator');

const pool = require('../database');

const mutualValidations =
    [
        check('password')
            .isLength({ min: 3 }).withMessage('La contraseña debe tener minimo 3 caracteres.')
            .not().isEmpty().withMessage('La contraseña es obligatoria.'),
        check('username')
            .not().isEmpty().withMessage('El nombre de usuario es obligatorio.')
            .isLength({min: 3}).withMessage('El nombre de usuario debe tener minimo 3 caracteres.')
    ];

//Sign up - Register
router.get('/sign-up', isNotLoggedId, (req, res) => {
    res.render('auth/signup.hbs');
});


router.post('/sign-up', [
        isNotLoggedId,
        mutualValidations,
        check('fullname')
            .not().isEmpty().withMessage('Nombre completo obligatorio.'),
        check('email')
            // .custom(async value => {
            //     console.log(value);
            //     return await pool.query('SELECT * FROM users WHERE email = ?', [value], async (err, resQuery)=> {
            //         const User = await resQuery;
            //         if(User){
            //             return Promise.reject('Correo eletronico en uso.');
            //         }
            //
            //         return true;
            //     });
            // }).withMessage('en uso')
            .not().isEmpty().withMessage('Correo eletronico obligatorio.')
            .isEmail().withMessage('El correo eletronico debe ser valido.')
    ],
    async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        req.flash('errs', errors.errors);
        return res.redirect('/sign-up');
    }

    passport.authenticate('local.signup', {
        successRedirect: '/home',
        failureRedirect: '/sign-up',
        failureFlash: true
    })(req, res, next);
});

//Sign in - Login
router.get('/sign-in', isNotLoggedId, (req, res) => {
    res.render('auth/signin');
});



router.post('/sign-in', [
        isNotLoggedId,
        // password must be at least 5 chars long
        mutualValidations
    ],
    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            req.flash('errs', errors.errors);
            return res.redirect('/sign-in');
        }

    passport.authenticate('local.signin',{
        successRedirect: '/home',
        failureRedirect: '/sign-in',
        failureFlash: true
    })(req, res, next);
});

router.get('/home', isLoggedIn, (req, res) => {
    res.render('home');
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/sign-in');
});

module.exports = router;
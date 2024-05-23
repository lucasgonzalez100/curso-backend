const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../DAO/usersManager.js');
const { createHash, isValidPassword } = require('../utils/bcrypt.js');
const { Admin } = require('mongodb');

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            const { email } = req.body;
            try {
                const user = await User.findOne({ email });
                if (user) {
                    console.log('User already exists');
                    return done(null, false, { message: 'User already exists' });
                }
                const newUser = {
                    email,
                    username,
                    password: createHash(password),
                    role : "usuario"
                };

                const result = await User.create(newUser);
                return done(null, result);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use('login', new LocalStrategy(
        { usernameField: 'email' },
        async (username, password, done) => {
            try {
                const user = await User.findOne({ email: username });
                if (!user) {
                    console.log('User doesn\'t exist');
                    return done(null, false, { message: 'User doesn\'t exist' });
                }
                if (!isValidPassword(user, password)) {
                    return done(null, false, { message: 'Invalid password' });
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};

module.exports = initializePassport;

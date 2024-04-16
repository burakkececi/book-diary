import bcrypt from 'bcrypt';
import "dotenv/config";
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth2';
import LocalStrategy from 'passport-local';
import sequelize from '../dataAccess/index.js';
import colors from "colors";

const saltRounds = 10;
const { User } = sequelize.models;

// Local login
const getLoginPage = (req, res, next) => {
    res.render("pages/login");
}

const loginWithEmailAndPassword = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/auth/login"
    })(req, res, next);
}

// Google auth
const loginWithGoogle = (req, res, next) => {
    passport.authenticate('google', {
        scope: ['email', 'profile']
    })(req, res, next);
}

const redirectLoginWithGoogle = (req, res, next) => {
    passport.authenticate("google", {
        successRedirect: "/dashboard",
        failureRedirect: "/auth/login",
        scope: ['email', 'profile']
    })(req, res, next);
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/auth/login');
}

// Register
const getRegisterPage = (req, res, next) => {
    res.render("pages/register.ejs");
}

const registerWithEmailAndPassword = async (req, res, next) => {
    const { registerEmail, registerUsername, registerPassword } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email: registerEmail } });
        if (existingUser) {
            return res.status(409).send(`The specified email ${registerEmail} address already exists.`);
        } else {
            try {
                bcrypt.hash(registerPassword, saltRounds, async (err, hash) => {
                    if (err) {
                        console.log(colors.red("Error hashing password!"));
                    } else {
                        const user = await User.create({
                            email: registerEmail,
                            username: registerUsername,
                            password: hash
                        });

                        if (user) {
                            console.log(colors.green(`Created User ${JSON.stringify(user, null, 4)}`));
                            return res.status(201).redirect("/auth/login");
                        }
                    }
                });
            } catch (err) {
                console.log(colors.red(`Error occurred saving User ${err}`));
            }
        }
    } catch (err) {
        throw err;
    }
}

const getRegisterSuccessPage = (req, res, next) => {
    return res.render("pages/registerSuccess");
}

// Logout
const logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    })
}

// Strategies
passport.use(
    "local",
    new LocalStrategy(
        {
            usernameField: 'loginEmail',
            passwordField: 'loginPassword',
        },
        async function verify(username, password, cb) {
            try {
                const user = await User.findOne({ where: { email: username } });
                if (user !== null) {
                    const storedHashedPassword = user.password;
                    bcrypt.compare(password, storedHashedPassword, (err, valid) => {
                        if (err) {
                            console.log(colors.red("Error comparing password!"));
                            return cb(err);
                        } else {
                            if (valid) return cb(null, user);
                            else return cb(null, false);
                        }
                    })
                } else {
                    console.log(colors.red("User not found!"));
                    return cb(null, false);
                }
            } catch (error) { console.log(error); }
        }))

passport.use("google",
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/dashboard",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                console.log(profile)
                const [user, created] = await User.findOrCreate({
                    where: { email: profile.email },
                    defaults: {
                        email: profile.email,
                        username: profile.displayName,
                        password: "googleAccount"
                    }
                });
                if (created) console.log(colors.yellow("New google user created."));
                if (user) return cb(null, user);

            } catch (error) {
                return cb(error);
            }
        }
    )
)

// Serialize
passport.serializeUser((user, cb) => {
    console.log("serialize");
    process.nextTick(function () {
        return cb(null, {
            id: user.id,
            username: user.username,
            email: user.email
        });
    })

});

passport.deserializeUser((user, cb) => {
    console.log("deserialize");
    process.nextTick(function () {
        return cb(null, user);
    })
})


export default {
    getLoginPage,
    loginWithEmailAndPassword,
    loginWithGoogle,
    isLoggedIn,
    redirectLoginWithGoogle,
    getRegisterPage,
    registerWithEmailAndPassword,
    getRegisterSuccessPage,
    logout
};
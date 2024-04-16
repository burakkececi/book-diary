// 1. user can choose a books from list.
// 2. user add book notes about the choosen book.
// 3. user delete its book note.
// 4. user update the book note: title and content
// 5. user delete the book note entirely.
// 6. user see its book notes.

import express from "express";
import session from "express-session";
import passport from "passport";
import flash from "express-flash";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import { rateLimit } from 'express-rate-limit'
import sequelize from "./dataAccess/index.js";
import path from "path";

const app = express()
const PORT = process.env.APP_PORT || 3000;
const __dirname = import.meta.dirname;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "http://books.google.com/books/"],
            scriptSrc: ["'self'", "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/"], // allow bootstrap requests
            styleSrc: ["'self'", "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/"]
        },
    },
}));

app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // https: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: "You reached max usage limit of API!",
})

app.use(limiter)
app.use("/", routes)

app.get("/test", (req, res, next) => {
    res.send("Hello");
})

// error handling
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message })
})

// sync database
sequelize
    .sync()
    .then((result) => {
        console.log("Database connected.");
        app.listen(PORT, () => {
            console.log(`Starting Express server on http://localhost:${PORT}`);
        })
    })
    .catch((err) => { console.log(err); });


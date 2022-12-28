if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
}
const methodOverride = require('method-override')
const express = require('express')
const app = express()
const passport = require('passport')
const bcrypt = require('bcrypt')
const initializePassport = require('./passportConfig')
const flash = require('express-flash')
const session = require('express-session')

initializePassport(passport, email => {
    return users.find(user => user.email === email)
},
    id => {
        return users.find(user => user.id === id)
    }
)
const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false
}))
app.use(methodOverride('_method'))

app.use(passport.initialize())
app.use(passport.session())

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
})
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)
        users.push({
            id: Date.now().toString(),
            name: name,
            email: email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch (error) {
        res.redirect('/register')
    }
    console.log(users)
})

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    }
    res.redirect('/login')
}
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}


app.listen(3000, () => {
    console.log("Listening to port 3000")
})
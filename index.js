const express = require('express')
const app = express()
const path = require('path')
const querystring = require('querystring')
const ejsMate = require('ejs-mate')
const dotenv = require("dotenv").config()
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const paginatedResults = require('./middleware/pagination')
const methodOverride = require('method-override')
const userManagement = require('./models/userManagement')
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_ATLAS_USERNAME}:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.mfsduzy.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("connection open")
    })
    .catch((err) => {
        console.log("error found")
        console.log(err)
    })
app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// Routes
// Displaying all the user name
app.get('/roles',(req,res)=> {
    res.render('home')
})
app.get("/", (req, res) => {
    const query = querystring.stringify({ page: '1' });
    res.redirect(`/users?${query}&limit=10`);
})


// To show all the users inside the database
app.get('/users',paginatedResults(userManagement),async (req, res) => {
    const {next,previous,users,count} = res.paginatedResults
    let totalPages;
    if(!Number.isInteger(count/10)){
        totalPages = Math.floor(count/10) + 1
    }else {
        totalPages = Math.floor(count/10) 
    }
    res.render('UM/index', { users ,previous,next,totalPages})
})
// To create a new user info
app.get('/users/new', async (req, res) => {
    res.render('UM/new')
})
// To see the info of a specfic user
app.post('/users', async (req, res) => {
    const newUser = new userManagement(req.body)
    await newUser.save(() => {
        console.log("new user added successfully")
    })
    res.redirect('/users')
})
// To show a specific user
app.get('/users/:id', async (req, res) => {
    const { id } = req.params
    // Find user by id
    const user = await userManagement.findById(id)
    res.render('UM/show', { user })
})
// To show a edit form for a specific user
app.get('/users/:id/edit', async (req, res) => {
    const { id } = req.params
    // Find user by id
    const user = await userManagement.findById(id)
    res.render('UM/edit', { user })
})
app.patch('/users/:id', async (req, res) => {
    const { id } = req.params
    await userManagement.findByIdAndUpdate(id, req.body)
    res.redirect(`/users/${id}`)
})
// To delete a specific user
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    await userManagement.findByIdAndDelete(id)
    res.redirect('/users')
})
app.listen(3000, () => {
    console.log("Serving on port 3000")
})
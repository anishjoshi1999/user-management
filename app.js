const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const methodOverride = require('method-override')
const userManagement = require('./models/userManagement')
mongoose.connect('mongodb://localhost:27017/user-management')
.then(() => {
    console.log("connection open")
})
.catch((err) => {
    console.log("error found")
    console.log(err)
})
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))


// Routes

app.get('/',(req,res)=> {
    res.render('index')
})
app.listen(3000, () => {
    console.log("Serving on port 3000")
})
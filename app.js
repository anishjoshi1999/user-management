const express = require('express')
const app = express()
const { ROLE, users } = require('./data')
const projectRouter = require('./routes/projects')
const { authUser, authRole } = require('./basicAuth')
app.use(express.json())
app.use(setUser)
app.use('/projects', projectRouter)

app.get('/', authUser, (req, res) => {
    res.send('Home Page')
})

app.get('/dashboard', authUser, (req, res) => {
    res.send('Dashboard Page')
})

app.get('/admin', authUser, authRole(ROLE.BASIC), (req, res) => {
    res.send('Admin Page')
})

function setUser(req, res, next) {
    const userId = req.body.userId
    if (userId) {
        req.user = users.find(user => user.id === userId)
    }
    next()
}

app.listen(3000)
// Fetch some random data from an API and upload it into the user management database.
const mongoose = require('mongoose')
const userManagement = require('./models/userManagement')
const superagent = require('superagent');
const userInfo = []
mongoose.connect('mongodb://localhost:27017/user-management')
    .then(() => {
        console.log("connection open")
    })
    .catch((err) => {
        console.log("error found")
        console.log(err)
    })
const seeds = async () => {
    await userManagement.deleteMany({})
    await userManagement.insertMany(userInfo)
        .then((res) => {
            console.log(res)
        })
        .catch((e) => {
            console.log(e)
        })
}

(async () => {
    try {
        const res = await superagent.get('https://dummyjson.com/users');
        const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
        console.log('Status Code:', res.statusCode);
        console.log('Date in Response header:', headerDate);
        const users = (JSON.parse(res.text)).users
        users.forEach((user) => {
            const { firstName, lastName, email, age, address } = user
            const location = address.address
            userInfo.push({ firstName, lastName, email, age, location })
        })
        seeds()
    } catch (err) {
        console.log(err.message); //can be console.error
    }
})();
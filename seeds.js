// Fetch some random data from an API and upload it into the user management database.
const mongoose = require('mongoose')
const userManagement = require('./models/userManagement')
const superagent = require('superagent');
const dotenv = require("dotenv").config()
const userInfo = []
const conn_str = `mongodb+srv://anishjoshi2056:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.mfsduzy.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(conn_str)
    .then(() => {
        console.log("connection open")
    })
    .catch((err) => {
        console.log("error found")
        console.log(err)
    })
const seeds = async () => {
    await userManagement.deleteMany({})
    console.log("All previous data deleted successfully")
    await userManagement.insertMany(userInfo)
        .then((res) => {
            console.log(res)
        })
        .catch((e) => {
            console.log(e)
        })
    console.log("New data Added successfully")
}

(async () => {
    try {
        /*  phone:String,
    birthDate:String,
    image:String,
    bloodGroup:String,
    eyeColor:String,
    height:Number,
    weight:Number*/
        const res = await superagent.get('https://dummyjson.com/users');
        const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
        console.log('Status Code:', res.statusCode);
        console.log('Date in Response header:', headerDate);
        const users = (JSON.parse(res.text)).users
        users.forEach((user) => {
            const { firstName, lastName, email, age, gender, phone, birthDate, image, bloodGroup, eyeColor, height, weight } = user
            const { address } = user.address
            userInfo.push({ firstName, lastName, email, age, address, gender, phone, birthDate, image, bloodGroup, eyeColor, height, weight })
        })
        seeds()
    } catch (err) {
        console.log(err.message); //can be console.error
    }
})();
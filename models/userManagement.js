const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userManagementSchema = new Schema({
    firstName:String,
    lastName:String,
    gender:Number,
    age:Number,
    email:String,
    address:String
})

module.exports = mongoose.model('userManagement',userManagementSchema)
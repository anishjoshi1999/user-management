const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userManagementSchema = new Schema({
    firstName:String,
    lastName:String,
    gender:String,
    age:Number,
    email:String,
    address:String,
    // new schema
    phone:String,
    birthDate:String,
    image:String,
    bloodGroup:String,
    eyeColor:String,
    height:Number,
    weight:Number

})

module.exports = mongoose.model('userManagement',userManagementSchema)
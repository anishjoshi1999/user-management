const express = require('express')
const app = express()
const userManagement = require('../models/userManagement')
const mongoose = require('mongoose')
const paginatedResults = (model) => {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const results = {}

        if (endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try {
            results.users = await userManagement.find().limit(limit).skip(startIndex).exec()
            results.count = await userManagement.countDocuments();
            res.paginatedResults = results
            next()

        } catch (error) {
            res.status(500).json({ message: error.message })

        }
    }
}


module.exports = paginatedResults
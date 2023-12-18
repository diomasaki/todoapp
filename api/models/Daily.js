const mongoose = require("mongoose")

const DailySchema = new mongoose.Schema({
    title: {type: String, required: true},
    note: {type: String, required: true}
}, {timestamps: true})

module.exports = mongoose.model("Daily", DailySchema)
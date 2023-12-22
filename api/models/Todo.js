const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    date: {type: String},
    subtask: [
        {type: String}
    ],
    taskType: {type: String, required: true},
    isChecked: {type: Boolean, default: false},
    isOwner: {type: String, required: true}
}, {timestamps: true})

module.exports = mongoose.model("Todo", TodoSchema)
const routes = require("express").Router()
const Todo = require("../models/Todo")
const { STATUS } = require("./status")

//Create Task
routes.post("/c", async (req, res) => {
    try{
        const todo = new Todo({...req.body})
        const data = await todo.save()
        return STATUS(res, 201, "Success", "Task created!", data)
    }catch(err) {
        return STATUS(res, 500, "Failed", "Something went wrong!", err)
    }

})

//Update Task
routes.put("/update/:id", async (req,res) => {
    try{
        const updateOne = await Todo.findByIdAndUpdate(req.params.id, {$set: req.body})
        .then((data) => {return data.set(req.body)})
        .catch((err) => {return STATUS(res, 403, "Failed", "Something wrong on this update process!", err)})
        console.log(updateOne)
        return STATUS(res, 200, "Success", "Task updated!", updateOne)
    }catch (err) {
        return STATUS(res, 500, "Failed", "Something went wrong!", err)
    }
})

//Delete Task
routes.delete("/:id", async (req,res) => {
    try{
        const task = await Todo.findByIdAndDelete(req.params.id)
        return STATUS(res, 200, "Success", "Task deleted!", task)
    }catch (err) {
        return STATUS(res, 500, "Failed", "Task not valid! and not deleted!", err)
    }
})

//Get All Task
routes.get("/", async (req, res) => {
    try{
        const task = await Todo.find()
        return STATUS(res, 200, "Success", "Get All Task", task)
    }catch (err) {
        return STATUS(res, 500, "Failed", "Something went wrong!", err)
    }
})


//Get User Task
routes.get("/:id", async (req, res) => {
    try{
        const task = await Todo.find({ isOwner: req.params.id })
        if (!task) return STATUS(res, "401", "Failed", "Task not found!", "User Not Authenticated!")
        return STATUS(res, 200, "User Authenticated!", "Task Received!", task )
    }catch (err) {
        return STATUS(res, 500, "Failed", "User Not Authenticated!", err)
    }
})

module.exports = routes;
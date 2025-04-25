import { asyncHandler } from "../utils/asynchandler";
import { ApiResponse } from "../utils/ApiResponse";
import { validationResult } from "express-validator";
import { Todo } from "../models/todo.model";
import mongoose from "mongoose";


const createTodo = asyncHandler(async (req, res) => {
    const adminId = req.admin._id;
    const { userId } = req.params
    if (!userId) return res.status(400).json(ApiResponse.error(400, 'User id is required'))

    const userMongooseId = mongoose.Types.ObjectId(userId)
    const errors = validationResult(req)
    if (!errors) return res.status(400).json(ApiResponse.error(400, errors.array(), 'Validation error'))

    const { title, description } = req.body
    console.log(title, description)

    const isTodoExists = await Todo.findOne({ title, createdBy: adminId, assignedTo: userMongooseId })
    if (isTodoExists) return res.status(400).json(ApiResponse.error(400, 'Todo already exist'))

    const newTodo = await Todo.create({
        title,
        description,
        createdBy: adminId,
        assignedTo: userMongooseId
    })

    if (!newTodo) return res.status(400).json(ApiResponse.error(400, 'Error while creating todo'))

    return res.status(201).json(ApiResponse.success(201, newTodo, 'Todo successfully created'))
})

const updateTodo = asyncHandler(async (req, res) => {
    const { todoId } = req.params
    const { title, description } = req.body
    const todoMongooseId = mongoose.Types.ObjectId(todoId)
    if (!todoId) return res.status(400).json(400, 'Todo id is required')

    const isTodoExists = await Todo.findOne({ _id: todoMongooseId, isDeleted: false })
    if (isTodoExists) return res.status(400).json(ApiResponse.error(400, "Todo doesn't exist"))

    const updatedTodo = await Todo.findByIdAndUpdate(
        todoMongooseId,
        { description, title },
        { new: true }
    )
    if (!updatedTodo) return res.status(400).json(400, 'Error while updating todo')

    return res.status(200).json(ApiResponse.success(200, updatedTodo, 'Todo successfully updated'))
})


export {
    createTodo,
    updateTodo
}
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { validationResult } from "express-validator";
import { Todo } from "../models/todo.model.js";
import mongoose from "mongoose";
import { Admin } from "../models/admin.model.js";


const createTodo = asyncHandler(async (req, res) => {
    const adminId = req.admin._id;
    const { userId } = req.params
    if (!userId) return res.status(400).json(ApiResponse.error(400, 'User id is required'))

    const userMongooseId = new mongoose.Types.ObjectId(userId)
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
    const { title, description, status, priority, completedAt, dueTo } = req.body
    if (!todoId) return res.status(400).json(ApiResponse.error(400, 'Todo id is required'))

    const todoMongooseId = new mongoose.Types.ObjectId(todoId)

    const isTodoExists = await Todo.findOne({ _id: todoMongooseId, isDeleted: false })
    if (!isTodoExists) return res.status(400).json(ApiResponse.error(400, "Todo doesn't exist"))

    const updatedTodo = await Todo.findByIdAndUpdate(
        todoMongooseId,
        {
            description,
            title,
            isDeleted: false,
            status,
            priority,
            completedAt,
            dueTo
        },
        { new: true }
    )
    if (!updatedTodo) return res.status(400).json(400, 'Error while updating todo')

    return res.status(200).json(ApiResponse.success(200, updatedTodo, 'Todo successfully updated'))
})

const toggleDeleteTodo = asyncHandler(async (req, res) => {
    const { todoId } = req.params;
    const todoMongooseId = new mongoose.Types.ObjectId(todoId)

    const todo = await Todo.findById(todoMongooseId);
    if (!todo) return res.status(400).json(ApiResponse.error(400, "Todo doesn't exist"));

    const deletedTodo = await Todo.findByIdAndUpdate(
        todoMongooseId,
        { isDeleted: !todo.isDeleted },
        { new: true }
    );

    if (!deletedTodo) return res.status(400).json(ApiResponse.error(400, "Todo doesn't exist"));

    return res.status(200).json(ApiResponse.success(200, deletedTodo, 'Todo successfully deleted'))

})

const getAllTodos = asyncHandler(async (req, res) => {
    const adminId = req.admin._id
    const { page = 1, limit = 10 } = req.query;

    const options = {
        page: Number(page),
        limit: Number(limit)
    }

    const AdminTodoAggregate = [
        {
            $match: { createdBy: adminId, isDeleted: false }
        },
        {
            $lookup: {
                from: 'users',
                foreignField: '_id',
                localField: 'assignedTo',
                as: 'Employees',
                pipeline: [{
                    $project: {
                        avatar: 1,
                        coverImage: 1,
                        fullName: 1
                    }
                }]
            }
        },
    ]

    const todoPaginate = await Todo.aggregatePaginate(Todo.aggregate(AdminTodoAggregate), options)
    if (!todoPaginate) return res.status(400).json(ApiResponse.error(400, 'No todo found'))

    return res.status(200).json(ApiResponse.success(200, todoPaginate, 'Successfully all todoes are fetched'))
})

export {
    createTodo,
    updateTodo,
    toggleDeleteTodo,
    getAllTodos
}
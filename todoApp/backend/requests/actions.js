const logger = require('tracer').console();
const Task = require('../schema/schema');

const create = () =>
    async (req, res) => {
        try {
            const userName = req.user.userName;
            const todoData = req.body.todoData;
            const todo = await Task.create({ todoData, userName });
            res.json(todo);
        } catch (error) {
            logger.log(error);
            throw error;
        }
    };

const getAll = () =>
    async (req, res) => {
        try {
            const userName = req.user.userName;
            const todo = await Task.find({ userName });
            res.json(todo);
        } catch (error) {
            throw new Error(error);
        }
    };

const update = () =>
    async (req, res) => {
        try {
            const todoData = req.body.todoData;
            const isDone = req.body.isDone;
            const id = req.params.id;
            const todo = await Task.findOneAndUpdate({ _id: id }, { $set: { todoData, isDone } }, { new: true });
            res.json(todo);
        } catch (error) {
            logger.log(error);
            throw error;
        }
    };

const remove = () =>
    async (req, res) => {
        try {
            const id = req.params.id;
            const todo = await Task.findOneAndRemove({ _id: id });
            res.json(todo);
        } catch (error) {
            logger.log(error);
            throw error;
        }
    };

module.exports = {
    create,
    update,
    remove,
    getAll
};

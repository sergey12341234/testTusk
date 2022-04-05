const { Schema, model } = require('mongoose');

const dbSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    todoData: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Task', dbSchema);

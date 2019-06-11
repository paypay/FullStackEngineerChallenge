const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', index: true, required: true },
    name: String,
    department: String,
    post: String,
    created: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', index: true, required: true },
    createdAt: Date,
    updatedAt: Date,
});

mongoose.model('Employees', employeeSchema);
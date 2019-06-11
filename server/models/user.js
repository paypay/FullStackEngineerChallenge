const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: { type: String, required: true, default: 'admin' },
  password: { type: String, default: 'admin' }
});

mongoose.model('Users', userSchema);

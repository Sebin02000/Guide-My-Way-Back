// user model with mongoose
 const mongoose = require('mongoose');
const { token } = require('morgan');
    const Schema = mongoose.Schema;
    const userSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        token: {
            type: String
        },
        isVerified: {
            type: Boolean,
            default: false
        }


    });
    const User = mongoose.model('User', userSchema);
    module.exports = User;

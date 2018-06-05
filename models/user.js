const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type:String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    favoriteBook: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});
// hash password before saving to database
UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            next(err);
        }
        user.password = hash;
        next();
    });
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
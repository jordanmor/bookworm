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
// authenticate input against database documents
UserSchema.statics.authenticate = function(email, password, callback) {
    User.findOne({email: email})
        .exec(function (error, user) {
            if(error) {
                return callback(error);
            } else if ( !user ) {
                const err = new Error('User not found');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function(error, result)) {
                if(result === true) {
                    return callback(null, user);
                } else {
                    return callback;
                }
            }
        });
}
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
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
UserSchema.statics.authenticate = (email, password, callback) => {
    User.findOne({email: email})
        .exec( (error, user) => {
            if(error) {
                callback(error);
            } else if ( !user ) {
                const err = new Error('User not found');
                err.status = 401;
                callback(err);
            }
            bcrypt.compare(password, user.password, (error, result) => {
                if(result === true) {
                    callback(null, user);
                } else {
                    callback();
                }
            });
        });
};
// hash password before saving to database
UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            next(err);
        }
        user.password = hash;
        return next();
    });
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
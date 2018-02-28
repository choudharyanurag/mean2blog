const bcrypt = require('bcrypt-nodejs');
const Validator = require('../utils/validators.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


/* Validators */

let validateEmailLength = (email) => {
    return Validator.Validate.vallength(email, 5, 256);
};

let validateEmailRegex = (email) => {
    return Validator.Validate.regexp(email,
        new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));
};

const emailValidators = [
    {
        validator: validateEmailLength,
        message: 'We think a valid email should be at least 5 characters long but less than 256!'
    },
    {
        validator: validateEmailRegex,
        message: 'Be genuine, a valid email should pass you thru!'
    }
];

let validatePasswordLength = (password) => {
    return Validator.Validate.vallength(password, 8, 50);
};

let validatePasswordRegex = (password) => {
    return Validator.Validate.regexp(password,
        new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,50}$/));
};

const passwordValidators = [
    {
        validator: validatePasswordLength,
        message: 'Create a better password! We insist at least 8 characters long but less than 50!'
    },
    {
        validator: validatePasswordRegex,
        message: 'While creating a password use at least one capital character, one digit!'
    }
];

let validateUsernameLength = (username) => {
    return Validator.Validate.vallength(username, 6, 128);
};

let validateUsernameRegex = (username) => {
    return Validator.Validate.regexp(username,
        new  RegExp(/^[a-zA-Z0-9]+$/));
};

const usernameValidators = [
    {
        validator: validateUsernameLength,
        message: 'Create a better user name! We insist at least 6 characters long but less than 128!'
    },
    {
        validator: validateUsernameRegex,
        message: 'You are special! But we hate special characters in name!!'
    }
];


/* Validators End */


const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
    username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators },
    password: { type: String, required: true, validate: passwordValidators }
});

function encryptOnSave(next) {
    if (!this.isModified('password')) {
        return next();
    }

    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.password = hash;
        next();
    });
}

userSchema.pre('save', encryptOnSave);

userSchema.methods.checkPassword = (password,user) => {
    console.log(this.password);
    console.log(password);
    return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', userSchema);
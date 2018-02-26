const bcrypt = require('bcrypt-nodejs');
const Validator = require('../utils/validators');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

/* Validators */

let validateEmailLength = (email) => {
    return Validator.vallength(email, 5 , 256 );
    return true;

};

let validateEmailRegex = (email) => {
    return Validator.regex(email,
        new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));
    return true;
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

/* Validators End */


const userSchema = new Schema({
    email : {type:String, required: true, lowercase:true, validate: emailValidators },
    username : {type:String, required: true, lowercase:true},
    password : {type:String, required: true}
});

function encryptOnSave(next){
    if(!this.isModified('password')){
        return next();
    }

    bcrypt.hash(this.password, null, null, (err,hash)=>{
        if(err) {
            return next(err);
        }
        this.password = hash;
        next();
    });
}

userSchema.pre('save', encryptOnSave );

userSchema.methods.checkPassword = password => {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User',userSchema);
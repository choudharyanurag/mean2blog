const User = require('../models/user');
const helpers = require('../utils/helpermethods');

module.exports = (router) => {

    function addStringToErrorMessage(errorMessage, err){
        if(!errorMessage){
            errorMessage = err;
        }
        else{
            errorMessage +='\n';
            errorMessage +=err;
        }
        return errorMessage;
    }

    router.post('/register', (req,res)=>{
        let errMessage = null;
        if(!req.body.email){
            errMessage = addStringToErrorMessage(errMessage ,'Email is your token of identity, provide a valid one.');
        }
        if(!req.body.username){
            errMessage = addStringToErrorMessage(errMessage ,'Get identified. Tell us a unique name!');
        }
        if(!req.body.password){
            errMessage =  addStringToErrorMessage(errMessage ,'Secure yourself, provide a password!');
        }

        if(errMessage){
            res.json({success:false, message:errMessage});
        } else {
            let user = new User({
                email: req.body.email.toLowerCase(),
                username: req.body.username.toLowerCase(),
                password: req.body.password
            });
            
            user.save((err) => {
                if(err){
                    if(err.code===11000 ){
                        res.json({ success: false, message: 'Be unique, Username is already taken or email already in use' });
                    }
                }else{
                    res.json({success :true, message : 'We are working on it'});
                }
            });
        }


    });

    return router;
}
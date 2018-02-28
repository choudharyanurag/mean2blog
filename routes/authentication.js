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
        console.log(req.body);
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

            console.log(user);
            
            user.save((err) => {
                let modelSaveError = null;
                if(err){
                    console.log(err);
                    if(err.code===11000 ){
                        modelSaveError = addStringToErrorMessage( modelSaveError, 'Be unique, Username is already taken or email already in use' );
                    }
                    if (err.errors) {
                        if (err.errors.email) {
                            modelSaveError = addStringToErrorMessage( modelSaveError,err.errors.email.message ); 
                        }
                        if (err.errors.username) {
                            modelSaveError = addStringToErrorMessage( modelSaveError,err.errors.username.message ); 
                        }
                        if (err.errors.password) {
                            modelSaveError = addStringToErrorMessage( modelSaveError, err.errors.password.message );
                        }
                    }
                    res.json({success :false , message : modelSaveError});
                }else{
                    res.json({success :true, message : 'Saved successfully.'});
                }
            });
        }


    });

   

    return router;
}
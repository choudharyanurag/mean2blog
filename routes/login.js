const User = require('../models/user');
const helpers = require('../utils/helpermethods');

module.exports = (router) => {

router.post('/login', (req, res) => {
    if (!req.body.username) {
      res.json({ success: false, message: 'Please enter a user name' }); 
    } else {
      if (!req.body.password) {
        res.json({ success: false, message: 'Please enter a password' }); 
      } else {
        User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
            console.log(user);
          if (err) {
            res.json({ success: false, message: err }); 
          } else {
            if (!user) {
              res.json({ success: false, message: 'User name not available' });
            } else {
              const validPassword = user.checkPassword(req.body.password,user); 
              if (!validPassword) {
                res.json({ success: false, message: 'Password did not match with user' }); 
              } else {
                const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' }); 
                res.json({
                  success: true,
                  message: 'Success!',
                  token: token,
                  user: {
                    username: user.username
                  }
                }); 
              }
            }
          }
        });
      }
    }
  });
  return router;
}
const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

const userService = require('../models/usersModel');


passport.use(new LocalStrategy({usernameField: 'email',},
    async function(email, password, done) {
        const user = await userService.Signin(email, password);
        if (!user) {
            return done(null, false, { message: 'Email không tồn tại!!' });
        }
        else if(user === -1){
            return done(null, false, { message: 'Mật khẩu không chính xác!!' });
        }
        return done(null, user);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    userService.getAccount(id).then((user)=>{
        done(null, user)
    })
})

module.exports = passport;
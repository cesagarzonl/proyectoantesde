var mongoose = require('mongoose');
var User = require("./models/user").User;
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;


module.exports = function(passport, req, res) {
    
     passport.serializeUser(function(user, done) {
        done(null, user);
    });

     passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

     passport.use(new TwitterStrategy({
        consumerKey: 'sxFIfvR7nadUHJ9PbHtv5oKir',
        consumerSecret: 'YqorWdAvyejqkQwPyGb07xPtFkdtdAi7ygPagCQMZcxZrcFUPH',
        callbackURL: '/auth/twitter/callback'
    },function( accessToken, refreshToken, profile, done) {

        User.findOne({email:profile.id+"@"+profile.provider+".com",password:profile.provider+profile._json.id_str}, function(err,user) {           
            if(err) throw(err);
            if(!err && user!= null) return done(null, user);
            var user = new User({
                provider: profile.provider,
                username: profile.displayName,
                email: profile.id+"@"+profile.provider+".com",
                password: profile.provider+profile._json.id_str,
                password_confirmation: profile.provider+profile._json.id_str,
            });
            console.log(String(user))
            user.save(function(err) {
                if(err) throw err;
                done(null, user);
            });
        });
    }));
   passport.use(new FacebookStrategy({
        clientID: '307641636238253',
        clientSecret: '5aeb1faf6354f50cfa2b3a3ca65dadf6',
        callbackURL: '/auth/twitter/callback'
    }, function(accessToken, refreshToken, profile, done) {
        User.findOne({password:profile.provider+profile._json.id_str,username:profile.displayName}, function(err,user) {

            if(err) throw(err);
            if(!err && user!= null) return done(null, user);
            var user = new User({
                provider: profile.provider,
                username: profile.displayName,
                email: profile.id+"@"+profile.provider+".com",
                password: profile.provider+profile._json.id_str,
                password_confirmation: profile.provider+profile._json.id_str,
            });
            console.log(String(user))
            user.save(function(err) {
                if(err) throw err;
                done(null, user);
            });
        });
    }));
}
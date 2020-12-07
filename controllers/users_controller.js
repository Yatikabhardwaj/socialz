
const User = require('../models/user');


module.exports.profile= function (req,res){
    return res.render('user_profile',{
        title: "User Profile"
    });
}

//renders the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title:"Codeial | sign up"
    })
}

//renders the sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: "Codeial | sign in"
    })
}

module.exports.posts = function(req,res){
    res.end('<h1>User Posts</h1>');
}

//get sign up data
module.exports.create = function(req,res){
    console.log('HelloHello');
    if(req.body.password != req.body.confirm_password){
         return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
    if(err){
        console.log('Error in finding user in signing up');
        return;
    }
    if(!user){
        User.create(req.body,function(err,user){
            if(err){
                console.log('Error in creating user while signing up');
                return;
            }
            return res.redirect('/users/sign-in');
        
    })
   }
   else{
       return res.redirect('back');
   }
 });
}

//get sign in data and create session for user
module.exports.createSession = function(req,res){

}

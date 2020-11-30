module.exports.profile= function (req,res){
    return res.render('user_profile',{
        title: "User Profile"
    });
}

module.exports.posts = function(req,res){
    res.end('<h1>User Posts</h1>');
}
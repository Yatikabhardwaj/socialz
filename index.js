const express = require('express');
const app = express();
const port = 8000;

app.listen(port, function(err){
if(err){
    // console.log(err,'error encountered in starting the server');
    console.log(`Error in running the server: ${port}`);
    return;
}
console.log(`server iss running on port: ${port}`);
});
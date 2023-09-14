const mysql = require("mysql2")
const data =mysql.createConnection({
    
    host:"localhost",
    user:"root",
    password:"",
    database:"form",
    port:3306
});
data.connect((err)=>{
    if(err) console.error('error connecting:'+err.stack);
    console.log("connection created..!!");

});

module.exports.data=data; 
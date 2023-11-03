const User = require("../models/usersModel");
const bcrypt = require("bcrypt");

let resetpassword = async (req, res) => {
    const {email, newpassword } = req.body;

    bcrypt.hash(newpassword, 10, async function (err, hash) {
        
       
       await User.findOneAndUpdate({email},{password:hash})
       
  
       
  
        res.send({
          success: "Password Change Successful",
        });
      });



    
      

};

module.exports = resetpassword;

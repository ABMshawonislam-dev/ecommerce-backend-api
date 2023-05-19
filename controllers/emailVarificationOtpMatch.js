const User = require("../models/usersModel");

let emailvarificationOtpmatch = async (req, res) => {
  const { email, randomOtp } = req.body;

  let findOtp = await User.find({ email });

  if (findOtp.length > 0) {
    if (randomOtp == findOtp[0].randomOtp) {
      let removeOtpAfterMatch = await User.findOneAndUpdate(
        { email },
        { $unset: { randomOtp: "" } },
        { new: true }
      );
      res.json({ success: "OTP Match" });
    } else {
      res.json({ error: "OTP not Match" });
    }
  }

  console.log(email, randomOtp);
};

module.exports = emailvarificationOtpmatch;

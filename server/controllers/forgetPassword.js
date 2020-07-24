import jwt from 'jsonwebtoken';
import transporter from '../middlewares/transporter';
import model from '../models';

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log('email', email);
    const result = await model.Users.findOne({
      where: {
        email,
      },
    });
    if (result.length < 1) {
      res.status(400).send({
        message: `Sorry an Account with Email: ${email} doesn't exist`,
      });
    } else {
      const secret = result.password;
      const token = jwt.sign({ result }, secret, {
        expiresIn: 3600, // 1 hour
      });
      const url = `http://localhost:8080/resetPassword/${result.id}-${token}`;
      const mailOptions = {
        from: 'douglasjoseph166@gmail.com',
        to: email,
        subject: 'FORGOT PASSWORD',
        html: `Hello ${result.fullName}, 
                <br>
                <br>
                There was a request to reset your password
                <br>
                <br>
                Please click on the button below to get a new password
                <br>
                <br>
                <a href='${url}'><button>Reset Password</button></a>
                <br>
                <br>
                If you did not make this request, just ignore this email as nothing has changed.
                <br>
                <br>
                Best Regards,
                <br>
                The Ewallet Team!`,
      };
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          res.status(402).json({
            success: false,
            message: 'Failed to send e-mail reset Link',
          });
        } else {
          res.status(200).json({
            status: 'success',
            message: `A password reset link has been sent to ${email}`,
          });
        }
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export default forgetPassword;

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import model from '../models';
import shortid from 'shortid';
import signupValidation from '../validation/userSignup';

/** /register:
   post:
      description: client can register
      responses: "200"
       description: A successful registration
*/
const signUp = async (req, res) => {
  try {
    const { error } = signupValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const checkEmail = await model.Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (checkEmail) {
      return res.status(400).send({
        message: 'Email already used by another user.',
      });
    }
    const userData = await model.Users.create({
      fullName: req.body.fullName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      wallet_id: shortid.generate(),
    });

    const token = jwt.sign({ userData }, process.env.TOKEN_SECRET, {
      expiresIn: 86400, // 24 hours
    });
    const data = {
      id: userData.id,
      fullName: userData.fullName,
      email: userData.email,
      wallet_id: userData.wallet_id,
    };
    data.token = token;
    res.cookie('token', token);
    res.header('Authorization', token).status(200).send({
      data,
      message: 'User was registered successfully!',
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default signUp;

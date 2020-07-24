import Joi from 'joi';

const signupValidation = (data) => {
  const schema = {
    fullName: Joi.string().min(4).max(150).required(),
    email: Joi.string().email().min(3).max(150),
    password: Joi.string()
      .trim()
      .max(100)
      .required()
      .regex(/^[0-9]{7,15}$/),
  };
  return Joi.validate(data, schema);
};

export default signupValidation;

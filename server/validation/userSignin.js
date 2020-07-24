import Joi from 'joi';

const signinValidation = (data) => {
  const schema = {
    email: Joi.string().email().min(3).max(150),
    password: Joi.string()
      .trim()
      .max(100)
      .required()
      .regex(/^[0-9]{7,15}$/),
  };
  return Joi.validate(data, schema);
};

export default signinValidation;

import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import signUp from './controllers/userSignUp';
import signIn from './controllers/userSignin';
import forgetPassword from './controllers/forgetPassword';
import resetPassword from './controllers/resetPassword';
import accountRoute from './routes/account';
import getUsersRoute from './routes/getusers';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require('dotenv').config();

app.post('/api/signup', signUp);
app.post('/api/signin', signIn);
app.post('/forgetPassword', forgetPassword);
app.post('/resetpasstoken/:id-:token', resetPassword);

app.use('/api', accountRoute);
app.use('/api', getUsersRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening at: http://localhost:${PORT}`);
});

export default app;

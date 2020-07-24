import express from 'express';
import User from '../controllers/getUsers';
import verifyToken from '../middlewares/verifyToken';
const router = express.Router();

router.get('/users', User.getAllUsers);

export default router;

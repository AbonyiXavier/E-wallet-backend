import express from 'express';
import account from '../controllers/account';
const { getBalance, updateBalance } = account;
import verifyToken from '../middlewares/verifyToken';
const router = express.Router();

router.get('/account', verifyToken, getBalance);
// router.patch('/account', verifyToken, updateBalance);

export default router;

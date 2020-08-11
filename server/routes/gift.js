import express from 'express';
import Gift from '../controllers/gift';
const { transferFund } = Gift;
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.post('/transfer/:accountId', verifyToken, transferFund);

export default router;

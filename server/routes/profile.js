import express from 'express';
import profile from '../controllers/profile';
const { addProfile } = profile;
import verifyToken from '../middlewares/verifyToken';
import upload from '../middlewares/upload-photo';
const router = express.Router();

router.post('/profile', [verifyToken, upload.single('image')], addProfile);

export default router;

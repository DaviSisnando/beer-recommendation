import { Router } from 'express';
import { getRecommendation } from '../controllers/recommendation';

const router = Router();

router.post('/recommendation', getRecommendation);

export default router;
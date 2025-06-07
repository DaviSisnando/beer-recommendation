import { Router } from 'express';
import beerStyle from './beerStyle'

const router = Router();

router.use('/api', beerStyle);

export default router;


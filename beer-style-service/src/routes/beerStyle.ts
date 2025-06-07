import { Router } from 'express';
import { createBeerStyle, updateBeerStyle, deleteBeerStyle, getAllBeerStyles, getBeerStyle } from '../controllers/beerStyle';

const router = Router();

router.post('/beer', createBeerStyle);
router.put('/beer/:id', updateBeerStyle);
router.delete('/beer/:id', deleteBeerStyle);
router.get('/beer', getAllBeerStyles);
router.get('/beer/:id', getBeerStyle);


export default router;
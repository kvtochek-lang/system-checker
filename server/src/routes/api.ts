import { Router } from 'express';
import { checkCompatibility, getSoftwareList } from '../controllers/compatibilityController';

const router = Router();

router.post('/compatibility/check', checkCompatibility);
router.get('/compatibility/software', getSoftwareList);

export default router;

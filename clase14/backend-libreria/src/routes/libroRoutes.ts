import { Router } from 'express';
import { getLibros, createLibro, updateLibro, deleteLibro } from '../controllers/libroController.js';

const router = Router();

router.get('/', getLibros);
router.post('/', createLibro);
router.put('/:id', updateLibro);
router.delete('/:id', deleteLibro);

export default router;
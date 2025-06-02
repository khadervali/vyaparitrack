import express, { RequestHandler } from 'express';
import {
  addBranch,
  getBranches,
  getBranch,
  updateBranch,
  deleteBranch,
} from '../controllers/branchController';

const router = express.Router();

router.post('/', addBranch as RequestHandler);
router.get('/', getBranches as RequestHandler);
router.get('/:id', getBranch as RequestHandler);
router.put('/:id', updateBranch as RequestHandler);
router.delete('/:id', deleteBranch as RequestHandler);

export default router;
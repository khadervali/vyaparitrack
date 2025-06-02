import express from 'express';
import {
  getSalesOrders,
  getSalesOrder,
  createSalesOrder,
  updateSalesOrder,
  deleteSalesOrder,
} from '../controllers/salesOrderController';

const router = express.Router();

router.route('/').get(getSalesOrders).post(createSalesOrder);
router.route('/:id').get(getSalesOrder).put(updateSalesOrder).delete(deleteSalesOrder);

export default router;
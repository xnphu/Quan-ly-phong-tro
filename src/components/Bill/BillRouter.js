import { Router } from 'express';
import * as controller from './BillController';
import { throwAsNext, authMiddleware, requireLogin } from '../../middleware';

const path = '/bills';
const router = Router();

// route
router.get('', throwAsNext(controller.getAllBill));
router.get('/:id', throwAsNext(controller.getBillById));
router.post('', throwAsNext(controller.createBill));
router.put('/:id', throwAsNext(controller.updateBill));
router.delete('/:id', throwAsNext(controller.deleteBill));

// export
export default { path, router };

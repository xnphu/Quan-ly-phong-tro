import { Router } from 'express';
import * as controller from './CustomerController';
import { throwAsNext, authMiddleware, requireLogin } from '../../middleware';

const path = '/customers';
const router = Router();

// route
router.get('', throwAsNext(controller.getAllCustomer));
router.get('/:id', throwAsNext(controller.getCustomerByRoomId));
router.post('', throwAsNext(controller.createCustomer));
router.put('/:id', throwAsNext(controller.updateCustomer));
router.delete('/:id', throwAsNext(controller.deleteCustomer));

// export
export default { path, router };

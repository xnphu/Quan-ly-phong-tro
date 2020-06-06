import { Router } from 'express';
import * as controller from './ContractController';
import { throwAsNext, authMiddleware, requireLogin } from '../../middleware';

const path = '/contracts';
const router = Router();

// route
router.get('', throwAsNext(controller.getAllContract));
router.get('/:id', throwAsNext(controller.getContractById));
router.post('', throwAsNext(controller.createContract));
router.put('/:id', throwAsNext(controller.updateContract));
router.delete('/:id', throwAsNext(controller.deleteContract));

// export
export default { path, router };

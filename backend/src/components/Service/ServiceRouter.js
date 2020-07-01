import { Router } from 'express';
import * as controller from './ServiceController';
import { throwAsNext, authMiddleware, requireLogin } from '../../middleware';

const path = '/services';
const router = Router();

// route
router.get('', throwAsNext(controller.getAllService));
router.get('/:id', throwAsNext(controller.getServiceById));
router.post('', throwAsNext(controller.createService));
router.put('/:id', throwAsNext(controller.updateService));
router.delete('/:id', throwAsNext(controller.deleteService));

// export
export default { path, router };

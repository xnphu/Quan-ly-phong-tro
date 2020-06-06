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

router.get('/used', throwAsNext(controller.getAllUseService));
router.get('/used/:id', throwAsNext(controller.getUseServiceById));
router.get('/used/:roomID', throwAsNext(controller.getUseServiceByRoomId));
router.post('/used', throwAsNext(controller.createUseService));
router.put('/used/:id', throwAsNext(controller.updateUseService));
router.delete('/used/:id', throwAsNext(controller.deleteUseService));

// export
export default { path, router };

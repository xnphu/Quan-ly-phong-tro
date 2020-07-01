import { Router } from 'express';
import * as controller from './ServiceController';
import { throwAsNext, authMiddleware, requireLogin } from '../../middleware';

const path = '/use_services';
const router = Router();

// route
router.get('/', throwAsNext(controller.getAllUseService));
router.get('/:id', throwAsNext(controller.getUseServiceById));
router.get('/:roomID/room', throwAsNext(controller.getUseServiceByRoomId));
router.post('', throwAsNext(controller.createUseService));
router.put('/:id', throwAsNext(controller.updateUseService));
router.delete('/:id', throwAsNext(controller.deleteUseService));

// export
export default { path, router };

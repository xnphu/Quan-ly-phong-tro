import { Router } from 'express';
import * as controller from './RoomController';
import { throwAsNext, authMiddleware, requireLogin } from '../../middleware';

const path = '/rooms';
const router = Router();

// route
router.get('', throwAsNext(controller.getAllRoom));
router.get('/:roomId', throwAsNext(controller.getRoomById));
router.post('', throwAsNext(controller.createRoom));
// router.put('/:id', updatePostValidator, throwAsNext(controller.updateRoom));
// router.delete('/:id', throwAsNext(controller.deleteRoom));

// export
export default { path, router };

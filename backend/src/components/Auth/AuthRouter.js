import { Router } from 'express';
import * as controller from './AuthController';
import { loginValidator } from './validator';
import { throwAsNext, authMiddleware, requireLogin } from '../../middleware';

const path = '/auth';
const router = Router();

// route
// --- Get Me ---
router.get('/getme', throwAsNext(controller.getMe));
// --- Login ---
router.post('/login', loginValidator, throwAsNext(controller.login));
// --- Sign up ---
router.post('/signUp', throwAsNext(controller.signUp));
// --- Refresh Token ---
router.post('/refresh-token', throwAsNext(controller.refreshToken));
// registerSubrouter

// export
export default { path, router };

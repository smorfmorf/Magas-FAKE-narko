import { Router } from 'express';
import authController from './authController.js';
import { check } from 'express-validator'; //middleware
import authMiddleware from './authMiddleware.js';
import roleMiddleware from './roleMiddleware.js';
import { checkAuth } from './checkAuth.js';
import User from './models/User.js';

const router = new Router();
router.post(
    '/register',
    [
        check('userName', 'имя пользователя обязательное').notEmpty(),
        check('password', 'пароль не меньше 3 символов').isLength({ min: 4 }),
    ],
    authController.register,
);
router.post('/login', authController.login);

// маршрут который нужно защитить
router.get('/users', roleMiddleware(['ADMIN']), authController.getUsers);

router.get('/', checkAuth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json(user);
});

router.get('/logout', (req, res) => {
    res.clearCookie('access_token');
    res.status(200).json('Logout success');
});

export default router;

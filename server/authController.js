import User from './models/User.js';
import Role from './models/Role.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

class authController {
    async register(req, res) {
        try {
            // проверка на ошибки
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Ошибка при регистрации', errors });
            }

            const { userName, password } = req.body;
            // проверка есть ли такой юзер есть вернем ошибку, иначе хешируем пр находим роль и создаем юзера в бд
            const user = await User.findOne({ userName });
            console.log('user: ', user);
            if (user) {
                return res.status(400).json({ message: 'такой пользователь уже есть' });
            }

            // пр в открытом виде в бд не храним
            const hashPassword = await bcrypt.hashSync(password, 5);

            const userRole = await Role.findOne({ value: 'ADMIN' });
            const doc = new User({ userName, password: hashPassword, roles: [userRole.value] });
            const newUser = await doc.save(); //сохраняем пользователя в БД

            return res.json({ message: 'Пользователь зарегистрирован', newUser });
        } catch (err) {
            res.status(400).json({ message: 'registration error', err });
        }
    }

    // когда входим в систему вводим логин и пароль (найдем пользователя в бд по имени используя модель User)
    async login(req, res) {
        const { userName, password } = req.body;

        const user = await User.findOne({ userName });
        if (!user) {
            // устанавливаем ответ после этого не нужно идти дальше - return
            return res.status(404).json({ message: `Пользователь ${userName} не найден` });
        }

        // если нашли пользователя "подождите" сравниваем пр в бд и тот который ввел (2ой пр - захешированый)
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Неверный пароль' });
        }

        //* JWT_token для аутентификации (срок действия 24h)
        const payload = { id: user._id, roles: user.roles };
        const token = jwt.sign(payload, 'secretKey', { expiresIn: '24h' });

        //   когда логинимся нам добавляется куки
        res.cookie('access_token', token, {
            httpOnly: true, //этот файл cookie доступен только серверу
            sameSite: 'strict', //Lax
            secure: false,
        });
        res.json({ token });
    }
    async getUsers(req, res) {
        const users = await User.find();
        res.json(users);
    }
}

export default new authController();

// кастыль для создания ролей в БД
// создадим в бд роли для юзера и админа
// const userRole = new Role({ value: 'USER' });
// const adminRole = new Role({ value: 'ADMIN' });
// сохраняем в бд
// await userRole.save();
// await adminRole.save();

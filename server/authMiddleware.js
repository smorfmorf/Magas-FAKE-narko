import jwt from 'jsonwebtoken';

//* мидлваре только для авторизованных пользователей
// запрос, ответ, next-вызывает следующий middleware если ок
export default (req, res, next) => {
    // если опции, то его исключаем
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        // токен обычно выглядит так - Bearer tokena2okdawd (делим строку на 2 части и берем токен)
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Пользователь не авторизован' });
        }
        // проверка на валидность токена
        const decodedToken = jwt.verify(token, 'secretKey');

        //чтобы могли данные использовать внутри других функций засовываем в req
        req.user = decodedToken;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Пользователь не авторизован' });
    }
};



import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    console.log('req: ', req.cookies);
    const token = req.cookies.access_token;
    console.log('token: ', token);
    if (!token) {
        return res.status(401).json({ message: 'Не авторизован' });
    }

    // проверяем действительный токен
    jwt.verify(token, 'secretKey', (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ message: 'Неверный токен' });
        }
        // устанавливаем в запрос req.user данные=> и он идет дальше (тот же запрос)
        req.user = decodedToken.id;
        // если все ок идем дальше
        next();
    });
};

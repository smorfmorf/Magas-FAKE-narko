import jwt from 'jsonwebtoken';

export default (roles) => {
    // Чтобы наш мидлевар понял какие роли разрешены а какие нет используем замыкание

    return (req, res, next) => {
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

            const { roles: userRoles } = jwt.verify(token, 'secretKey');

            //Простыми словами: содержит ли массив ролей юзера хотя бы 1 роль которая разрешена для данной функции, а эти роли передаем в наш middleWare
            // проверяем есть ли в списке ролей те роли которые разрешены для этой F
            let hasRole = false;
            userRoles.forEach((role) => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });
            if (!hasRole) {
                return res.status(403).send({ message: 'Нет доступа' });
            }

            next();
        } catch (err) {
            res.status(401).json({ message: 'Пользователь не авторизован' });
        }
    };
};

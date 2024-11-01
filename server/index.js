import express from 'express';
import mongoose from 'mongoose';
import authRouter from './authRouter.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import axios from 'axios';
const PORT = 4444;

const app = express();
app.use(
    cors({
        origin: [
            'http://127.0.0.1:3002',
            'http://localhost:3002',
            'http://localhost:3000',
            'http://localhost:5000',
            'http://localhost:5173',
        ],
        credentials: true, // Разрешите отправку куки
    }),
);
// научим express парсить json (middleWare)
app.use(express.json());
app.use(cookieParser());
app.use('/api', authRouter); // подключаем роутер

//npm install -g localtunnel
// npx localtunnel --port 8000
app.post('/myapi/checkout', async (req, res) => {
    const mybody = req.body;
    console.log('objcet: ', mybody.object);
    console.log('mybody: ', mybody.object.metadata.order_id);

    res.send('ok');
});

// Создай маршрут (endpoint) для обработки запросов к API Юкассы
app.post('/myapi/yookassa', async (req, res) => {
    try {
        // Сделай запрос к API Юкассы
        const { data } = await axios.post(
            'https://api.yookassa.ru/v3/payments',
            {
                amount: {
                    value: req.body.totalPrice,
                    currency: 'RUB',
                },
                // capture: true,
                description: 'Описание товара',

                // когда платеж будет успшеный мы возьмем этот order_id и скажим супер оплата произведена
                metadata: {
                    order_id: 'details.orderId',
                },
                confirmation: {
                    type: 'redirect',
                    return_url: 'http://localhost:5173/',
                },
            },

            {
                auth: {
                    username: '462829', // Твой логин Юкассы
                    password: 'test_98fubqi3CzTE6_uCKi8P37k2OJW2xHcRNU87VlAcW4c', // Твой пароль Юкассы
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Idempotence-Key': Math.random().toString(36).substring(7),
                },
            },
        );

        // Отправь ответ от Юкассы обратно в React-приложение
        res.json(data);
    } catch (error) {
        // Обработай ошибки
        console.error(error);
        res.status(500).send(error);
    }
});

async function start() {
    try {
        // подключаемся к БД монго
        await mongoose.connect(
            'mongodb+srv://mazaka:max0011@cluster0.jeztvrr.mongodb.net/eazyAuthDB?retryWrites=true&w=majority',
        );

        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
}

start();

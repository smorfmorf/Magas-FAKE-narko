// создадим схему пользователя
import { Schema, model } from 'mongoose';

const User = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [
        // сылка на роль
        {
            type: String,
            ref: 'Role',
        },
    ],
});

// название модели, схема по которой модель создаться
export default model('User', User);

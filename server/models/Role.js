// создадим схему пользователя

import { Schema, model } from 'mongoose';

const Role = new Schema({
    value: {
        type: String,
        unique: true,
        default: 'USER',
    },
});

// название модели, схема по которой модель создаться
export default model('Role', Role);

import React from 'react';
import { useCardStore } from '../store/card';
// let activeIndex = 0;

//  Мы сказали - ты функциональный Компонент, который хранит в себе пропсы.
//  типизация props - ты Компонент:FC принимаешь в себя <тип пропсов>, и он сам их типизирует

interface Props {
    className?: string;
}

const categories = ['Все', 'Alpha', 'Meff', 'Гашиш'];

export const Categories: React.FC<Props> = () => {
    const category = useCardStore((state) => state.category);
    const setCategoryId = useCardStore((state) => state.setCategoryId);

    return (
        <ul className="flex bg-slate-50 p-1 ml-1 rounded-2xl w-[420px] sm:w-[260px] ">
            {categories.map((item, index) => (
                <li
                    onClick={() => {
                        setCategoryId(index);
                    }}
                    key={index}
                    className={`flex items-center font-bold h-11 rounded-2xl px-8 sm:px-3 cursor-pointer
                ${
                    category === index &&
                    'bg-gradient-to-r from-black to-red-500 shadow-md shadow-gray-50 text-white animate-category'
                }`}>
                    {item}
                </li>
            ))}
        </ul>
    );
};

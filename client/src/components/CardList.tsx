import React from 'react';
import { Card } from './Card';
import { ItemCard } from '../store/card';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface Props {
    className?: string;
    items: ItemCard[];
}
export const CardList: React.FC<Props> = ({ className, items }) => {
    const [animate] = useAutoAnimate();

    return (
        // Сетка
        <div
            ref={animate}
            className="grid grid-cols-4 gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
                <Card
                    key={item.id}
                    id={item.id}
                    category={item.category}
                    title={item.title}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    // {...item}
                />
            ))}
        </div>
    );
};

//

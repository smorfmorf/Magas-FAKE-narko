import React from 'react';
import { useCartStore } from '../store/cart';
import { CardList } from '../components/CardList';

const Favorites = () => {
    const items = useCartStore((state) => state.items);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8 mt-5">Избранное</h2>
            <div className="mt-10">
                {items.length ? (
                    <CardList items={items} />
                ) : (
                    <div className="grid justify-items-center gap-10  ">
                        <h1 className="font-bold text-3xl ">Закладок нету</h1>
                        <img src="/emoji-1.png" className="cursor-pointer hover:-translate-y-2" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;

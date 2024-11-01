import React from 'react';
import { useCartStore } from '../store/cart';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface Props {
    className?: string;
    category: number;
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    isFavorite?: boolean;
    isAdded?: boolean;
    onClickFavorite?: () => void;
}
export const Card: React.FC<Props> = ({
    className,
    category,
    id,
    title,
    price,
    imageUrl,
    isFavorite,
    onClickFavorite,
}) => {
    const [animate] = useAutoAnimate();

    const addItem = useCartStore((state) => state.addItem);
    const items = useCartStore((state) => state.items);

    // поиск карточки из корзины
    const findItem = items.find((item) => item.title == title);
    const isAdded = findItem ? findItem.isAdded : false;

    function addItemToCart() {
        const item = {
            id,
            category,
            title,
            price,
            imageUrl,
            count: 1,
            isAdded: true,
        };
        addItem(item);
    }

    return (
        <article
            onClick={addItemToCart}
            className="group relative flex flex-col justify-between p-8 bg-slate-50 border border-slate-300 rounded-3xl cursor-pointer hover:-translate-y-2 hover:shadow-xl transition">
            <img src="/narko.svg" className="w-6 h-6 absolute top-2 right-3" />
            <img src={imageUrl ? imageUrl : '/forest5.jpg'} height={200} className="rounded-xl" />
            <p className="mt-2">{title}</p>

            <div
                // Счетчик
                ref={animate}
                className={
                    findItem?.count
                        ? 'font-bold border px-1 rounded-3xl transition group-hover:bg-stone-300 group-hover:shadow-black group-active:-translate-y-2 bg-slate-200 shadow-2xl'
                        : ``
                }>
                {findItem?.count && <i>Кол-во: {findItem?.count}</i>}
            </div>

            <div className="flex justify-between mt-5">
                <div className="flex flex-col">
                    <span className="text-slate-400">Цена: </span>
                    <b>от {price?.toLocaleString('ru-Ru')} руб.</b>
                </div>
                <img className="w-8" src={isAdded ? '/checked.svg' : '/plus.svg'} />
            </div>
        </article>
    );
};

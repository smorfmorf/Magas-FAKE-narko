import React from 'react';
import { useCartStore } from '../../store/cart';

interface Props {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    count: number;
}

const CartItem: React.FC<Props> = ({ id, title, price, imageUrl, count }) => {
    const minusItem = useCartStore((state) => state.minusItem);
    const removeItem = useCartStore((state) => state.removeItem);
    console.log('count: ', count);

    const onClickRemove = () => {
        if (count > 1) {
            minusItem(id);
        } else {
            removeItem(id);
        }
    };

    return (
        <div
            draggable
            className="group flex items-center gap-4 border border-slate-200 p-4 rounded-xl cursor-default mr-1">
            <img className="w-24 h-24 rounded-xl group-hover:scale-105 transition" src={imageUrl} />
            <div className="flex flex-col flex-1">
                <p>{title}</p>

                <div className="group flex items-center justify-between mt-2">
                    <b>{price * count} руб.</b>
                    <span
                        className={`font-bold border px-1 rounded-3xl transition group-hover:shadow-2xl group-hover:shadow-black ${
                            count < 2
                                ? 'group-hover:bg-red-400 group-active:-translate-y-0'
                                : 'group-hover:bg-stone-300 group-active:-translate-y-2'
                        }

                         `}>
                        {count}
                    </span>
                    {/* group - нужен чтобы при наведении на родительский эл (всю кнопку), отрабатывали group-hover у дочернего эл */}
                    <button className="group" onClick={onClickRemove}>
                        <img
                            src="/close.svg"
                            className="cursor-pointer opacity-60 hover:opacity-100 transition"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};
export default CartItem;

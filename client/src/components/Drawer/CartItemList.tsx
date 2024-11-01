import React from 'react';
import CartItem from './CartItem';
import { useCartStore } from '../../store/cart';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const CartItemList = () => {
    const [animate] = useAutoAnimate();

    const items = useCartStore((state) => state.items);

    return (
        <div ref={animate} className="flex flex-col gap-5">
            {items.map((item) => (
                <CartItem key={item.id} {...item} />
            ))}
        </div>
    );
};
export default CartItemList;

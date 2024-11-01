import DrawerHead from './DrawerHead';
import CartItemList from './CartItemList';
import { useCartStore } from '../../store/cart';
import React from 'react';
import InfoBlock from './InfoBlock';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import axios from 'axios';

const Drawer = () => {
    const overlayRef = React.useRef(null);

    const totalPrice = useCartStore((state) => state.totalPrice);
    const items = useCartStore((state) => state.items);
    console.log('items: ', items);
    const clearCart = useCartStore((state) => state.clearItem);
    const setOpenDrawer = useCartStore((state) => state.setOpenDrawer);

    React.useEffect(() => {
        function handleClick(event: MouseEvent) {
            // target - куда кликнули
            if (event.target === overlayRef.current) {
                setOpenDrawer();
            }
        }
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    });

    const orderId = React.useRef(false);

    async function createOrder() {
        const { data } = await axios.post('https://09e68224277db270.mokky.dev/orders', {
            items: useCartStore.getState().items,
            totalPrice: useCartStore.getState().totalPrice,
        });
    }

    async function handlerSubmit() {
        try {
            const { data } = await axios.post('http://localhost:4444/myapi/yookassa', {
                totalPrice,
            });
            console.log('data: ', data);

            const url = data.confirmation.confirmation_url;

            clearCart();
            orderId.current = data.id;

            setTimeout(() => {
                // setOpenDrawer();

                if (url) {
                    window.location.href = url;
                    // window.open(url, '_blank');
                }
            }, 1000);
        } catch (error) {
            // throw new Error('Ошибка запроса');
            alert('Ошибка запроса');
        }
    }

    return (
        <>
            <div
                ref={overlayRef}
                className="fixed top-0 left-0 bg-black w-full h-full opacity-70 z-20"></div>
            <div className="fixed top-0 right-0 bg-white h-full w-96 p-10 z-30">
                <DrawerHead />

                {/* Если корзина пустая */}
                {(!totalPrice || orderId.current) && (
                    <div className="flex items-center h-full">
                        {!totalPrice && !orderId.current ? (
                            <InfoBlock
                                title="Корзина пустая"
                                discription="Добавьте хотябы один товар чтобы сделать заказ"
                                img="package-icon.png"
                            />
                        ) : orderId.current ? (
                            <InfoBlock
                                title="Ваш заказ оформлен"
                                discription="В ближайшее время с вами свяжется менеджер"
                                img="order-success-icon.png"
                            />
                        ) : null}
                    </div>
                )}

                {/* Если товары в корзине */}
                {!!totalPrice && (
                    <div className="flex flex-col justify-between">
                        <div className="overflow-y-auto overflow-x-hidden h-[68vh]">
                            <CartItemList />
                        </div>

                        <div className="flex flex-col gap-4 mt-7">
                            <div className="flex gap-2 ">
                                <span>Итого:</span>
                                <div className="flex-1 border-b border-dashed"></div>
                                <b>{totalPrice} руб.</b>
                            </div>
                            <div className="flex gap-2">
                                <span>Налог 5%:</span>
                                <div className="flex-1 border-b border-dashed"></div>
                                <b>
                                    {new Intl.NumberFormat('ru-RU').format((totalPrice / 100) * 5)}{' '}
                                    руб.
                                </b>
                            </div>

                            <button
                                onClick={handlerSubmit}
                                className="mt-4 bg-lime-500 w-full p-3 rounded-xl text-white transition disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700">
                                Оформить заказ
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
export default Drawer;

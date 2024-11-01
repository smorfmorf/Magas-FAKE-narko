import React from 'react';
import { useCartStore } from '../../store/cart';

const DrawerHead = () => {
    const setOpenDrawer = useCartStore((state) => state.setOpenDrawer);
    const clearItem = useCartStore((state) => state.clearItem);

    function clear() {
        if (window.confirm('Очистить?')) {
            clearItem();
            setOpenDrawer();
        }
    }

    return (
        <div className="flex items-center gap-2 mb-8">
            <svg
                onClick={setOpenDrawer}
                className="cursor-pointer opacity-30 rotate-180 hover:opacity-100 hover:-translate-x-1 transition"
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1 7H14.7143"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M8.71436 1L14.7144 7L8.71436 13"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            <h2 className="text-2xl font-bold ">Корзина</h2>

            <svg
                onClick={clear}
                className="ml-32 cursor-pointer transition hover:-translate-y-1 opacity-30 hover:opacity-100
                fill-slate-300 stroke-slate-300
                hover:fill-orange-900 hover:stroke-orange-900"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect
                    x="0.5"
                    y="0.5"
                    width="31"
                    height="31"
                    rx="7.5"
                    fill="none"
                    stroke="current"
                />
                <path
                    d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z"
                    fill="current"
                />
            </svg>
        </div>
    );
};
export default DrawerHead;

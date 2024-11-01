import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist } from 'zustand/middleware';

interface ItemCart {
    category: number;
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    count: number;
    isAdded: boolean;
}

// схема state(тип для стейта)
interface CartStore {
    totalPrice: number;
    items: ItemCart[];

    openDrawer: boolean;
    setOpenDrawer: () => void;

    addItem: (item: ItemCart) => void;
    minusItem: (item: number) => void;
    removeItem: (item: number) => void;
    clearItem: () => void;
}

// создание store, передаем тип джейнериком, добавляем мидлваре для devtools
// immer - чтобы стейт сделать как в ReduxToolkit(мутабельным)
// persist - чтобы данные сохранялись в localStore (синхронизация store и localStorage)
export const useCartStore = create<CartStore>()(
    persist(
        devtools(
            immer((set) => ({
                items: [],
                totalPrice: 0,
                openDrawer: false,

                // Функции для смены state. тк используем immer можно мутировать объект напрямую (как в toolkit).
                setOpenDrawer() {
                    set((state) => {
                        state.openDrawer = !state.openDrawer;
                    });
                },

                addItem(item) {
                    set((state) => {
                        const findItem = state.items.find((obj) => obj.id === item.id);

                        if (findItem) {
                            findItem.count++;
                        } else {
                            state.items.push(item);
                        }

                        state.totalPrice = state.items.reduce(
                            (sum, item) => sum + item.price * item.count,
                            0,
                        );
                    });
                },
                minusItem(id) {
                    set((state) => {
                        const findItem = state.items.find((obj) => obj.id === id);

                        if (findItem) {
                            findItem.count--;
                        }

                        state.totalPrice = state.items.reduce(
                            (sum, item) => sum + item.price * item.count,
                            0,
                        );
                    });
                },
                removeItem(id) {
                    set((state) => {
                        state.items = state.items.filter((obj) => obj.id !== id);
                        state.totalPrice = state.items.reduce(
                            (sum, item) => sum + item.price * item.count,
                            0,
                        );
                    });
                },

                clearItem() {
                    set((state) => {
                        state.items = [];

                        state.totalPrice = state.items.reduce(
                            (sum, item) => sum + item.price * item.count,
                            0,
                        );
                    });
                },
            })),
        ),
        // опции для персиста
        { name: 'CartStore', version: 1 },
    ),
);

//

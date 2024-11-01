import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

import axios from 'axios';

export interface ItemCard {
    category: number;
    id: number;
    title: string;
    price: number;
    imageUrl: string;
}

// тип для BackEnd - чтобы мы передавали только строчки.
export type SearchPizzaParams = {
    category: string;
    sortBy: string;
    title: string;
};

interface CardStore {
    category: number;
    setCategoryId: (id: number) => void;

    items: ItemCard[];
    fetchData: (params: SearchPizzaParams) => void;
    fetchDataLink: (params: SearchPizzaParams) => void;
}

export const useCardStore = create<CardStore>()(
    devtools(
        immer((set) => ({
            items: [],
            category: 0,

            setCategoryId(id) {
                set((state) => {
                    state.category = id;
                });
            },

            async fetchData(params) {
                const { sortBy, title, category } = params;

                const { data } = await axios.get<ItemCard[]>(
                    `https://09e68224277db270.mokky.dev/items_Narko?${category}&sortBy=${sortBy}${title}}`,
                );
                console.log('data: ', data);

                set((state) => {
                    state.items = data;
                });
            },
            async fetchDataLink(params) {
                const { sortBy, title, category } = params;

                const { data } = await axios.get<ItemCard[]>(
                    `https://09e68224277db270.mokky.dev/items_Link?${category}&sortBy=${sortBy}${title}}`,
                );

                set((state) => {
                    state.items = data;
                });
            },

            //
        })),
    ),
);

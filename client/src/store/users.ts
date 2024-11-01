import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist } from 'zustand/middleware';

interface User {
    id: number;
    username: string;
}

// схема state(тип для стейта)
interface UsersState {
    users: User[];
    addUser: (username: string) => void;
    removeUser: (id: number) => void;
    fetchData: () => void;
}

// создание store, передаем тип джейнериком, добавляем мидлваре для devtools
// immer - чтобы стейт сделать как в ReduxToolkit(мутабельным)
// persist - чтобы данные сохранялись в localStore (синхронизация store и localStorage)
export const useUsersStore = create<UsersState>()(
    persist(
        devtools(
            immer((set) => ({
                // стейт
                users: [
                    {
                        id: 0,
                        username: 'admin',
                    },
                ],
                // Функция/action которая будет менять state (set() - работает похожим образом с setState в React должна вернуть объект с полем которое хотим обновить. (передаем новый массив пользователей, и в конец добавляем наш новый объект)
                //* State - напрямую не изменяем возвращаем новый массив пользователей в него разворачиваем старый и в конец добавляем нового (Классический имутабельный React/Redux подход)
                addUser: (username: string) =>
                    set((state) => ({ users: [...state.users, { id: Date.now(), username }] })),

                //? но хочется чтобы не менять весь массив пользователей и что-то в конец добавлять, а просто запушить в массив юзера. Как в ReduxToolkit для этого нужен middleWare-immer (изменять state напрямую)
                // addUser(username: string) {
                //     set((state) => {
                //         state.users.push({ id: Date.now(), username });
                //     });
                // },

                removeUser(id: number) {
                    set((state) => {
                        state.users = state.users.filter((user) => user.id !== id);
                    });
                },

                //* Асинхронщина запросы на БЕК (не нужны никакие Saga, асинхЭкшены)
                fetchData: async () => {
                    const response = await fetch('https://jsonplaceholder.typicode.com/users');
                    const data = (await response.json()) as User[];
                    set((state) => ({ users: [...state.users, ...data] }));
                    // мутабельный подход
                    // set((state) => {
                    //     state.users.push(...data);
                    // });
                },
            })),
        ),
        // опции для персиста
        { name: 'userStore', version: 1 },
    ),
);

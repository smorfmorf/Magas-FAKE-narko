import React from 'react';

import { Route, Routes } from 'react-router-dom';
import Drawer from './components/Drawer/Drawer';
import Header from './components/Header';
import { MySwiper } from './components/Swipe';
import Home from './pages/Home';
import { useCartStore } from './store/cart';
import { useUsersStore } from './store/users';

// загружаем как чанк (когда зайдем на данный компонента, тогда и подгрузим его)
const Favorites = React.lazy(() => import(/* webpackChunkName: "Favorites" */ './pages/Favorites'));
// Сделали layout - компонент Home бегает за нами, а меняется содержимое контента

function App() {
    const openDrawer = useCartStore((state) => state.openDrawer);

    const [auth, isAuth] = React.useState(true);

    const users = useUsersStore((state) => state.users);
    const addUser = useUsersStore((state) => state.addUser);
    const removeUser = useUsersStore((state) => state.removeUser);
    const fetchDataUser = useUsersStore((state) => state.fetchData);

    function addUserClick() {
        addUser(`mazaka ${Date.now()}`);
    }

    if (!auth) {
        return (
            <>
                <div className="flex items-center h-screen justify-center p-56 ">
                    <div>
                        <h2 className="text-2xl font-bold">Список пользователей:</h2>

                        <div className="flex flex-col gap-2 overflow-auto max-h-96 my-4">
                            {users.map((user) => (
                                <div
                                    className="flex justify-between items-center text-indigo-700 hover:bg-slate-300 cursor-pointer border border-slate-300 rounded-xl p-2 transition"
                                    key={user.id}>
                                    {user.username}

                                    <img src="/close.svg" onClick={() => removeUser(user.id)} />
                                </div>
                            ))}
                        </div>
                        <div onClick={fetchDataUser}>Показать еще</div>
                        <button
                            className="border border-x-slate-300 rounded-xl p-2 bg-green-300 hover:bg-green-400 "
                            onClick={addUserClick}>
                            Добавить пользователя
                        </button>
                    </div>

                    <div className="w-[300px] text-center mx-auto">
                        <h2 className="text-2xl font-bold mb-2">Авторизация</h2>
                        <form onSubmit={() => isAuth(true)}>
                            <input
                                placeholder="Ваше имя"
                                className="outline-none border border-slate-300 rounded-xl p-2 w-[200px]"
                            />
                            <button className="mt-2 w-[200px] bg-green-300 rounded-xl p-2 hover:bg-green-400 transition">
                                Подключиться
                            </button>
                        </form>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            {openDrawer && <Drawer />}
            {/* w-4/5 - размер контейнера типо как w-[1200px],   <!--section -  wrapper для всего приложения, теперь нужно сделать header --> */}
            <section className="bg-white w-4/5 m-auto mt-14 rounded-xl shadow-2xl shadow-black">
                <Header />

                <main className="p-10 ">
                    <MySwiper />

                    {/* тут рендерю все страницы */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/favorites"
                            element={
                                <React.Suspense
                                    fallback={
                                        <div className="flex justify-center mt-10">
                                            <img src="loading.gif" className="w-20 h-20" />
                                        </div>
                                    }>
                                    <Favorites />
                                </React.Suspense>
                            }
                        />
                    </Routes>
                </main>
            </section>

            <footer className="text-center text-white py-5 bg-black mt-8">
                © 2021-2024 <a href="https://discord-tracker.com">Discord-Tracker.com</a> - is not
                affiliated with Discord Inc.
            </footer>
        </>
    );
}

export default App;

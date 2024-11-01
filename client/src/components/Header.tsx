import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cart';

const Header = () => {
    const totalPrice = useCartStore((state) => state.totalPrice);
    const setOpenDrawer = useCartStore((state) => state.setOpenDrawer);

    return (
        <header className="p-10 flex justify-between items-center border-b border-b-slate-300 ">
            <Link to="/">
                <div className="flex gap-4 items-center">
                    <img
                        src="/assets/header.jpeg"
                        className="w-14 rounded-xl hover:opacity-80 transition"
                    />
                    <div>
                        <h2 className="text-2xl font-bold uppercase">Tattoo Mall</h2>
                        <p className="text-slate-500">Лучшая трава для животных</p>
                    </div>
                </div>
            </Link>

            <nav>
                <ul className="flex items-center gap-10">
                    <li
                        onClick={setOpenDrawer}
                        className="group flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black transition ">
                        <img
                            src="/cart.svg"
                            className={`transition duration-300 
                            ${totalPrice > 0 ? 'animate-heartbeat' : 'group-hover:-translate-y-1'}`}
                            //* Кастомная анимация animate-heartbeat
                        />
                        <b>{totalPrice} руб</b>
                    </li>
                    <Link to="/favorites">
                        <li className="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black transition">
                            <img src="/heart.svg" />
                            <span>Закладки</span>
                        </li>
                    </Link>
                    <li className="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black transition">
                        <img src="/profile.svg" />
                        <span>Профиль</span>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;

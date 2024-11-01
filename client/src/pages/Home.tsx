import React from 'react';
import { CardList } from '../components/CardList';
import { useUsersStore } from '../store/users';
import { ItemCard, useCardStore } from '../store/card';
import { Categories } from '../components/Category';
import { X } from 'lucide-react';

interface Props {
    className?: string;
}

interface SortItem {
    name: string;
    sortProperty: string;
}

const list: SortItem[] = [
    { name: 'По названию', sortProperty: 'title' },
    { name: 'По цене (дешевые)', sortProperty: 'price' },
    { name: 'По цене (дорогие)', sortProperty: '-price' },
];

const Home: React.FC<Props> = () => {
    const [checkbox, setCheckBox] = React.useState(false);

    const [sortType, setSortType] = React.useState<SortItem>({
        name: 'По названию',
        sortProperty: 'name',
    });
    const [searchValue, setSearchValue] = React.useState('');
    const [value, setValue] = React.useState('');

    // Сохраняем ссылку на функцию чтобы функция не пересоздавалась каждый раз.
    const updateSearchValueDebounce = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            let timeOut;

            clearTimeout(timeOut);
            timeOut = setTimeout(() => {
                setSearchValue(event.target.value);
            }, 300);
        },
        [],
    );

    function onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
        updateSearchValueDebounce(event);
    }

    // селектор достаем данные из store
    const items = useCardStore((state) => state.items);

    //* Функция смены сортировки
    function onChangeSelect(event: React.ChangeEvent<HTMLSelectElement>) {
        const sortPropertySelect = event.target.value;
        const findOption = list.find((el) => el.sortProperty === sortPropertySelect);
        if (findOption) {
            setSortType(findOption);
        }
    }

    const filterItems = items
        .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
        .sort((a, b) => {
            const sortKey = sortType.sortProperty.startsWith('-') // true
                ? sortType.sortProperty.slice(1) // Убираем '-' для сортировки в обратном порядке
                : sortType.sortProperty;

            // Определение порядка сортировки:
            const order = sortType.sortProperty.startsWith('-') ? -1 : 1; // Если есть '-', меняем порядок сортировки

            // as keyof ItemCard - говорим TS что sortKey это одно из свойств объекта ItemCard (типо говорим поверь мне)
            const aValue = a[sortKey as keyof ItemCard] + '';
            const bValue = b[sortKey as keyof ItemCard] + '';

            // {numeric: true} позволяет сравнивать строки как числа (как будто это числа)
            return order * aValue.localeCompare(bValue, 'ru', { numeric: true });
        });

    //это не смотреть
    React.useEffect(() => {
        fetch('http://localhost:4444/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: 'mazaka3',
                password: '1234',
            }),
            credentials: 'include',
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => console.log(data))
            .catch((error) => console.error('Ошибка:', error));
    }, []);

    // отправка куки
    async function fetchDataMy() {
        const res = await fetch('http://localhost:4444/api/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', //  Включаем отправку куки
        });
        const data = await res.json();
        console.log(data);
    }

    return (
        <>
            <div className="flex justify-between items-center mt-5">
                <h2 className="text-3xl font-bold sm:hidden md:hidden">Все товары</h2>

                <div className="flex gap-4 items-center all:overflow-auto md:mx-auto sm:mx-auto md:flex-col-reverse sm:flex-col-reverse">
                    <Categories />

                    <select
                        value={sortType.sortProperty}
                        onChange={onChangeSelect}
                        className="border py-2 px-3 rounded-lg focus:border-slate-400">
                        {list.map((obj) => (
                            <option key={obj.name} value={obj.sortProperty}>
                                {obj.name}
                            </option>
                        ))}
                    </select>

                    <div className="relative">
                        <img src="/search.svg" className="absolute left-4 top-3" />
                        <input
                            className="border rounded-lg py-2 pl-11 pr-4 focus:border-slate-400"
                            type="text"
                            value={value}
                            onChange={onChangeInput}
                        />
                        {value && (
                            <X
                                onClick={() => {
                                    setValue('');
                                    setSearchValue('');
                                }}
                                className="absolute right-4 top-2 opacity-40 hover:opacity-100 cursor-pointer"
                            />
                        )}
                    </div>

                    <div className="relative">
                        <label className="flex items-center gap-2 group cursor-pointer">
                            <input
                                type="checkbox"
                                className="hidden"
                                value={checkbox.toString()}
                                onChange={() => setCheckBox(!checkbox)}
                            />
                            <p>Еще</p>
                            <svg
                                className={
                                    checkbox ? 'rotate-180 transition' : 'rotate-0 transition'
                                }
                                width="10"
                                height="7"
                                viewBox="0 0 10 7"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.68636 1.33393C9.68941 1.20405 9.64925 1.07651 9.5714 0.969038C9.49356 0.861566 9.38188 0.779502 9.25198 0.734257C9.12209 0.689011 8.98041 0.682832 8.8466 0.716578C8.71278 0.750323 8.59356 0.822317 8.50541 0.922551L5.01063 4.74701L1.51707 0.92255C1.46271 0.853214 1.3937 0.795146 1.3143 0.751984C1.2349 0.708822 1.14682 0.681495 1.05563 0.671714C0.964435 0.661933 0.872091 0.66991 0.784341 0.695144C0.69659 0.720377 0.615317 0.762325 0.54566 0.81836C0.476003 0.874395 0.419499 0.94331 0.379567 1.02079C0.339636 1.09827 0.317207 1.18264 0.313668 1.26863C0.31013 1.35461 0.325515 1.44036 0.35896 1.52049C0.392405 1.60062 0.443137 1.67342 0.507981 1.73432L4.50412 6.11298C4.56671 6.18174 4.6444 6.23696 4.73196 6.27482C4.81952 6.31268 4.91482 6.33229 5.01124 6.33229C5.10766 6.33229 5.20297 6.31268 5.29052 6.27482C5.37808 6.23696 5.45585 6.18174 5.51844 6.11298L9.51842 1.73432C9.62322 1.62371 9.6828 1.48183 9.68652 1.33393L9.68636 1.33393Z"
                                    fill="black"></path>
                            </svg>
                        </label>
                        {checkbox && (
                            <div>
                                <a
                                    href="#"
                                    className="absolute top-10 -right-3 text-center bg-white shadow-xl px-5 py-2 min-w-[300px] rounded-lg">
                                    Наша программа лояльности
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-10 ">
                {filterItems.length ? (
                    <CardList items={filterItems} />
                ) : (
                    <div className="grid justify-items-center gap-10  ">
                        <h1 className="font-bold text-3xl ">Ничего не найдено</h1>
                        <img
                            src="/package-icon.png"
                            className="cursor-pointer hover:-translate-y-2"
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;

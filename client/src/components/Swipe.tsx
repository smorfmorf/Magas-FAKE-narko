import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { ItemCard, useCardStore } from '../store/card';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const MySwiper = () => {
    const isMounted = React.useRef<boolean>(false);

    const fetchDataLink = useCardStore((state) => state.fetchDataLink);
    const fetchData = useCardStore((state) => state.fetchData);

    const categoryId = useCardStore((state) => state.category);

    const category = categoryId > 0 ? `&category=${categoryId}` : '';

    React.useEffect(() => {
        if (isMounted.current) {
            fetchDataLink({ sortBy: '', title: '', category });
        } else {
            fetchData({ sortBy: '', title: '', category });
        }
    }, [category]);

    function changeSwiper() {
        if (!isMounted.current) {
            fetchDataLink({ sortBy: '', title: '', category });

            isMounted.current = true;
        } else {
            fetchData({ sortBy: '', title: '', category });
            isMounted.current = false;
        }
    }

    console.log('rener Swiper');

    return (
        <div className="relative">
            <Swiper
                onSlideChange={changeSwiper}
                modules={[Navigation, Pagination, Autoplay, A11y, EffectFade]}
                effect="fade"
                // loop={true}
                allowTouchMove={false} // перелистывание мышкой
                navigation={{
                    nextEl: '.swiper-next', // селектор кнопки "Далее"
                    prevEl: '.swiper-prev', // селектор кнопки "Назад"
                }} // Включите навигацию (стрелки)
                // pagination={{ clickable: true }} // Включите пагинацию (точки)
                autoplay={{
                    delay: 10000, // Время между слайдами в миллисекундах
                    disableOnInteraction: false, // Продолжайте автовоспроизведение после взаимодействия с слайдером
                }}
                spaceBetween={20}
                slidesPerView={1}
                onSwiper={(swiper: any) => console.log('init: ', swiper)}>
                <SwiperSlide>
                    <img className="w-full rounded-2xl shadow-sm shadow-black" src="link2.webp" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="w-full rounded-2xl shadow-sm shadow-black" src="link.webp" />
                </SwiperSlide>
            </Swiper>

            <div className="flex justify-between absolute left-3 right-3 top-[calc(50%-30px)] z-10 fill-red-500 ">
                <button className="swiper-prev flex justify-center items-center w-[60px] h-[60px] rounded-xl hover:-translate-x-2 transition cursor-pointer bg-gray-500/50 hover:bg-gray-500/70 active:bg-gray-500/90">
                    <img src="/arrowSwiper.svg" className="rotate-180 w-[20px] " />
                </button>
                <button className="swiper-next flex justify-center items-center w-[60px] h-[60px] rounded-xl hover:translate-x-2 transition cursor-pointer bg-gray-500/50 hover:bg-gray-500/70 active:bg-gray-500/90">
                    <img src="/arrowSwiper.svg" className="w-[20px] opacity-100" />
                </button>
            </div>
        </div>
    );
};

//            <SwiperSlide>
//                 <img
//                     className="max-h-[200px] object-cover w-full rounded-sm shadow-sm shadow-black"
//                     src="nft.jpg"
//                 />
//             </SwiperSlide>

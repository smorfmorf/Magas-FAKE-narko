import React from 'react';

interface Props {
    title: string;
    discription: string;
    img: string;
}

const InfoBlock: React.FC<Props> = ({ title, discription, img }) => {
    return (
        <div className="flex flex-col items-center text-center w-72 mx-auto">
            <img height={80} width={80} src={img} />
            <h2 className="mt-4 text-2xl font-bold">{title}</h2>
            <p className="text-gray-400">{discription}</p>
        </div>
    );
};

export default InfoBlock;

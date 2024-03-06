import React from 'react';
import './Cards.css';
import Card from "../components/Card";
import {useTranslation} from "react-i18next";


const Cards = () => {
    const { t } = useTranslation();

    const cards = t('cards', { returnObjects: true });

    return (
        <div className="main__cards cards">
            <div className="cards__inner">
                {cards.map((card, index) => (
                   <Card key={index} {...card} />
                ))}
            </div>
        </div>
    )
}

export default Cards;

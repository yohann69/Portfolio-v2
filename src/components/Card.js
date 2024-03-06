import React from "react";

const Card = (props, glow = true) => {
    const cardRef = React.useRef(null);
    const color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.9)`;

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const radialGradient = `radial-gradient(circle at ${x}px ${y}px, var(--card-glow-color) 0%, rgba(132, 115, 255, 0) calc(0% + 200px))`;
        cardRef.current.style.setProperty("background", `${radialGradient} no-repeat border-box border-box rgba(0, 0, 0, 0)`);
    };

    const handleMouseLeave = () => {
        cardRef.current.style.setProperty("background", "none");
    };

    React.useEffect(() => {
        if (glow) {
            const cardEl = cardRef.current;
            cardEl.style.setProperty('--card-glow-color', color);

            cardEl.addEventListener('mousemove', handleMouseMove);
            cardEl.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                cardEl.removeEventListener('mousemove', handleMouseMove);
                cardEl.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, []);


    return (<div className="card__bg">
        <div className="cards__card card" ref={cardRef}>
            <h2 className="card__heading">{props.heading}</h2>
            <p className="card__price">{props.price}</p>
            <ul className="card__bullets flow">
                {props.bullets.map((bullet, index) => (<li key={index}>{bullet}</li>))}
            </ul>
            <a href={props.link} className="card__cta cta">{props.cta}</a>
        </div>
    </div>);
}

export default Card;
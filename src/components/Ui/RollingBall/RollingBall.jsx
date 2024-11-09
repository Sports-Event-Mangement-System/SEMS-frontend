import React from 'react';
import { FaFutbol, FaVolleyballBall, FaBasketballBall, FaBaseballBall } from "react-icons/fa";
import './RollingBall.css';

const RollingBall = ({ size = 40, shadowColor = "rgba(0,0,0,0.2)", isButton = false, centered = false }) => {
    const ballStyle = {
        '--ball-size': `${size}px`,
        '--shadow-color': shadowColor
    };

    return (
        <div className={`ball-container ${isButton ? 'button-mode' : ''} ${centered ? 'centered-loader' : ''}`} style={ballStyle}>
            <div className="ball-wrapper">
                <div className="ball">
                    <FaFutbol className="ball-icon football" />
                    <FaBasketballBall className="ball-icon basketball" />
                    <FaBaseballBall className="ball-icon baseball" />
                    <FaVolleyballBall className="ball-icon volleyball" />
                </div>
            </div>
            {!(isButton && !centered) && (
                <div className="shadow-wrapper">
                    <div className="shadow"></div>
                </div>
            )}
        </div>
    );
};

export default RollingBall; 
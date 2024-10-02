import React from 'react'
import './Ribbon.css';

export default function Ribbon({ text }) {
    return (
        <div className='ribbon'>
            <div className='ribbon-text'>{text}</div>
        </div>
    )
}

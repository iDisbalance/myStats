import React from "react";

const Button = ({onClick}) => {
    return (
        <a className="glightbox_video" onClick={onClick}> 
            <svg width="50" height="50" viewBox="0 0 131 131" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className="inner-circle" d="M65 21C40.1488 21 20 41.1488 20 66C20 90.8512 40.1488 111 65 111C89.8512 111 110 90.8512 110 66C110 41.1488 89.8512 21 65 21Z" fill="white"></path>
                <circle className="outer_circle" cx="65.5" cy="65.5" r="64" stroke="white"></circle>
                <path className="play" fill-rule="evenodd" clip-rule="evenodd" d="M60 76V57L77 66.7774L60 76Z" fill="#BF2428"></path>
            </svg>
        </a>
    )
}

export default Button
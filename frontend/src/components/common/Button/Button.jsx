import React from 'react';

const Button = ({ children, onClick, variant = 'primary', type = 'button', className = '', disabled = false }) => {
    const baseStyle = "px-4 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none flex items-center justify-center";
    
    const variants = {
        primary: "bg-primary text-black hover:bg-[#00cce6] disabled:bg-primary/50",
        secondary: "bg-secondary text-black hover:bg-[#00e68c] disabled:bg-secondary/50",
        danger: "bg-danger text-white hover:bg-[#e63553] disabled:bg-danger/50",
        outline: "border-2 border-primary text-primary hover:bg-primary/10 disabled:border-primary/50 disabled:text-primary/50",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
